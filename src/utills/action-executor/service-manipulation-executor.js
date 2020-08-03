import { sendRestartService, sendStartService, sendStopService } from '../service-manager';
import { getServiceStatus } from '../service-status';

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

const actionsMap = {
    'start': {
        command: sendStartService,
        expectedStatusAfter: 'RUNNING'
    },
    'stop': {
        command: sendStopService,
        expectedStatusAfter: 'STOPPED'
    },
    'restart': {
        command: sendRestartService,
        expectedStatusAfter: 'RUNNING'
    },
};

export const manipulateService = async ({action, serviceName, ip, waitToCheck, versionName, location}) => {
    const actionData = actionsMap[action];
    if(!actionData){
        throw new Error(`service-manipulation-executor: unable to find command for action: '${action}'`)
    }
    await actionData.command({ip, location}, serviceName, versionName);
    await wait(waitToCheck);
    return {success: await getServiceStatus({ip},serviceName) === actionData.expectedStatusAfter};
};