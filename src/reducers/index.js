import { combineReducers } from 'redux';
import serversReducer from './servers-reducer';

export default combineReducers({
    servers: serversReducer,
});