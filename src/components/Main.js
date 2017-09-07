
import React from 'react';
import {makeBarWithNegative, makePieChart} from '../services/charts';
import comunas from  '../services/charts';
import {factigisLoginVentaWeb} from '../services/parameters';
import Select from 'react-select';
import '!style-loader!css-loader!sass-loader!react-select/dist/react-select.css';



class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opcion: 'TOTAL',
      options: comunas
    }
  }

  logChange(val) {

    this.setState({opcion: val});
      if(val == null){
        return;
      }
      if(val.value=="TOTAL"){
        console.log(val.value,"cargar...");
        factigisLoginVentaWeb('vialactea\\ehernanr',"Chilquinta1",(cb)=>{

          makeBarWithNegative("container", 1);
          makeBarWithNegative("container2",2);

          makePieChart("container3",3);
          makePieChart("container4",4);

          makeBarWithNegative("container5",5);

        });
      }else{
          console.log(val.value,"cargar...");
      }
  }

  componentDidMount(){

      factigisLoginVentaWeb('vialactea\\ehernanr',"Chilquinta1",(cb)=>{

        makeBarWithNegative("container", 1);
        makeBarWithNegative("container2",2);

        makePieChart("container3",3);
        makePieChart("container4",4);

        makeBarWithNegative("container5",5);

      });

  }

  render(){
    return (
      <div className="wrapper_app">
        <div className="wrapper_title">
          <div className="wrapper_selector">
            <h6 className="selector_h6">Seleccione una opción a graficar</h6>
            <Select className="opciones" placeholder="Total o por comuna" name="form-field-name" value={this.state.opcion} options={this.state.options} onChange={this.logChange.bind(this)} />
          </div>

          <img className="imggis" src="src/css/apdashboard.png"></img>
        </div>
          <div className="wrapper_top">
            <div id="container" className="graphicTop graph1"></div>
            <div id="container2" className="graphicTop graph2"></div>
          </div>

            <div className="wrapper_bot">
              <div className="graphicBot">
                <div id="container3" className="grapie"></div>
                <div id="container4" className="grapie"></div>
              </div>
              <div className="graphicBot">
                <div id="container5" className="graBar"></div>
              </div>

            </div>


        </div>
    );
  }
}

export default Main;
