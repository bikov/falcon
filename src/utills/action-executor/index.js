import { manipulateService } from './service-manipulation-executor';
import { logger } from '../logger';
import { executePortCheck } from './port-check-executor';
import { executeConfigChange } from './config-check-executor';
import { executeLogChecking } from './log-reader-executor';

const actionMap = {
    'manipulate-service': manipulateService,
    'check-ports': executePortCheck,
    'change-config': executeConfigChange,
    'check-logs': executeLogChecking
};

export const executeCommand = async (command) => {
    logger.info(`executing command: '${command?.action}'\t full args: ${JSON.stringify(command)}`);
    try {
        const result = await actionMap[command.action](command.args);
        logger.info(`command: '${command?.action}' executed, isSuccess: ${result}`);
        return result;
    } catch (e) {
        logger.error(`command: '${command?.action}' failed!`, e);
        return {success: false, error: e};
    }
};