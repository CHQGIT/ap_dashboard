import token from './token-service';

function getMapLayers() {
  var map = mymap.getMap();
    for (var j = 0, jl = map.layerIds.length; j < jl; j++) {
        var currentLayer = map.getLayer(map.layerIds[j]);
        console.log("id: " + currentLayer.id + ", visible: " + currentLayer.visible + ", opacity: " + currentLayer.opacity);
    }
}

function myLayers(){
  const serviceMain = 'http://gisred.chilquinta/arcgis/';
  //change this for external connection:
  //Cambios v0.6.1 prod factigisVE 31.03.2017
  //const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  //var graphicLayer = new GraphicsLayer;

  //check 8 and last one
  return {

    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },

    read_ap_dif(){
      return serviceURL + "GESTION_AP/AP_ANALISIS/FeatureServer/4?f=json&token=" + token.read();

    },
    read_ap_consumoMes(){
     return serviceURL + "GESTION_AP/AP_ANALISIS/MapServer/6?f=json&token=" + token.read();
   },
    read_ap_medidos(){
    return serviceURL + "GESTION_AP/AP_ANALISIS/MapServer/7?f=json&token=" + token.read();

  },
    read_ap_catastratosCount(){
      return serviceURL + "GESTION_AP/AP_ANALISIS/FeatureServer/7?f=json&token=" + token.read();

    },
    //4
    read_ap_frecuenciaNoLeidos(){
        return serviceURL + "GESTION_AP/AP_ANALISIS/MapServer/8?f=json&token=" + token.read();

    },
    //9 luminarias
    read_ap_estadisticasLum(){
        return serviceURL + "GESTION_AP/AP_ANALISIS/MapServer/9?f=json&token=" + token.read();
    },

    read_ap_consumoAnual(){
      return serviceURL + "GESTION_AP/AP_ANALISIS/MapServer/10?f=json&token=" + token.read();

    },
    read_comunas(){
        return serviceURL + "MapaBase/MapServer/4?f=json&token=" + token.read();
    }


  };
}


export default myLayers();
