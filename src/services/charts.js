import Highcharts from 'highcharts';
import highcharts from 'highcharts/modules/exporting';
import QueryTask from 'esri/tasks/QueryTask';
import layers from '../services/layers-service';
import _ from 'lodash';
import formatDate from '../services/milliSecondsToDate';
import StatisticDefinition from 'esri/tasks/StatisticDefinition';
import moment from 'moment';


const comunas = [
  {value: 'TOTAL', label: 'TOTAL' },
  {value: "CALLE LARGA", label: "CALLE LARGA"},
  {value: "CARTAGENA", label: "CARTAGENA"},
  {value: "CATEMU", label: "CATEMU"},
  {value: "CONCON", label: "CONCON"},
  {value: "HIJUELAS", label: "HIJUELAS"},
  {value: "LA CALERA", label: "LA CALERA"},
  {value: "LA CRUZ", label: "LA CRUZ"},
  {value: "LIMACHE", label: "LIMACHE"},
  {value: "LLAY LLAY", label: "LLAY LLAY"},
  {value: "LOS ANDES", label: "LOS ANDES"},
  {value: "NOGALES", label: "NOGALES"},
  {value: "OLMUE", label: "OLMUE"},
  {value: "PANQUEHUE", label: "PANQUEHUE"},
  {value: "PUCHUNCAVI", label: "PUCHUNCAVI"},
  {value: "PUTAENDO", label: "PUTAENDO"},
  {value: "QUILLOTA", label: "QUILLOTA"},
  {value: "QUILPUE", label: "QUILPUE"},
  {value: "QUINTERO", label: "QUINTERO"},
  {value: "RINCONADA", label: "RINCONADA"},
  {value: "SAN ANTONIO", label: "SAN ANTONIO"},
  {value: "SAN ESTEBAN", label: "SAN ESTEBAN"},
  {value: "SAN FELIPE", label: "SAN FELIPE"},
  {value: "SANTA MARIA", label: "SANTA MARIA"},
  {value: "SANTO DOMINGO", label: "SANTO DOMINGO"},
  {value: "VALPARAISO", label: "VALPARAISO"},
  {value: "VILLA ALEMANA", label: "VILLA ALEMANA"},
  {value: "VIÑA DEL MAR", label: "VIÑA DEL MAR"}

];
function getComunas(){

  var promise = new Promise((resolve,reject)=>{
    var qTaskkResumenChilquinta = new QueryTask(layers.read_comunas());
      var qResumenChilquinta = new esri.tasks.Query();
      qResumenChilquinta.where = "1=1";
      qResumenChilquinta.returnGeometry = false;
      qResumenChilquinta.outFields=["nm_comuna"];
      qResumenChilquinta.orderByFields=["nm_comuna"];
      qResumenChilquinta.returnDistinctValues = true;
      qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

          var comunas = featureSet.features.map(comuna=>{

            var ob = {
              value: comuna.attributes.nm_comuna,
              label: comuna.attributes.nm_comuna
            }
            return ob
          });

          return resolve(comunas);

      }, (Errorq)=>{
          console.log("Error doing query for comuna");
          return reject(false);
      });
  });

  return promise;

}

function calcularMeses(fechaInicial){
  //  console.log(moment(fechaInicial).format('L'));
  var d = new Date();
  //console.log(d);
  var now = new Date(moment(fechaInicial).format('L'));
  now.setMonth(now.getMonth());
  //console.log(now);
  var mesesAntes = [];
  var months = new Array("Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic");
  for (var i = 11; i >= 0; i--) {
      var past = new Date(now);

      past.setMonth(now.getMonth() - i);
      mesesAntes[i] = (months[past.getMonth()] + ' ' + past.getFullYear());
  }

  return mesesAntes.reverse();

}

function getConsumos1(whereOption, callback){

  var qTaskkResumenChilquinta;

  (whereOption=="1=1")? qTaskkResumenChilquinta = new QueryTask(layers.read_ap_consumoMes()) : qTaskkResumenChilquinta = new QueryTask(layers.read_apMes_Comuna());
    var qResumenChilquinta = new esri.tasks.Query();

    qResumenChilquinta.where = whereOption;
    qResumenChilquinta.returnGeometry = false;
    qResumenChilquinta.outFields=["*"];
    qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{
        return callback(featureSet.features);

    }, (Errorq)=>{
        console.log("Error doing query for regions quantity chilquinta");
        return callback(false);
    });
}

