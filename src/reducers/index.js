import { combineReducers } from 'redux';
import serversReducer from './servers-reducer';
import configReducer from './config-reducer';
import portsReducer from './port-checks';

export default combineReducers({
    servers: serversReducer,
    config: configReducer,
    ports: portsReducer,
});