import { GOT_SERVER_STATUS, STATUS_UPDATED, STATUS_UPDATING } from '../actions/api-actions';
import { nconf } from '../utills/electron-node';

const initialState = {
    versions: nconf.get('versions'),
};

const gotServerStatus = (state, {serverIp, status, version}) => {
    const newServersForActions = state.versions?.map(serverForAction => serverForAction.versionName === version ? {
        ...serverForAction,
        servers: serverForAction.servers.map(server => server.ip === serverIp ? {
            ...server,
            status: status,
        } : server),
    } : serverForAction);
    return {
        ...state,
        versions: newServersForActions,
    };
};

const statusUpdating = (state) => {
    const newServersForActions = state.versions?.map(serverForAction => ({
        ...serverForAction,
        servers: serverForAction.servers.map(server => ({
            ...server,
            status: undefined,
        })),
    }));
    return {
        ...state,
        versions: newServersForActions,
        updatingNow: true,
    };
};

const statusUpdated = (state) => {
    return {...state, updatingNow: false, lastUpdated: Date.now()};
};

const reducers = {
    [GOT_SERVER_STATUS]: gotServerStatus,
    [STATUS_UPDATING]: statusUpdating,
    [STATUS_UPDATED]: statusUpdated,
};

export default (state = initialState, action) => {
    return reducers[action.type]
           ? reducers[action.type](state, action.payload)
           : state;
};