function getConsumos2(whereOption, callback){
  var qTaskkResumenChilquinta;
  (whereOption=="1=1")? qTaskkResumenChilquinta = new QueryTask(layers.read_ap_consumoAnual()) : qTaskkResumenChilquinta = new QueryTask(layers.read_apconsumoAnual_Comuna());

    var qResumenChilquinta = new esri.tasks.Query();
    qResumenChilquinta.where = whereOption;
    qResumenChilquinta.returnGeometry = false;
    qResumenChilquinta.outFields=["*"];

    qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

        return callback(featureSet.features);

    }, (Errorq)=>{
        console.log("Error doing query for chart 2 chilquinta");
        return callback(false);
    });
}

function getConsumos3(whereOption, callback){
  var qTaskkResumenChilquinta
  (whereOption=="1=1")? qTaskkResumenChilquinta = new QueryTask(layers.read_ap_medidos()) : qTaskkResumenChilquinta = new QueryTask(layers.read_ap_medidosComuna());


    var qResumenChilquinta = new esri.tasks.Query();
    qResumenChilquinta.where = whereOption;
    qResumenChilquinta.returnGeometry = false;
    qResumenChilquinta.outFields=["*"];
    qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

        return callback(featureSet.features);

    }, (Errorq)=>{
        console.log("Error doing query for regions quantity chilquinta");
        return callback(false);
    });
}

function getConsumos4(whereOption, callback){
  var qTaskkResumenChilquinta;
  (whereOption=="1=1")? qTaskkResumenChilquinta = new QueryTask(layers.read_ap_frecuenciaNoLeidos()) : qTaskkResumenChilquinta = new QueryTask(layers.read_ap_frecuenciaNoLeidosComuna());

  var qResumenChilquinta = new esri.tasks.Query();
    qResumenChilquinta.where = whereOption;
    qResumenChilquinta.returnGeometry = false;
    qResumenChilquinta.outFields=["*"];
    qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

        return callback(featureSet.features);

    }, (Errorq)=>{
        console.log("Error doing query for regions quantity chilquinta");
        return callback(false);
    });
}

function getConsumos5(whereOption, callback){

  var qTaskkResumenChilquinta;
  (whereOption=="1=1")? qTaskkResumenChilquinta = new QueryTask(layers.read_ap_estadisticasLum()) : qTaskkResumenChilquinta = new QueryTask(layers.read_apLuminarias_medidas_comuna());

    var qResumenChilquinta = new esri.tasks.Query();
    qResumenChilquinta.where = whereOption;
    qResumenChilquinta.returnGeometry = false;
    qResumenChilquinta.outFields=["*"];
    qTaskkResumenChilquinta.execute(qResumenChilquinta, (featureSet)=>{

       return callback(featureSet.features);

    }, (Errorq)=>{
        console.log("Error doing query for regions quantity chilquinta");
        return callback(false);
    });
}

