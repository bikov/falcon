// import * as nconf from 'nconf';

const electron = window.require('electron');
const {transports, createLogger, format} = electron.remote.require('winston');
// const DailyRotateFile = electron.remote.require('winston-daily-rotate-file');

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple(),
    ),
    transports: [
        new transports.Console(),
        // new DailyRotateFile({
        //     filename: nconf.get('logFile'),
        //     datePattern: 'YYYY-MM-DD-HH',
        //     zippedArchive: true,
        //     maxSize: '20m',
        //     maxFiles: '14d',
        //     timestamp: true,
        // }),
    ],
});