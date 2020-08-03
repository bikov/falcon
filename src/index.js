import React from 'react';
import ReactDOM from 'react-dom';
import { isConfigExist, isPathInEnv } from './utills/load-config';
import './index.css';
import App from './app';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import configureStore from './store';
import 'semantic-ui-css/semantic.min.css';

console.log({isPathInEnv: isPathInEnv(), isConfigExist: isConfigExist()});

ReactDOM.render(
    <Provider store={configureStore()}>
        <App/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