function makeBarWithNegative(divName, chartNumber, queryOption){
  //OK
  if(chartNumber==1){
    getConsumos1(queryOption, (response) =>{
      console.log(response,"tengo en char 1");
      
      var categoriasFacturada =  response[0].attributes;
      var categoriasTeoricas = response[1].attributes;


      var m = calcularMeses(response[0].attributes.periodo_ini);
      console.log("caterogias gra 1:" , categoriasFacturada, categoriasTeoricas);

      var teo = [
      categoriasTeoricas.mes_11/1000000,
      categoriasTeoricas.mes_10/1000000,
      categoriasTeoricas.mes_9/1000000,
      categoriasTeoricas.mes_8/1000000,
      categoriasTeoricas.mes_7/1000000,
      categoriasTeoricas.mes_6/1000000,
      categoriasTeoricas.mes_5/1000000,
      categoriasTeoricas.mes_4/1000000,
      categoriasTeoricas.mes_3/1000000,
      categoriasTeoricas.mes_2/1000000,
      categoriasTeoricas.mes_1/1000000,
      categoriasTeoricas.mes_0/1000000];

      var fact = [

        categoriasFacturada.mes_11/1000000,
        categoriasFacturada.mes_10/1000000,
        categoriasFacturada.mes_9/1000000,
        categoriasFacturada.mes_8/1000000,
        categoriasFacturada.mes_7/1000000,
        categoriasFacturada.mes_6/1000000,
        categoriasFacturada.mes_5/1000000,
        categoriasFacturada.mes_4/1000000,
        categoriasFacturada.mes_3/1000000,
        categoriasFacturada.mes_2/1000000,
        categoriasFacturada.mes_1/1000000,
        categoriasFacturada.mes_0/1000000];


      var dif = [
        fact[0]-teo[0],
        fact[1]-teo[1],
        fact[2]-teo[2],
        fact[3]-teo[3],
        fact[4]-teo[4],
        fact[5]-teo[5],
        fact[6]-teo[6],
        fact[7]-teo[7],
        fact[8]-teo[8],
        fact[9]-teo[9],
        fact[10]-teo[10],
        fact[11]-teo[11]

      ];

      //console.log(categoriasFacturada, categoriasTeoricas);

      Highcharts.chart(divName, {
          chart: {
              type: 'column'
          },
          plotOptions: {
              column: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,

                      format: '<b><br> <b>{point.y:.2f}</b>',
                       style: {
                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'

                       }
                  },
                  showInLegend: true
              }
          },
          title: {
              text: 'Energía GWh Teórica v/s Facturada'
          },
          xAxis: {
              categories: m,
              title: {
                text: "Meses"

              }

          },
          tooltip: {
            valueDecimals: 4
          },

          yAxis: {
             title: {
               text: "GWh"
             }
          },
          credits: {
              enabled: false
          },
          series: [{
              name: 'TEÓRICO',
              data: teo
          }, {
              name: 'FACTURADO',
              data: fact

          }, {
              name: 'DIFERENCIA',
              data: dif
          }],
          colors: ['#5a5356', '#da291c', '#ff8200']
      });

    });
  }
  //FALTA ARREGLAR CAMPO TOTAL POR KWh
  if(chartNumber==2){
    getConsumos2(queryOption, response=>{
    console.log(response,"tengo en char 2")

      Highcharts.chart(divName, {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Energía GWh Anual'
          },
          xAxis: {
              categories: ['']
          },
          yAxis: {
             title: {
               text: "GWh"
             }
          },
          credits: {
              enabled: false
          },
          series: [
            {
              name: 'TEORICO',
              data: [response[2].attributes.KWh/1000000]
            },
            {
              name: 'FACTURADO',
              data:[response[1].attributes.KWh/1000000]

            },
            {
              name: 'DIFERENCIA',
              data: [response[0].attributes.KWh/1000000]
            }
          ],
          tooltip: {
            valueDecimals: 2
          },

          colors: ['#5a5356', '#da291c', '#ff8200'],
          plotOptions: {
              column: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                       format: '<b><br> <b>{point.y:.2f}</b>',
                       style: {
                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                       }
                  },
                  showInLegend: true
              }
          }
      });

    });
  }

  if(chartNumber==5){
    getConsumos5(queryOption, response=>{

      var datos = response.map(data =>{
        let labelMed;
        (data.attributes.medido=='True')? labelMed='MEDIDAS' : labelMed='NO MEDIDAS';
        let d = {
          name: labelMed,
          data: [data.attributes.cantidad]
        }
        return d;
      });


        var total = response.map(c => c.attributes.cantidad);
        total = total.reduce((t,n) =>{return t+n});

        datos.push({name:'TOTAL', data:[total]});



      Highcharts.chart(divName, {
          chart: {
              type: 'column'
          },
          title: {
              text: 'Luminarias Medidas/No Medidas'
          },
          xAxis: {
              categories: ['LUMINARIAS']
          },
          yAxis: {
             title: {
               text: "Cantidad"
             }
          },
          credits: {
              enabled: false
          },
          series: datos
          /*[{
              name: 'MEDIDAS',
              data: [response[0].attributes.cantidad]
          }, {
              name: 'NO MEDIDAS',
              data:[response[1].attributes.cantidad]

          }, {
              name: 'TOTAL',
              data: [response[0].attributes.cantidad+response[1].attributes.cantidad]
          }]
          */
          ,
          colors: ['#5a5356', '#da291c', '#ff8200'],
          plotOptions: {
              column: {
                  allowPointSelect: true,
                  cursor: 'pointer',
                  dataLabels: {
                      enabled: true,
                       format: '<b><br> <b>{point.y}</b>',
                       style: {
                         color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                       }
                  },
                  showInLegend: true
              }
          },
          tooltip: {
            valueDecimals: 2
          }

      });

    });

  }

}

