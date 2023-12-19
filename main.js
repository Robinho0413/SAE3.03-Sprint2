import ApexCharts from 'apexcharts'
// import { M } from "./js/model.js";
import { V } from "./js/view.js";

let C = {};

// await M.init();

C.init = function(){
  V.init();
}


var options = {
  chart: {
    type: 'bar'
  },
  series: [{
    name: 'sales',
    data: [30,40,35,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}

var chart = new ApexCharts(document.querySelector("#chart"), options);

chart.render();


C.init();
