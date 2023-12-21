import ApexCharts from 'apexcharts'
// import Calendar from '@toast-ui/calendar';
// import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import { defineConfig } from 'vite';

let V = {};

V.init = function(){
        V.generateWeekNumbers()
        V.chart2 = null
}


V.generateWeekNumbers = function() {
  const weekNumbers = [];

  // Génère les nombres de semaine de 36 à 52
  for (let i = 36; i <= 52; i++) {

          weekNumbers.push(i);

  }

  // Génère les nombres de semaine de 1 à 7
  for (let i = 1; i <= 7; i++) {

          weekNumbers.push(i);

  }

  return weekNumbers;
 
}




// Iteration 1 : Chart volume d'heures de cours par semaine
V.ChartVolume = function(hoursVolume){
        var options = {
          chart: {
            type: 'bar'
          },
          series: [{
            name: 'heures',
            data: hoursVolume
          }],
          xaxis: {
            title: {
              text: 'Numéros de semaines',
            },
            categories: V.generateWeekNumbers()
          }
        }
        
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        
        chart.render();
      
      }




// Iteration 2 : Chart CM, TD, TP filtré par groupe de TP
V.CreateStackedBar = function (cm, td, tp) {
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
      
        console.log(cmcopy)
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
            categories: V.generateWeekNumbers(),
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
      
        if(V.chart2){
          V.chart2.destroy();
        }
        V.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
      
        V.chart2.render();

        // permet de repositionner la page sur l'élément chart2
        window.scrollTo(0, document.querySelector("#chart2").offsetTop)
      
      }



export { V };