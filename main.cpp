#include <Arduino.h>
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <FirebaseJson.h>

//oximeter libraries
#include <Wire.h>
#include <MAX30105.h>
#include <spo2_algorithm.h>
#include <soc/rtc_wdt.h>

void rtc_wdt_protect_off();
void rtc_wdt_disable();

#define FIREBASE_HOST "testweb-f3370.firebaseio.com"
#define FIREBASE_AUTH "FqgzPj81zozi3XYvmH0Jn3aQM6vGbU3Z0OrZQb5c"
#define WIFI_SSID "ARRIS-6D22"           //nombre de red wi-fi
#define WIFI_PASSWORD "Y43XTX9THAPTH4EF" //contraseña wi-fi

#define Electrocardiograma 39 //ECG
#define gas_sensor 34 //sensor MQ132
#define boton1 27  //comer
#define boton2 26  //orinar
#define boton3 25  //evacuar
#define boton4 33  //medicamento
#define led 4      //led azul actividades
#define LED_ECG 23 //led rojo ECG
#define led_spo2  12    //led blanco aviso de funcionamiento SPO2

#define lo_pos 18  // (LO +) del ecg
#define lo_neg 19  // (LO -) del ecg

//oximeter parameters
MAX30105 particleSensor;

#define MAX_BRIGHTNESS 255

uint32_t irBuffer[100]; //infrared LED sensor data
uint32_t redBuffer[100];  //red LED sensor data

int32_t bufferLength; //data length
int32_t spo2; //SPO2 value
int8_t validSPO2; //indicator to show if the SPO2 calculation is valid
int32_t heartRate; //heart rate value
int8_t validHeartRate; //indicator to show if the heart rate calculation is valid

byte pulseLED = 11; //Must be on PWM pin
byte readLED = 13; //Blinks with each data read

bool first_read =0;
int count_ox =0;

int value_spo2 =0;
int value_bpm = 0;
int sensor_spo2 =0;
int sensor_bpm =0;
float value_temp =0;

char datas[255];

TaskHandle_t Task1;

String path = "/Planificación II"; 
FirebaseData firebaseData;  //define un objeto de firebase


//ADC 1: GPIO: 33, 32, 35, 34, 39, 36.
//ADC 2: GPIO: 25, 26, 27, 12, 13, 14, 15, 02, 04.

//variables globales de sensado
float valor_sensado = 0;
float voltaje_sensado;

float ecg_sensado; 
uint32_t ecg_data[255];
int ecg_length = 255;
int ecg_ok = 0;


float gas_sensado = 0;
float breath =0;

//variables mq135
int sensor_gas = 0;

int contador_resp =0;
int frecuencia_resp= 0;

unsigned long previousMillis=0;
unsigned long intervalos=6000;    //1 segundo
unsigned long ciclos= 15000; //15 segundos

bool ref = 0;

int ex_ecg;

int count_b = 0;
int count_err = 0;

bool enable_data = false;

bool b1=0;
bool b2=0;
bool b3=0;
bool b4=0;

void IRAM_ATTR isr1(){
  b1=1;
}

void IRAM_ATTR isr2(){
  b2=1;
}

void IRAM_ATTR isr3(){
  b3=1;
}

void IRAM_ATTR isr4(){
  b4=1;
}

String package_data = "";

