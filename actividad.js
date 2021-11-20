Highcharts.chart('container_7', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                var database = firebase.database();
                var Estado_1;
                var Actividad_1 = "Comer";
                var count = 0;
                var minutos=0;
                var minutos2=0;
                var count_b=0;

                var act_11;

                setInterval(function () {

                    database.ref('/Planificación II/Mensajes').on("value", function(snap){
                        Estado_1 = snap.val().Estado_1;
                    });

                    var x = (new Date()).getTime(), // current time
                        y = Estado_1;
                    series.addPoint([x, y], true, true);

                    
                    if (Estado_1 == 1)
                    {
                        var act = (new Date());
                        count = count + 1;

                        if (count ==1)
                        {
                            //var info_11;
                            var hoy = (new Date());
                            minutos= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_11/').set({
                                act_11: String(Actividad_1) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual").innerHTML = hora;
                            document.getElementById("hora_actual").textContent = hora;

                            document.getElementById("actividad_actual").innerHTML = Actividad_1;
                            document.getElementById("actividad_actual").textContent = Actividad_1;


                            count_b=2;

                        }

                        if (count_b ==2 && (act.getMinutes() > minutos))
                        {
                            var hoy = (new Date());
                            minutos2= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_12/').set({
                                act_12: String(Actividad_1) + ";" +  String(hora)
                            });
                            
                            document.getElementById("hora_actual12").innerHTML = hora;
                            document.getElementById("hora_actual12").textContent = hora;

                            document.getElementById("actividad_actual12").innerHTML = Actividad_1;
                            document.getElementById("actividad_actual12").textContent = Actividad_1;

                            count_b=3;
                           
                        }

                        if (count_b ==3 && (act.getMinutes() > minutos2))
                        {
                            var hoy = (new Date());
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_13/').set({
                                act_13: String(Actividad_1) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual13").innerHTML = hora;
                            document.getElementById("hora_actual13").textContent = hora;

                            document.getElementById("actividad_actual13").innerHTML = Actividad_1;
                            document.getElementById("actividad_actual13").textContent = Actividad_1;

                        }

                    }

                    //leer actividades
                    //database.ref('/Planificación II/Actividad_11').on("value", function(snap){
                    //    act_11 = snap.val().act_11;
                    //    act_11 = act_11.split(";");
                    //});
                    

                    //document.getElementById("hora_actual").innerHTML = act_11[1];
                    //document.getElementById("hora_actual").textContent = act_11[1];

                    //document.getElementById("actividad_actual").innerHTML = act_11[0];
                    //document.getElementById("actividad_actual").textContent = act_11[0];
                    
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        style: {'color': "#000000", "fontSize": "25px"},
        text: null
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        title: {
            text: "Tiempo (hh:mm:ss)"
        },
        type: 'datetime',
        tickPixelInterval: 100
    },

    yAxis: {
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    plotOptions: {
        series: {
            color: '#00FFFF',
            marker: {
                radius: 0
            }
        }

        
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Comida',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: 0
                });
            }
            return data;
        }())
    }]
});


