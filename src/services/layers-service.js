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
  //  const serviceMain = 'http://143.47.57.116/arcgis/';
  //change this for external connection:
  //Cambios v0.6.1 prod factigisVE 31.03.2017
  //const serviceMain = 'http://gisred.chilquinta.cl:5555/arcgis/';
  const serviceURL = serviceMain + 'rest/services/';
  //var graphicLayer = new GraphicsLayer;

  //check 8 and last one
  return {
    //ok
    read_tokenURL(){
      return serviceMain + "tokens/generateToken";
    },
    //usado
    read_ap_consumoMes(){
     return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/6?f=json&token=" + token.read();

    },
    //usado
    read_ap_medidos(){
    return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/8?f=json&token=" + token.read();

    },
    //usado
    read_ap_frecuenciaNoLeidos(){
        return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/10?f=json&token=" + token.read();

    },
    //usado
    read_ap_estadisticasLum(){
        return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/12?f=json&token=" + token.read();
    },
    //usado
    read_ap_consumoAnual(){
      return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/14?f=json&token=" + token.read();

    },
    // <---------------------- AP POR COMUNA ------------------------------> //
    read_apMes_Comuna(){ //usado
        return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/7?f=json&token=" + token.read();
    },
    read_apconsumoAnual_Comuna(){ //usado
        return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/15?f=json&token=" + token.read();
    },
    read_apLuminarias_medidas_comuna(){ //usado
       return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/13?f=json&token=" + token.read();
    },
    read_ap_medidosComuna(){ //usado
       return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/9?f=json&token=" + token.read();
    },
    read_ap_frecuenciaNoLeidosComuna(){ //usado
      return serviceURL + "GESTION_AP/GESTION_AP_COMUNA/MapServer/11?f=json&token=" + token.read();
    }

  };
}


export default myLayers();
