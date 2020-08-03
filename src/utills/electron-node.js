const electron = window.require('electron');


export const nconf = electron.remote.require('nconf');
export const path = electron.remote.require('path');
export const fs = electron.remote.require('fs');
export const promisesFS = fs.promises;