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
        
        V.chart = new ApexCharts(document.querySelector("#chart"), options);
        
        V.chart.render();
      
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
      
        var options = {
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
        V.chart2 = new ApexCharts(document.querySelector("#chart2"), options);
      
        V.chart2.render();

        // permet de repositionner la page sur l'élément chart2
        window.scrollTo(0, document.querySelector("#chart2").offsetTop)
      
}


//iteration 4
V.endOfCourseTime = function(dataBut1G1, dataBut1G21, dataBut1G22, dataBut1G3, dataBut2G1, dataBut2G21, dataBut2G22, dataBut2G3, dataBut3G1, dataBut3G21, dataBut3G22, dataBut3G3){
        var options = {
                series: [{
                  name: "BUT1-G1",
                  data: dataBut1G1,
                  color: 'rgb(255, 69, 96)'
                },
                {
                  name: "BUT1-G21",
                  data: dataBut1G21,
                  color: 'rgb(255, 69, 96)'
                },
                {
                  name: 'BUT1-G22',
                  data: dataBut1G22,
                  color: 'rgb(255, 69, 96)'
                },
                {
                  name: 'BUT1-G3',
                  data: dataBut1G3,
                  color: 'rgb(255, 69, 96)'
                },
                {
                  name: 'BUT2-G1',
                  data: dataBut2G1,
                  color: 'rgb(0, 227, 150)'
                },
                {
                  name: 'BUT2-G21',
                  data: dataBut2G21,
                  color: 'rgb(0, 227, 150)'
                },
                {
                  name: 'BUT2-G22',
                  data: dataBut2G22,
                  color: 'rgb(0, 227, 150)'
                },
                {
                  name: 'BUT2-G3',
                  data: dataBut2G3,
                  color: 'rgb(0, 227, 150)'
                },
                {
                  name: 'BUT3-G1',
                  data: dataBut3G1,
                  color: 'rgb(0, 143, 251)'
                },
                {
                  name: 'BUT3-G21',
                  data: dataBut3G21,
                  color: 'rgb(0, 143, 251)'
                },
                {
                  name: 'BUT3-G22',
                  data: dataBut3G22,
                  color: 'rgb(0, 143, 251)'
                },
                {
                  name: 'BUT3-G3',
                  data: dataBut3G3,
                  color: 'rgb(0, 143, 251)'
                }
              ],
                chart: {
                height: 650,
                type: 'line',
                zoom: {
                  enabled: false
                },
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                width: 2,
              },
              title: {
                text: 'Heures moyennes de fin des cours',
                align: 'left'
              },
              legend: {
                tooltipHoverFormatter: function(val, opts) {
                  return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
                }
              },
              markers: {
                size: 0,
                hover: {
                  sizeOffset: 6
                }
              },
              xaxis: {
                categories: ['Lundi', 'Mardi','Mercredi','Jeudi','Vendredi']
              },
              tooltip: {
                y: [
                  {
                    title: {
                      formatter: function (val) {
                        return val;
                      }
                    }
                  }
                ]
              },
              grid: {
                borderColor: '#f1f1f1',
              }
              };
        
              V.chart4 = new ApexCharts(document.querySelector("#chart4"), options);
              V.chart4.render();
}



export { V };