Highcharts.chart('container_8', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                var database = firebase.database();
                var Estado_2;
                var Actividad_2 = "Orinar";
                var count = 0;
                var minutos=0;
                var minutos2=0;
                var minutos3=0;
                var minutos4=0;
                var count_b=0;

                setInterval(function () {

                    //database.ref('/Planificación II/Mensajes').on("value", function(snap){
                    //    Actividad_2 = snap.val().Actividad_2;
                    //});

                    database.ref('/Planificación II/Mensajes').on("value", function(snap){
                        Estado_2 = snap.val().Estado_2;
                    });

                    var x = (new Date()).getTime(), // current time
                        y = Estado_2;
                    series.addPoint([x, y], true, true);

                    if (Estado_2 == 1)
                    {
                        var act = (new Date());
                        count = count + 1;

                        if (count == 1)
                        {
                            var hoy = (new Date());
                            minutos= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_21/').set({
                                act_21: String(Actividad_2) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual2").innerHTML = hora;
                            document.getElementById("hora_actual2").textContent = hora;

                            document.getElementById("actividad_actual2").innerHTML = Actividad_2;
                            document.getElementById("actividad_actual2").textContent = Actividad_2;

                            count_b=2;

                        }

                        if (count_b == 2 && (act.getMinutes() > minutos))
                        {
                            var hoy = (new Date());
                            minutos2= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_22/').set({
                                act_22: String(Actividad_2) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual22").innerHTML = hora;
                            document.getElementById("hora_actual22").textContent = hora;

                            document.getElementById("actividad_actual22").innerHTML = Actividad_2;
                            document.getElementById("actividad_actual22").textContent = Actividad_2;

                            count_b=3;

                        }

                        if (count_b == 3 && (act.getMinutes() > minutos2))
                        {
                            var hoy = (new Date());
                            minutos3= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_23/').set({
                                act_23: String(Actividad_2) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual23").innerHTML = hora;
                            document.getElementById("hora_actual23").textContent = hora;

                            document.getElementById("actividad_actual23").innerHTML = Actividad_2;
                            document.getElementById("actividad_actual23").textContent = Actividad_2;

                            count_b=4;

                        }

                        if (count_b == 4 && (act.getMinutes() > minutos3))
                        {
                            var hoy = (new Date());
                            minutos4= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_24/').set({
                                act_24: String(Actividad_2) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual24").innerHTML = hora;
                            document.getElementById("hora_actual24").textContent = hora;

                            document.getElementById("actividad_actual24").innerHTML = Actividad_2;
                            document.getElementById("actividad_actual24").textContent = Actividad_2;

                            count_b=5;

                        }

                        if (count_b == 5 && (act.getMinutes() > minutos4))
                        {
                            var hoy = (new Date());
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_25/').set({
                                act_25: String(Actividad_2) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual25").innerHTML = hora;
                            document.getElementById("hora_actual25").textContent = hora;

                            document.getElementById("actividad_actual25").innerHTML = Actividad_2;
                            document.getElementById("actividad_actual25").textContent = Actividad_2;

                        }

                    
                    }
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        style: {'color': "#000000", "fontSize": "25px"},
        text: null
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        title: {
            text: "Tiempo (hh:mm:ss)"
        },
        type: 'datetime',
        tickPixelInterval: 100
    },

    yAxis: {
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    plotOptions: {
        series: {
            color: '#FFFF00',
            marker: {
                radius: 0
            }
        }

        
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Orinar',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: 0
                });
            }
            return data;
        }())
    }]
});

Highcharts.chart('container_9', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                var database = firebase.database();
                var Estado_3;
                var Actividad_3 = "Evacuar";
                var count = 0;
                var minutos=0;
                var minutos2=0;
                var count_b=0;

                setInterval(function () {

                    //database.ref('/Planificación II/Mensajes').on("value", function(snap){
                    //    Actividad_3 = snap.val().Actividad_3;
                    //});

                    database.ref('/Planificación II/Mensajes').on("value", function(snap){
                        Estado_3 = snap.val().Estado_3;
                    });

                    var x = (new Date()).getTime(), // current time
                        y = Estado_3;
                    series.addPoint([x, y], true, true);

                    

                    if (Estado_3 == 1)
                    {
                        var act = (new Date());
                        count = count + 1;

                        if (count == 1)
                        {
                            var hoy = (new Date());
                            minutos= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_31/').set({
                                act_31: String(Actividad_3) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual3").innerHTML = hora;
                            document.getElementById("hora_actual3").textContent = hora;

                            document.getElementById("actividad_actual3").innerHTML = Actividad_3;
                            document.getElementById("actividad_actual3").textContent = Actividad_3;
                            count_b=1;

                        }

                        
                        if (count_b == 1 && (act.getMinutes() > minutos)){
                            var hoy = (new Date());
                            minutos2 =hoy.getMinutes(); 
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_32/').set({
                                act_32: String(Actividad_3) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual32").innerHTML = hora;
                            document.getElementById("hora_actual32").textContent = hora;

                            document.getElementById("actividad_actual32").innerHTML = Actividad_3;
                            document.getElementById("actividad_actual32").textContent = Actividad_3;
                            count_b=3;
                        } 

     
                        if(count_b ==3 && (act.getMinutes() > minutos2)){
                            var hoy = (new Date());
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_33/').set({
                                act_33: String(Actividad_3) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual33").innerHTML = hora;
                            document.getElementById("hora_actual33").textContent = hora;

                            document.getElementById("actividad_actual33").innerHTML = Actividad_3;
                            document.getElementById("actividad_actual33").textContent = Actividad_3;
                        }   

                    }
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        style: {'color': "#000000", "fontSize": "25px"},
        text: null
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        title: {
            text: "Tiempo (hh:mm:ss)"
        },
        type: 'datetime',
        tickPixelInterval: 100
    },

    yAxis: {
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    plotOptions: {
        series: {
            color: '#000080',
            marker: {
                radius: 0
            }
        }

        
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Evacuar',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: 0
                });
            }
            return data;
        }())
    }]
});

