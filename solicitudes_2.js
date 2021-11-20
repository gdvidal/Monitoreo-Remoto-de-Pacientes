document.getElementById("solicitar_exp").addEventListener("click", function() {
    firebase.database().ref('/Planificación II/Solicitud_2').set({
      exp_id: 1 
    });

    document.getElementById('texto_2').innerHTML = "Exámen en proceso ...";
                                            
  });
  
document.getElementById("terminar_exp").addEventListener("click", function() {
firebase.database().ref('/Planificación II/Solicitud_2').set({
    exp_id: 0 
});

firebase.database().ref('/Planificación II/Control_leds').set({
  intensidad_3: 0
});

document.getElementById('texto_2').innerHTML = "";
document.getElementById('texto_led').innerHTML = "";
                                        
});
  