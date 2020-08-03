import { combineReducers } from 'redux';
import serversReducer from './servers-reducer';
import configReducer from './config-reducer.js';

export default combineReducers({
    servers: serversReducer,
    config: configReducer
});