Highcharts.chart('container_med', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        events: {
            load: function () {

                // set up the updating of the chart each second
                var series = this.series[0];
                var database = firebase.database();
                var Estado_4;
                var Actividad_4 = "Medicamentos";
                var count = 0;
                var minutos=0;
                var minutos2=0;
                var minutos3=0;
                var minutos4=0;
                var count_b=0;

                setInterval(function () {

                    database.ref('/Planificación II/Mensajes').on("value", function(snap){
                        Estado_4 = snap.val().Estado_4;
                    });

                    var x = (new Date()).getTime(), // current time
                        y = Estado_4;
                    series.addPoint([x, y], true, true);

                    
                    if (Estado_4 == 1)
                    {
                        var act = (new Date());
                        count = count + 1;

                        if (count == 1)
                        {
                            var hoy = (new Date());
                            minutos= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_41/').set({
                                act_41: String(Actividad_4) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual41").innerHTML = hora;
                            document.getElementById("hora_actual41").textContent = hora;

                            document.getElementById("actividad_actual41").innerHTML = Actividad_4;
                            document.getElementById("actividad_actual41").textContent = Actividad_4;

                            count_b =2;

                        }

                        if (count_b == 2 && (act.getMinutes() > minutos))
                        {
                            var hoy = (new Date());
                            minutos2= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_42/').set({
                                act_42: String(Actividad_4) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual42").innerHTML = hora;
                            document.getElementById("hora_actual42").textContent = hora;

                            document.getElementById("actividad_actual42").innerHTML = Actividad_4;
                            document.getElementById("actividad_actual42").textContent = Actividad_4;
                            count_b = 3;
                        }

                        if (count_b == 3 && (act.getMinutes() > minutos2))
                        {
                            var hoy = (new Date());
                            minutos3= hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_43/').set({
                                act_43: String(Actividad_4) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual43").innerHTML = hora;
                            document.getElementById("hora_actual43").textContent = hora;

                            document.getElementById("actividad_actual43").innerHTML = Actividad_4;
                            document.getElementById("actividad_actual43").textContent = Actividad_4;

                            count_b=4;
                        }

                        if (count_b ==4 && (act.getMinutes() > minutos3))
                        {
                            var hoy = (new Date());
                            minutos4 = hoy.getMinutes();
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_44/').set({
                                act_44: String(Actividad_4) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual44").innerHTML = hora;
                            document.getElementById("hora_actual44").textContent = hora;

                            document.getElementById("actividad_actual44").innerHTML = Actividad_4;
                            document.getElementById("actividad_actual44").textContent = Actividad_4;

                            count_b=5;
                        }

                        if (count_b ==5 && (act.getMinutes() > minutos4))
                        {
                            var hoy = (new Date());
                            var hora = hoy.getDate() + '/' + (hoy.getMonth() +1) + '/'+ hoy.getFullYear() + ',  ' + hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
                            
                            firebase.database().ref('/Planificación II/Actividad_45/').set({
                                act_45: String(Actividad_4) + ";" +  String(hora)
                            });

                            document.getElementById("hora_actual45").innerHTML = hora;
                            document.getElementById("hora_actual45").textContent = hora;

                            document.getElementById("actividad_actual45").innerHTML = Actividad_4;
                            document.getElementById("actividad_actual45").textContent = Actividad_4;
                        }

                    }
                }, 1000);
            }
        }
    },

    time: {
        useUTC: false
    },

    title: {
        style: {'color': "#000000", "fontSize": "25px"},
        text: null
    },

    accessibility: {
        announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
                if (newPoint) {
                    return 'New point added. Value: ' + newPoint.y;
                }
                return false;
            }
        }
    },

    xAxis: {
        title: {
            text: "Tiempo (hh:mm:ss)"
        },
        type: 'datetime',
        tickPixelInterval: 100
    },

    yAxis: {
        title: {
            text: null
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },

    plotOptions: {
        series: {
            color: '#000000',
            marker: {
                radius: 0
            }
        }

        
    },

    tooltip: {
        headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f}'
    },

    legend: {
        enabled: false
    },

    exporting: {
        enabled: false
    },

    series: [{
        name: 'Medicamentos',
        data: (function () {
            // generate an array of random data
            var data = [],
                time = (new Date()).getTime(),
                i;

            for (i = -19; i <= 0; i += 1) {
                data.push({
                    x: time + i * 1000,
                    y: 0
                });
            }
            return data;
        }())
    }]
});