import {logger} from './logger';

const electron = window.require('electron');
const {exec} = electron.remote.require('child_process');

export const executeService = (command, serviceName, ip) => {
    return new Promise((resolve, reject) => {
        const executedCommand = `sc \\\\${ip} ${command} "${serviceName}"`;
        exec(executedCommand, (err, stdout, stderr) => {
            if (err) {
                logger.error(`error on command: '${executedCommand}'`);
                logger.error(err);
                reject(err);
            }
            if (stdout) {
                logger.info(`command '${executedCommand}' stdout: ${stdout}`);
            }
            if (stderr) {
                logger.info(`command '${executedCommand}' stderr: ${stderr}`);
            }
            resolve(stdout);
        });
    });
};
