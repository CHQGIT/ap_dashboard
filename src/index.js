import React from 'react';
import ReactDOM from 'react-dom';
//import App from './component/App';
import { AppContainer } from 'react-hot-loader';
//import { overrideComponentTypeChecker } from 'react-toolbox';

import Main from './components/Main';
//import theme from './css/toolbox/theme';
//import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

const rootEl = document.getElementById('app');



ReactDOM.render(<Main />, document.getElementById('app'));
