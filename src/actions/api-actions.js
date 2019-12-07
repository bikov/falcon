export const GOT_VERSIONS = 'GOT_VERSIONS';
export const GOT_SERVER_STATUS = 'GOT_SERVER_STATUS';
export const STATUS_UPDATED = 'STATUS_UPDATED';
export const STATUS_UPDATING = 'STATUS_UPDATING';

export const gotVersions = versions => ({
    type: GOT_VERSIONS,
    payload: versions,
});

export const gotServerStatus = (version, {ip, state}) => ({
    type: GOT_SERVER_STATUS,
    payload: {version, serverIp: ip, status: state},
});

export const statusUpdatedAction = () => ({type: STATUS_UPDATED});
export const statusUpdatingAction = () => ({type: STATUS_UPDATING});