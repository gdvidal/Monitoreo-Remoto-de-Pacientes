function showBPM(){

    var database = firebase.database();
    var value_bpm;

    database.ref('/Planificación II/Resultados').on("value", function(snap){
        value_bpm= snap.val().value_bpm;
    });

    var bpm = value_bpm;
    document.getElementById("BPM_value").innerText = bpm;
    document.getElementById("BPM_value").textContent = bpm;
    
    setTimeout(showBPM, 1000);

}

function showSPO2(){
    var database = firebase.database();
    var value_spo2;

    database.ref('/Planificación II/Resultados').on("value", function(snap){
        value_spo2= snap.val().value_spo2;
    });

    var spo2 = value_spo2;
    document.getElementById("SPO2_value").innerText = spo2;
    document.getElementById("SPO2_value").textContent = spo2;
    
    setTimeout(showSPO2, 1000);

}

function showRPM(){
    var database = firebase.database();
    var value_rpm;

    database.ref('/Planificación II/Resultados').on("value", function(snap){
        value_rpm= snap.val().value_rpm;
    });

    var rpm = value_rpm;
    document.getElementById("RPM_value").innerText = rpm;
    document.getElementById("RPM_value").textContent = rpm;
    
    setTimeout(showRPM, 1000);

}

function showTemperature(){
    var database = firebase.database();
    var value_temperature;

    database.ref('/Planificación II/Resultados').on("value", function(snap){
        value_temperature= snap.val().value_temperature;
    });

    var temperature = value_temperature;
    document.getElementById("T_value").innerText = temperature;
    document.getElementById("T_value").textContent = temperature;
    
    setTimeout(showTemperature, 1000);

}
showBPM();
showSPO2();
showRPM();
showTemperature();


