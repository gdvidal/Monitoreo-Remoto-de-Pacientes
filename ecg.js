
var data_old ;
var data_old_old ;

function load_data(){

    var time = (new Date()).getTime();
    var database = firebase.database();

    var Data_0, Data_1, Data_2, Data_3, Data_4, Data_5, Data_6, Data_7, Data_8, Data_9, Data_10;
    var Data_201, Data_11, Data_21, Data_31, Data_41, Data_51, Data_61, Data_71, Data_81, Data_91, Data_101, Data_111, Data_121, Data_131, Data_141, Data_151, Data_161, Data_171, Data_181, Data_191, Data_211, Data_221, Data_231, Data_241, Data_251;
    var Data_202, Data_12, Data_22, Data_32, Data_42, Data_52, Data_62, Data_72, Data_82, Data_92, Data_102, Data_112, Data_122, Data_132, Data_142, Data_152, Data_162, Data_172, Data_182, Data_192, Data_212, Data_222, Data_232, Data_242, Data_252;
    var Data_203, Data_13, Data_23, Data_33, Data_43, Data_53, Data_63, Data_73, Data_83, Data_93, Data_103, Data_113, Data_123, Data_133, Data_143, Data_153, Data_163, Data_173, Data_183, Data_193, Data_213, Data_223, Data_233, Data_243, Data_253;
    var Data_204, Data_14, Data_24, Data_34, Data_44, Data_54, Data_64, Data_74, Data_84, Data_94, Data_104, Data_114, Data_124, Data_134, Data_144, Data_154, Data_164, Data_174, Data_184, Data_194, Data_214, Data_224, Data_234, Data_244, Data_254;
    var Data_205, Data_15, Data_25, Data_35, Data_45, Data_55, Data_65, Data_75, Data_85, Data_95, Data_105, Data_115, Data_125, Data_135, Data_145, Data_155, Data_165, Data_175, Data_185, Data_195, Data_215, Data_225, Data_235, Data_245;
    var Data_206, Data_16, Data_26, Data_36, Data_46, Data_56, Data_66, Data_76, Data_86, Data_96, Data_106, Data_116, Data_126, Data_136, Data_146, Data_156, Data_166, Data_176, Data_186, Data_196, Data_216, Data_226, Data_236, Data_246;
    var Data_207, Data_17, Data_27, Data_37, Data_47, Data_57, Data_67, Data_77, Data_87, Data_97, Data_107, Data_117, Data_127, Data_137, Data_147, Data_157, Data_167, Data_177, Data_187, Data_197, Data_217, Data_227, Data_237, Data_247;
    var Data_208, Data_18, Data_28, Data_38, Data_48, Data_58, Data_68, Data_78, Data_88, Data_98, Data_108, Data_118, Data_128, Data_138, Data_148, Data_158, Data_168, Data_178, Data_188, Data_198, Data_218, Data_228, Data_238, Data_248;
    var Data_209, Data_19, Data_29, Data_39, Data_49, Data_59, Data_69, Data_79, Data_89, Data_99, Data_109, Data_119, Data_129, Data_139, Data_149, Data_159, Data_169, Data_179, Data_189, Data_199, Data_219, Data_229, Data_239, Data_249;
    var Data_210, Data_20, Data_30, Data_40, Data_50, Data_60, Data_70, Data_80, Data_90, Data_100, Data_110, Data_120, Data_130, Data_140, Data_150, Data_160, Data_170, Data_180, Data_190, Data_200, Data_220, Data_230, Data_240, Data_250;

    var ecg ;
    var axis_x = []
    var time = (new Date()).getTime();

    var Electrocardiograma;
    var datas;
    var x = time + i*1000;
    var info1;

    database.ref('/Planificación II/Exámenes').on("value", function(snap){
        Electrocardiograma = snap.val().Electrocardiograma;
        datas = Electrocardiograma.split(",",254).map(Number);
        
        //info1= data_old.concat(datas);
        info1 =data_old_old.concat(data_old,datas);
    });
    
    data_old_old = data_old;
    data_old = datas;
    info= info1;
    
    //document.getElementById("ECG_value").innerText = info1;
    //document.getElementById("ECG_value").textContent = info1;

    console.time('line');
    Highcharts.chart('container_x', {
    
        chart: {
        type: 'line',
        zoomType: 'x',
        },
    
        title: {
        text: null
        },
    
        subtitle: {
        text: null
        },
        
        yAxis: {
            title: {
                text: "Voltaje [mV]"
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],

        },

        plotOptions: {
            series: {
                color: '#FF0000',
            },

            marker: {
                radius: 0
            }
        },
    
        tooltip: {
        valueDecimals: 2
        },
    
        xAxis: {

            title: {
                text: "Número de muestra"
            },
        
            tickPixelInterval: 150
        },
        
        series: [{
        data: info, 
        lineWidth: 0.7,
        name: 'ECG'
        }]
    
    });

    console.timeEnd('line');

    setTimeout(load_data, 1200);
    
}

load_data();

