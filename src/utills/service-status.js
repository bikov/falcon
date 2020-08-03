import { logger } from './logger';
import { dispatchAction } from '../store';
import { gotServerStatus, statusUpdatedAction, statusUpdatingAction } from '../actions/api-actions';
import { executeService } from './windows-services';

import { nconf } from './electron-node';

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

export const getServiceStatus = async (server, serviceName)=>{
    const rawResult = await executeService('query', serviceName, server.ip);
    return  rawResult.split(/\r\n|\r|\n/).find(str => str.includes('STATE')).split(' ').splice(-2)[0]
}

const getServiceWithStatus = async (server, serviceName) => {
    try {
        const status = {
            service: await getServiceStatus(server,serviceName)
        };
        return {...server, state: status};
    } catch (e) {
        logger.error(e);
        return {...server, state: {service: 'unknown'}};
    }
};

export const getVersionStatuses = async () => {
    dispatchAction(statusUpdatingAction());
    await asyncForEach(nconf.get('versions'), version => {
        version.servers.forEach(async server => await updateServerStatus(version.versionName, server, version.serviceName));
    });
    dispatchAction(statusUpdatedAction());
};

export const updateServerStatus = async (versionName, server, serviceName) => {
    dispatchAction(gotServerStatus(versionName, await getServiceWithStatus(server, serviceName)));
};
