import ApexCharts from 'apexcharts'
import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

C.init = function () {
  V.init();

  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);

}

M.CreateStackedBar = function (cm, td, tp) {
  let cmcopy = []
  let tdcopy = []
  let tpcopy = []

  for(let elmt of cm){
    cmcopy.push(elmt)
  }
  for(let elmt of td){
    tdcopy.push(elmt)
  }
  for(let elmt of tp){
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



let result = V.generateWeekNumbers()




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

var options3 = {
  series: [{
    name: 'S1 - Ressources',
    data: [80, 50, 30, 40],
  }, {
    name: 'S1 - SAE',
    data: [20, 30, 40, 90],
  }, {
    name: 'S2 - Ressources',
    data: [44, 76, 78, 13],
  }, {
    name: 'S2 - SAE',
    data: [64, 16, 38, 63],
  }],
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1
    }
  },
  title: {
    text: 'Radar Chart - Multi Series'
  },
  stroke: {
    width: 2
  },
  fill: {
    opacity: 0.1
  },
  markers: {
    size: 0
  },
  xaxis: {
    categories: ['CM', 'TD', 'TP', 'Autres']
  }
};

var chart = new ApexCharts(document.querySelector("#chart3"), options3);
chart.render();






C.init();