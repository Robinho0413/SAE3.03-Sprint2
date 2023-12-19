import ApexCharts from 'apexcharts'
import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

await M.init();

C.init = function(){
  V.init();

  //filtrer par groupe
  let group = document.querySelector('#select-groups');
  group.addEventListener('change', C.handler_changeOnGroup);
  
}

let result = V.generateWeekNumbers()

let courseEvents = M.getCountsByWeekWithCourse();
console.log(courseEvents);

// affichage des groupes
C.handler_changeOnGroup = function(ev){
  let allEvents = M.getConcatEvents();

  let eventsByGroup = [];

  for(let event of allEvents){
    if(event.groups.includes(ev.target.value)){
      eventsByGroup.push(event);
    }
  }

  //parcourir eventsByGroup


  console.log(eventsByGroup);

  return(eventsByGroup)
}









// Chart volume d'heures de cours par semaine

var options = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'heures',
    data: M.getCountsByWeek()
  }],
  xaxis: {
    title : {
      text : 'Numéros de semaines',
    },
    categories: result
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


// Chart CM, TD, TP filtré par groupe de TP

var options = {
  series: [{
  name: 'CM',
  data: courseEvents
}, {
  name: 'TD',
  data: [53, 32, 33, 52, 13, 43, 32]
}, {
  name: 'TP',
  data: [44, 55, 41, 37, 22, 43, 21]
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

var chart2 = new ApexCharts(document.querySelector("#chart2"), options);
chart2.render();








C.init();

//test
