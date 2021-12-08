import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';
import Theme from 'resources/theme';
import Routes from 'routes';
import './index.css';
import $ from 'jquery';
import Popper from 'popper.js';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
   
ReactDOM.render(
    <ThemeProvider theme={Theme}>
        <Router>
            <Routes />
        </Router>
    </ThemeProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
