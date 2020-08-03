import { nconf } from '../utills/electron-node';

const initialState = {
    configChangesSettings: nconf.get('configChange'),
    versionManipulationSettings: nconf.get('versionManipulations')
};

const reducers = {};

export default (state = initialState, action) => {
    return reducers[action.type]
           ? reducers[action.type](state, action.payload)
           : state;
};