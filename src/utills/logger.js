const {DailyRotateFile, winston, nconf} = require('./electron-node');
const {format, transports, createLogger} = winston;

export const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.simple(),
    ),
    transports: [
        new transports.Console(),
        new DailyRotateFile({
            filename: nconf.get('logFile'),
            datePattern: 'YYYY-MM-DD-HH',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            timestamp: true,
        }),
    ],
});