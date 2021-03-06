const electron = window.require('electron');

export const nconf = electron.remote.require('nconf');
export const path = electron.remote.require('path');
export const fs = electron.remote.require('fs');
export const spawn = electron.remote.require('child_process').spawn;
export const winston = electron.remote.require('winston');
export const DailyRotateFile = electron.remote.require('winston-daily-rotate-file');
export const promisesFS = fs.promises;