function makePieChart(divName, pieNumber, queryOption){

  if(pieNumber==3){
    getConsumos3(queryOption, medidos =>{
      console.log(medidos.length,"tengo medidos en 3");
      if ((!medidos.length) || (typeof medidos.length == 'undefined')){
        console.log("hola")
      }else{
        console.log("adios", medidos)
        var total = medidos.map(c => c.attributes.CANTIDAD);
        total = total.reduce((t,n) =>{return t+n});
        console.log(total);

        var datos = medidos.map(m =>{
          let d = {
            name: m.attributes.ESTADO,
            y: m.attributes.CANTIDAD
          }
          return d;
        });

        // Build the chart
          Highcharts.chart(divName, {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              credits: {
                  enabled: false
              },
              title: {
                  text: 'Productos AP Medidos <br>' + total
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}% <br> Cantidad: <b>{point.y}</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                           format: '<b><br> <b>{point.y}</b>',
                           style: {
                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                           }
                      },
                      showInLegend: true
                  }
              },
              series: [{
                  name: 'Brands',
                  colorByPoint: true,
                  data:datos
              }],
              colors: ['#5a5356', '#da291c', '#ff8200']

          });

      }
    });
  }

  if(pieNumber==4){
    getConsumos4(queryOption, medidos =>{

      if(!medidos.length){

        Highcharts.chart(divName, {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Frecuencia AP No Leídos 12 Meses  <br>' + 0
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}% <br> Cantidad: <b>{point.y}</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                         format: '<b><br> <b>{point.y}</b>',
                         style: {
                           color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                         }
                    },
                    showInLegend: true
                }
            },

            credits: {
                enabled: false
            },
            series: [{
                name: 'Brands',
                colorByPoint: true,
                data: [
                  {
                    name: '1-3',
                    y: 0
                  },
                  {
                    name:'4-6',
                    y: 0
                  },
                  {
                    name:'7-9',
                    y: 0
                  },
                  {
                    name:'10-12',
                    y: 0
                  }
              ]

            }],
              colors: ['#5a5356', '#da291c', '#ff8200', '#00953a']
        });
        return;
      }else{
        // Build the chart
        var total = medidos.map(c => c.attributes.cantidad);
        total = total.reduce((t,n) =>{return t+n});
        //console.log(total);

        var datos = medidos.map(m =>{
          let d = {
            name: m.attributes.Rango,
            y: m.attributes.cantidad
          }
          return d;
        });

        //let total =  medidos[0].attributes.cantidad +  medidos[1].attributes.cantidad +  medidos[2].attributes.cantidad+  medidos[3].attributes.cantidad;
          Highcharts.chart(divName, {
              chart: {
                  plotBackgroundColor: null,
                  plotBorderWidth: null,
                  plotShadow: false,
                  type: 'pie'
              },
              title: {
                  text: 'Frecuencia AP No Leídos 12 Meses  <br>' + total.toString()
              },
              tooltip: {
                  pointFormat: '{series.name}: <b>{point.percentage:.1f}% <br> Cantidad: <b>{point.y}</b>'
              },
              plotOptions: {
                  pie: {
                      allowPointSelect: true,
                      cursor: 'pointer',
                      dataLabels: {
                          enabled: true,
                           format: '<b><br> <b>{point.y}</b>',
                           style: {
                             color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                           }
                      },
                      showInLegend: true
                  }
              },

              credits: {
                  enabled: false
              },
              series: [{
                  name: 'Brands',
                  colorByPoint: true,
                  data: datos
                    /*
                    {
                      name: (medidos[0].attributes.Rango)? medidos[0].attributes.Rango : '',
                      y:  (medidos[0].attributes.cantidad) ? medidos[0].attributes.cantidad : ''
                    },
                    {
                      name: (medidos[1].attributes.Rango)? medidos[1].attributes.Rango : '',
                      y: (medidos[1].attributes.cantidad) ? medidos[1].attributes.cantidad : ''
                    },
                    {
                      name: (medidos[2].attributes.Rango)? medidos[2].attributes.Rango : '',
                      y: (medidos[2].attributes.cantidad) ? medidos[2].attributes.cantidad : '',

                    },
                    {
                      name: (medidos[3].attributes.Rango)? medidos[3].attributes.Rango : '',
                      y:(medidos[3].attributes.cantidad) ? medidos[3].attributes.cantidad : ''

                    }
                  ]
                  */
              }],
                colors: ['#5a5356', '#da291c', '#ff8200', '#00953a']
          });


      }
    });
  }

}

export default comunas;
export {makeBarWithNegative, makePieChart, getComunas}
