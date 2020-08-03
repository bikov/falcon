import { nconf } from '../utills/electron-node';
import { GOT_PORTS_STATUS, LOADING_PORT_STATUSES } from '../actions/port-actions';

const initialState = {
    portChecks: nconf.get('portChecks'),
};

const setLoadingToIp = (state, {ip}) => {
    return {
        ...state,
        portChecks: state.portChecks.map(portsConfig => portsConfig.ip === ip ? {
            ...portsConfig,
            loading: true,
        } : portsConfig),
    };
};

const setUpdatedStatus = (state, {portChecks}) => {
    return {
        ...state,
        portChecks: state.portChecks.map(portsConfig => portsConfig.ip === portChecks.ip ? portChecks : portsConfig),
    };
};

const reducers = {
    [LOADING_PORT_STATUSES]: setLoadingToIp,
    [GOT_PORTS_STATUS]: setUpdatedStatus,
};

export default (state = initialState, action) => {
    return reducers[action.type]
           ? reducers[action.type](state, action.payload)
           : state;
};