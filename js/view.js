import ApexCharts from 'apexcharts'
// import Calendar from '@toast-ui/calendar';
// import '@toast-ui/calendar/dist/toastui-calendar.min.css';
// import { defineConfig } from 'vite';

let V = {};

V.init = function () {
    V.generateWeekNumbers()
    V.chart2 = null
    
}


V.generateWeekNumbers = function () {
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
V.ChartVolume = function (hoursVolume) {
    var options = {
        chart: {
            type: 'bar',
            width: 850,
            height: 350,
            background: '#2B2D3E'
        },
        series: [{
            name: 'heures',
            data: hoursVolume
        }],
        xaxis: {
            title: {
                text: 'Numéros de semaines',
                style: {
                    color: '#fff' // 
                }
            },
            categories: V.generateWeekNumbers(), 
            labels: {
                style: {
                    colors: '#fff' // Couleur du texte des étiquettes de l'axe des abscisses
                }
            }
            
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    position: 'top' // Position des étiquettes (top, center, bottom)
                }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val + ' h'; // Vous pouvez personnaliser la mise en forme du libellé si nécessaire
            },
            offsetY: -20, // Ajustez cette valeur pour régler la distance entre la barre et le libellé
            style: {
                fontSize: '8px',
                colors: ['#FFF'] // Couleur du texte
            }, 
            
        }, 
        yaxis: {
            title: {
                text: 'Heures',
                style: {
                    color: '#fff' // 
                }
            },
            labels: {
                style: {
                colors: '#fff' // Couleur du texte des étiquettes de l'axe des abscisses
                },
                formatter: function (value) {
                    return Math.round(value); // Arrondir à un nombre entier
                }
            },
            forceNiceScale: true // Force les valeurs de l'axe Y à être des nombres entiers
        },
        tooltip: {
            theme: 'dark',
            x: {
                formatter: function (val) {
                    return 'Semaine ' + val; // Ajouter 'Semaine' devant le numéro
                }
            }
        }
    }

    var chart = new ApexCharts(document.querySelector("#chart"), options);

    chart.render();

};




// Iteration 2 : Chart CM, TD, TP filtré par groupe de TP
V.CreateStackedBar = function (cm, td, tp) {
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

    if (V.chart2) {
        V.chart2.destroy();
    }
    V.chart2 = new ApexCharts(document.querySelector("#chart2"), options2);

    V.chart2.render();

    // permet de repositionner la page sur l'élément chart2
    window.scrollTo(0, document.querySelector("#chart2").offsetTop)

}

ApexCharts.exec('chart-id', 'updateOptions', {
    chart: {
        events: {
            dataPointSelection: function (event, chartContext, config) {
                // Changer la couleur des catégories CM, TD, TP en blanc
                $('.apexcharts-category-labels text:contains("CM")').css('fill', '#FFFFFF');
                $('.apexcharts-category-labels text:contains("TD")').css('fill', '#FFFFFF');
                $('.apexcharts-category-labels text:contains("TP")').css('fill', '#FFFFFF');
            }
        }
    }
});

// Iteration 3 : Chart volume horaires Resssources et SAE
V.CreateRadar = function (S1R, S1S, S2R, S2S) {

    var options3 = {
        series: [{
            name: 'S1 - Ressources',
            data: S1R,
        
        },
        {
            name: 'S1 - SAE',
            data: S1S,
        },
        {
            name: 'S2 - Ressources',
            data: S2R,
          
        }, {
            name: 'S2 - SAE',
            data: S2S,
            fill: {
                opacity: 0,
              },
            
        }],
        
        chart: {
            height: 320,
            type: 'radar',
        },
        dataLabels: {
            enabled: true
        },
        plotOptions: {
            radar: {
                size: 120,
                polygons: {
                    strokeColors: '#e9e9e9',
                    fill: {
                        colors: ['#f8f8f8', '#fff']
                    }
                }
            }
        },
        markers: {
            size: 4,
            colors: ['#fff'],
            strokeColor: '#000000',
            strokeWidth: 2,
        },
        tooltip: {
            y: {
                formatter: function (val) {
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
                formatter: function (val, i) {
                    if (i % 2 === 0) {
                        return val
                    } else {
                        return ''
                    }
                }
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                formatter: function (val) {
                    return 'Semaine ' + val; // Ajouter 'Semaine' devant le numéro
                }
            }
        }


    };



    if (V.chart3) {
        V.chart3.destroy();
    }

    V.chart3 = new ApexCharts(document.querySelector("#chart3"), options3);
    V.chart3.render();

    window.scrollTo(0, document.querySelector("#chart3").offsetTop)
}






export { V };