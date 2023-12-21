import ApexCharts from 'apexcharts'
import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};
let result;

await M.init();

C.init = function () {
  V.init();

  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);

  let it3 = document.querySelector('#select-it3');
  it3.addEventListener('change', C.handler_changeOnGroup3);

}

// Itération 2
M.CreateStackedBar = function (cm, td, tp) {
  let cmcopy = []
  let tdcopy = []
  let tpcopy = []

  for (let elmt of cm) {
    cmcopy.push(elmt)
  }
  for (let elmt of td) {
    tdcopy.push(elmt)
  }
  for (let elmt of tp) {
    tpcopy.push(elmt)
  }
  var options2 = {
    series: [{
      name: 'CM',
      data: cmcopy,
    }, {
      name: 'TD',
      data: tdcopy
    }, {
      name: 'TP',
      data: tpcopy
    },],
    chart: {
      type: 'bar',
      height: 600,
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          total: {
            enabled: true,
            offsetX: 0,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    title: {
      text: 'Fiction Books Sales'
    },
    xaxis: {
      categories: result,
      labels: {
        formatter: function (val) {
          return val + " Hours"
        }
      }
    },
    yaxis: {
      title: {
        text: undefined
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val + " Hours"
        }
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
      offsetX: 40
    }
  };


  var chart2 = new ApexCharts(document.querySelector("#chart2"), options2);

  chart2.render();

}



C.handler_changeOnGroup = function (ev) {


  if (ev.target.value == 'all') {
    let data1 = M.getCountsByWeekWithCourse('CM', "0")
    let data2 = M.getCountsByWeekWithCourse('TD', "0")
    let data3 = M.getCountsByWeekWithCourse('TP', "0")

    M.CreateStackedBar(data1, data2, data3)
  }
  else {

    let data1 = M.getCountsByWeekWithCourse('CM', ev.target.value)
    console.log(data1)
    let data2 = M.getCountsByWeekWithCourse('TD', ev.target.value)
    let data3 = M.getCountsByWeekWithCourse('TP', ev.target.value)

    M.CreateStackedBar(data1, data2, data3)

  }


}



result = V.generateWeekNumbers()




// affichage des groupes


// Iteration 1 : Chart volume d'heures de cours par semaine

var options = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'heures',
    data: M.getCountsByWeek()
  }],
  xaxis: {
    title: {
      text: 'Numéros de semaines',
    },
    categories: result
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


// Iteration 2 : Chart CM, TD, TP filtré par groupe de TP




// Iteration 3 : Resssources et SAE
V.CreateRadar = function(S1R, S1S, S2R, S2S) {

  var options3 = {
    series: [{
    name: 'Semestre 1 - Ressources',
    data: S1R,
  }, 
  {
    name: 'Semestre 1 - SAE',
    data: S1S,
  }, 
  {
    name: 'Semestre 2 - Ressources',
    data: S2R,
  },{
    name: 'Semestre 2 - SAE',
    data: S2S,
  }],
    chart: {
    height: 650,
    type: 'radar',
  },
  dataLabels: {
    enabled: true
  },
  plotOptions: {
    radar: {
      size: 300,
      polygons: {
        strokeColors: '#e9e9e9',
        fill: {
          colors: ['#f8f8f8', '#fff']
        }
      }
    }
  },
  title: {
    text: 'Radar with Polygon Fill'
  },
  markers: {
    size: 4,
    colors: ['#fff'],
    strokeColor: '#FF4560',
    strokeWidth: 2,
  },
  tooltip: {
    y: {
      formatter: function(val) {
        return val
      }
    }
  },
  xaxis: {
    categories: ['CM', 'TD', 'TP']
  },
  yaxis: {
    tickAmount: 7,
    labels: {
      formatter: function(val, i) {
        if (i % 2 === 0) {
          return val
        } else {
          return ''
        }
      }
    }
  }


  };

 


  // var options3 = {
  //   series: [{
  //     name: 'S1 - Ressources',
  //     data: S1R,
  //   }, {
  //     name: 'S1 - SAE',
  //     data: S1S,
  //   }, {
  //     name: 'S2 - Ressources',
  //     data: S2R,
  //   }, {
  //     name: 'S2 - SAE',
  //     data: S2S,
  //   }],
  //   chart: {
  //     height: 650,
  //     type: 'radar',
  //     dataLabels: {
  //       enabled: true
  //     },
  //     dropShadow: {
  //       enabled: true,
  //       blur: 1,
  //       left: 1,
  //       top: 1
  //     }
  //   },
  //   title: {
  //     text: 'Radar Chart - Multi Series'
  //   },
  //   markers: {
  //     size: 4,
  //     colors: ['#fff'],
  //     strokeColor: '#FF4560',
  //     strokeWidth: 2,
  //   },
  //   stroke: {
  //     width: 2
  //   },
  //   fill: {
  //     opacity: 0.1
  //   },
  //   markers: {
  //     size: 0
  //   },
  //   xaxis: {
  //     categories: ['CM', 'TD', 'TP']
  //   }
  // };

  if(V.chart3){
    V.chart3.destroy();
  }

  V.chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
  V.chart3.render();

  window.scrollTo(0, document.querySelector("#chart3").offsetTop)
}




M.getCountsByWeekSemester('TP', '0', 'S1')



C.handler_changeOnGroup3 = function (ev) {
  let TABS1R = []
  let TABS2R = []
  let TABS1S = []
  let TABS2S = []


  if (ev.target.value == 'all') {
    TABS1R.push(M.getCountsByWeekSemester('CM', '0', 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TD', '0', 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TP', '0', 'S1'))

    TABS2R.push(M.getCountsByWeekSemester('CM', '0', 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TD', '0', 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TP', '0', 'S2'))

    TABS1S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))

    TABS2S.push(M.getCountsByWeekSemester('CM', '0', 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TD', '0', 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TP', '0', 'S1S'))
    
    V.CreateRadar(TABS1R, TABS2R, TABS1S, TABS2S)
  }
  else {
    TABS1R.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1'))
    TABS1R.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1'))

    TABS2R.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S2'))
    TABS2R.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S2'))

    TABS1S.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1S'))
    TABS1S.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1S'))

    TABS2S.push(M.getCountsByWeekSemester('CM', ev.target.value, 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TD', ev.target.value, 'S1S'))
    TABS2S.push(M.getCountsByWeekSemester('TP', ev.target.value, 'S1S'))
    
    V.CreateRadar(TABS1R, TABS2R, TABS1S, TABS2S)
  }


}



C.init();



//test