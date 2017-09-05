
import React from 'react';
import {makeBarWithNegative, makePieChart} from '../services/charts';
import {factigisLoginVentaWeb} from '../services/parameters';

class Main extends React.Component {
  constructor(props) {
    super(props);

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
