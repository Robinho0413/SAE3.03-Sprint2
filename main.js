import ApexCharts from 'apexcharts'

import { M } from "./js/model.js";

import { V } from "./js/view.js";

 

let C = {};

 

await M.init();

 

C.init = function(){

  V.init();

}


let result = V.generateWeekNumbers()


var options = {

  chart: {

    type: 'bar',
    height: '500px',
    stacked: true,

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









C.init();