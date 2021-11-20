function getData(n) {

    var ecg = [355,356,359,357,359,358,358,362,372,382,367,359,355,356,357,360,354,529,246,301,353,363,368,370,372,372,373,376,
    384,391,394,379,356,344,340,339,340,343,344,345,346,347,345,344,344,344,344,343,343,344,344,345,344,343,344,344,343,344,346,353,357,347,344,342,341,344,339,367,424,225,319,340,345,348,349,350,352,354,358,368,374,380,360,338,327,327,326,329,331,
    334,335,338,337,337,336,334,333,333,332,330,330,331,330,329,327,329,329,329,330,335,335,328,321,320,317,318,315,312,469,208,276,308,313,317,317,319,321,320,323,333,341,345,328,308,298,297,296,296,300,303,302,304,303,304,301,300,304,303,303,305,
    304,303,306,312,313,312,307,301,301,307,307,295,480,217,253,305,316,322,326,330,330,335,339,350,360,368,359,343,332,333,336,340,346,352,355,357,359,360,363,363,366,370,371,376,385,393,377,371,368,368,370,371,366,547,257,326,370,377,382,385,385,
    387,387,390,397,404,406,388,369,360,356,353,357,357,360,360,362,362,360,361,362,361,361,359,359,359,356,356,364,376,373,358,350,346,347,349,347,368,455,228,319,346,354,356,358];

    
    var time = (new Date()).getTime();
    var ecg_data = [];

   
    var arr = [],
      x,
      y;

    for (i = 0; i < n; i = i + 1) {

        x = time + i * 1000;

      arr.push([
        x,
        ecg[i]
      ]);
    }
    return arr;
  }
  var n = 255,
    data = getData(n);
  
  
  console.time('line');
  Highcharts.chart('container_5', {
  
    chart: {
      zoomType: 'x'
    },
  
    title: {
      text: null
    },
  
    subtitle: {
      text: null
    },
    
    yAxis: {
        title: {
            text: null
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
        } 
    },
  
    tooltip: {
      valueDecimals: 2
    },
  
    xAxis: {
      type: 'datetime',
      tickPixelInterval: 150
    },
  
    series: [{
      data: data,
      lineWidth: 0.7,
      name: 'ECG'
    }]
  
  });
  console.timeEnd('line');

////////////////////////////////////////


 