void setup() {

  Serial.begin(9600);

  //Inicialización conexión wi-fi
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Conectando a ....");
  while (WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(300);
  }

  Serial.println(); Serial.print("Conectado con la IP:");
  Serial.println(WiFi.localIP()); Serial.println();

  //Inicializacion Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);
  Firebase.setReadTimeout(firebaseData, 1000); //tiempo de espera de lectura de la base de datos
  Firebase.setwriteSizeLimit(firebaseData, "tiny"); //tamaño y tiempo de escritura (tiny = 1s)

  //definicion de variables en BDD: //para leer valores en bdd se ocupa get.Float
  Firebase.setFloat(firebaseData, path + "/Sensores/Temperatura", 0.0);
  Firebase.setFloat(firebaseData, path + "/Sensores/Sat_Oxigeno", 0.0);
  Firebase.setFloat(firebaseData, path + "/Sensores/Frecuencia_Respiratoria", 0.0);
  Firebase.setFloat(firebaseData, path + "/Sensores/Frecuencia_Cardiaca", 0.0);

  //valores de interés:
  Firebase.setFloat(firebaseData, path + "/Resultados/value_bpm", 0.0);
  Firebase.setFloat(firebaseData, path + "/Resultados/value_rpm", 0.0);
  Firebase.setFloat(firebaseData, path + "/Resultados/value_spo2", 0.0);
  Firebase.setFloat(firebaseData, path + "/Resultados/value_temperature", 0.0);


  //Inicialización ADC
  pinMode(Electrocardiograma, INPUT);
  pinMode(gas_sensor, INPUT);

  //leds oximeter
  pinMode(pulseLED, OUTPUT);
  pinMode(readLED, OUTPUT); 
  pinMode(led_spo2, OUTPUT); //led de aviso

  //botones
  pinMode(boton1, INPUT_PULLDOWN);
  pinMode(boton2, INPUT_PULLDOWN);
  pinMode(boton3, INPUT_PULLDOWN);
  pinMode(boton4, INPUT_PULLDOWN);

  attachInterrupt(boton1, isr1, HIGH);
  attachInterrupt(boton2, isr2, HIGH);
  attachInterrupt(boton3, isr3, HIGH);
  attachInterrupt(boton4, isr4, HIGH);

  //led aviso paciente
  pinMode(led, OUTPUT);
  digitalWrite(led, LOW);

  //ecg
  pinMode(lo_neg, INPUT);
  pinMode(lo_pos, INPUT);

  pinMode(Electrocardiograma, INPUT);
  pinMode(LED_ECG, OUTPUT);
  
  //config. ADC
  analogReadResolution(12); //resolution ADC (9-12)

  digitalWrite(led_spo2, LOW);

  //oximeter test power
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    digitalWrite(led_spo2, HIGH);
  }
 
  
  byte ledBrightness = 60; //Options: 0=Off to 255=50mA
  byte sampleAverage = 4; //Options: 1, 2, 4, 8, 16, 32
  byte ledMode = 2; //Options: 1 = Red only, 2 = Red + IR, 3 = Red + IR + Green
  byte sampleRate = 100; //Options: 50, 100, 200, 400, 800, 1000, 1600, 3200
  int pulseWidth = 411; //Options: 69, 118, 215, 411
  int adcRange = 4096; //Options: 2048, 4096, 8192, 16384

  particleSensor.setup(ledBrightness, sampleAverage, ledMode, sampleRate, pulseWidth, adcRange); //Configure sensor with these settings
  
}


