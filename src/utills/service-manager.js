import { executeService } from './windows-services';
import { updateServerStatus } from './service-status';
import { logger } from './logger';
import { nconf } from '../utills/electron-node';

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const sendStartService = async (server, serviceName, versionName) => {
    logger.info(`start server: '${server.ip}', service: '${serviceName}'`);
    await executeService('start', serviceName, server.ip);
    logger.info(`start command sent for server: '${server.ip}', service: '${serviceName}'`);
    await updateServerStatus(versionName, server, serviceName);
};

export const sendStopService = async (server, serviceName, versionName) => {
    logger.info(`stop server: '${server.ip}', service: '${serviceName}'`);
    await executeService('stop', serviceName, server.ip);
    logger.info(`stop command sent for server: '${server.ip}', service: '${serviceName}'`);
    await updateServerStatus(versionName, server, serviceName);
};

export const sendRestartService = async (server, serviceName, versionName) => {
    const timeToWait = nconf.get('timeToWaitBetweenStopAndStart');
    logger.info(`restart server: '${server.ip}', service: '${serviceName}'`);
    await executeService('stop', serviceName, server.ip);
    logger.info(`stop command sent as part of restart process for server: '${server.ip}', service: '${serviceName}'`);
    await updateServerStatus(versionName, server, serviceName);
    logger.info(`waiting '${timeToWait}'ms before sending start command s part of restart process for server: '${server.ip}', service: '${serviceName}'`);
    await wait(timeToWait);
    logger.info(`sending start command s part of restart process for server: '${server.ip}', service: '${serviceName}'`);
    await executeService('start', serviceName, server.ip);
    logger.info(`start command sent as part of restart process for server: '${server.ip}', service: '${serviceName}'`);
};