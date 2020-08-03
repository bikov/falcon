import * as portChecker from '../utills/port-checker';

export const LOADING_PORT_STATUSES = 'LOADING_PORT_STATUSES';
export const GOT_PORTS_STATUS = 'GOT_PORTS_STATUS';

export const checkPorts = (portChecksConfig) => async dispatch => {
    dispatch({
        type: LOADING_PORT_STATUSES,
        payload: {ip: portChecksConfig.ip},
    });
    const result = await portChecker.checkPorts(portChecksConfig);
    dispatch({
        type: GOT_PORTS_STATUS,
        payload: {
            portChecks: {
                ip: portChecksConfig.ip,
                tcpPortsToCheck: result.tcpResult,
                udpPortsToCheck: result.udpResult,
            },
        },
    });
};