//Loop 2: Transmision wi-fi
void loop() {

  //oximeter test power
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
  {
    Serial.println(F("MAX30105 was not found. Please check wiring/power."));
    digitalWrite(led_spo2, HIGH);
  }

  else{
    digitalWrite(led_spo2, LOW);
  }

  bufferLength = 100; //buffer length of 100 stores 4 seconds of samples running at 25sps

  //al iniciar toma las primeras 100 muestras
  if (first_read == 0)
  {
    //read the first 100 samples, and determine the signal range
    for (byte i = 0 ; i < bufferLength ; i++)
    {
      while (particleSensor.available() == false) //do we have new data?
        particleSensor.check(); //Check the sensor for new data

      redBuffer[i] = particleSensor.getRed();
      irBuffer[i] = particleSensor.getIR();
      particleSensor.nextSample(); //We're finished with this sample so move to next sample

    }

    //calculate heart rate and SpO2 after first 100 samples (first 4 seconds of samples)
    maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);
    first_read = 1;
  }

  //dumping the first 25 sets of samples in the memory and shift the last 75 sets of samples to the top
  for (byte i = 25; i < 100; i++)
  {
    redBuffer[i - 25] = redBuffer[i];
    irBuffer[i - 25] = irBuffer[i];
  }

  //take 25 sets of samples before calculating the spo2.
  for (byte i = 75; i < 100; i++)
  {
    count_ox = count_ox +1;

    //leer solicitud ECG
    if(Firebase.getInt(firebaseData, path + "/Solicitud/ecg_id")){
      ex_ecg = firebaseData.intData();
    }
    
    //realización examen ECG
    while (ex_ecg == 1)
    {
      digitalWrite(LED_ECG, HIGH);

      //ECG listo para enviar
      if (ecg_ok == 1){
      
        String info = "";

        for (byte i = 0 ; i < ecg_length; i++)
        {
          info = info + String(ecg_data[i]) + ",";
        }

        Firebase.setString(firebaseData, path + "/Exámenes/Electrocardiograma/", info);

        Serial.println("ECG ENVIADO!");

        ecg_ok = 0; //vueve a sensar
      
      }


      //Muestras ECG
      if (ecg_ok == 0){
        Serial.println("Muestreando...");

        for (byte i = 0 ; i < ecg_length; i++)
        {
          if(digitalRead(lo_pos) != 1 && digitalRead(lo_neg) != 1){
            ecg_sensado = analogRead(Electrocardiograma);
            ecg_data[i] = ecg_sensado;
          }
      
          delay(4); //7
        }

        Serial.println("Muestreo terminado!");
        ecg_ok = 1;
      }

      if (Firebase.getInt(firebaseData, path + "/Solicitud/ecg_id")){ //reviso estado de solicitud ecg.
        ex_ecg = firebaseData.intData();
      }

    }
    
    //fin ECG
    digitalWrite(LED_ECG, LOW);

    //leer estado de los botones con interrupciones
    if (b1 == 1 || b2 == 1 || b3 == 1 || b4==1){

      count_b = count_b  + 1;

      if(b1 ==1 && count_b ==1){
        digitalWrite(led, HIGH);
        Firebase.setInt(firebaseData, path + "/Mensajes/Estado_1", 1);
      }

      else if(b2 ==1 && count_b ==1){
        digitalWrite(led, HIGH);
        Firebase.setInt(firebaseData, path + "/Mensajes/Estado_2", 1);
      }

      else if(b3 ==1 && count_b ==1){
        digitalWrite(led, HIGH);
        Firebase.setInt(firebaseData, path + "/Mensajes/Estado_3", 1);
      }

      else if(b4 ==1 && count_b ==1){
        digitalWrite(led, HIGH);
        Firebase.setInt(firebaseData, path + "/Mensajes/Estado_4", 1);
      }

    }

    digitalWrite(readLED, !digitalRead(readLED)); //Blink onboard LED with every data read
  
    //Lectura sensores
    gas_sensado = analogRead(gas_sensor);
    breath = -1*gas_sensado + 2600;

    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
    particleSensor.nextSample(); //We're finished with this sample so move to next sample
    //Fin sensado

    //**** frecuencia respiratoria***** //
    if (millis() - previousMillis <= ciclos ){

      if (breath > 60 && ref == 0){
        contador_resp = contador_resp +1;
        ref = 1;
    
      }

      else if (breath < -50){
        ref = 0;
      }

    }

    else if (millis() - previousMillis > ciclos ){
      //Serial.println("breath per 15 seconds: "); //Serial.println(contador_resp);
      frecuencia_resp = contador_resp * 4;
      //Serial.println("frequency respiratory: "); //Serial.println(frecuencia_resp);

      if (frecuencia_resp > 30){
        frecuencia_resp = 0;
      }

      Firebase.setInt(firebaseData, path + "/Resultados/value_rpm", frecuencia_resp);
      unsigned long currentMillis= millis();
      previousMillis= currentMillis;
      contador_resp= 0;

    } 
    //**** END frecuencia respiratoria***** //

    //lectura valida del oximetro
    if (validSPO2 == 1) 
    {
      digitalWrite(led_spo2, LOW);
      
      if (irBuffer[i]>5000)
      {
        value_spo2 = spo2;
      }

      else if (irBuffer[i]<5000) //no finger case
      {
        value_spo2 =0;
      }
    }

    else if (validSPO2 != 1){
      if (irBuffer[i]>5000)
      {
        value_spo2 = -999;
        digitalWrite(led_spo2, HIGH);
      }

      else if (irBuffer[i]<5000) //no finger case
      {
        value_spo2 =0;
        digitalWrite(led_spo2, LOW);
      }
    }
    
    //envio de datos
    Firebase.setInt(firebaseData, path + "/Sensores/Frecuencia_Respiratoria", breath);
    Firebase.setInt(firebaseData, path + "/Resultados/value_spo2", value_spo2);

    //dsp de un tiempo, resetea estado de los botones si es que al menos uno ha sido presionado.
    if (count_ox == 3)
    {
      
      if (count_b >= 1){

        if (b1 == 1){
          b1=0;
          Firebase.setInt(firebaseData, path + "/Mensajes/Estado_1", 0);
        }

        else if (b2 == 1){
          b2=0;
          Firebase.setInt(firebaseData, path + "/Mensajes/Estado_2", 0);
        }

        else if (b3 == 1){
          b3=0;
          Firebase.setInt(firebaseData, path + "/Mensajes/Estado_3", 0);
        }

        else if (b4 == 1){
          b4=0;
          Firebase.setInt(firebaseData, path + "/Mensajes/Estado_4", 0);
        }
 
        count_b=0;
        digitalWrite(led, LOW);
      }

      count_ox=0;

    }

  }

  //After gathering 25 new samples recalculate HR and SP02
  maxim_heart_rate_and_oxygen_saturation(irBuffer, bufferLength, redBuffer, &spo2, &validSPO2, &heartRate, &validHeartRate);

}
