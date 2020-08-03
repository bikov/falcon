import { nconf, fs, path } from './electron-node';
const pathInENV = process.env.FALCON_CONFIG_PATH;

const pathToConfig = pathInENV || 'C:\\RomachFalcon\\config.json';
let configExist = false;
try {
    if (fs.existsSync(path.resolve(pathToConfig))) {
        nconf.file({file: path.resolve(pathToConfig)});
        configExist = true;
    }
} catch(e) {
    console.error(e);
}

export const isConfigExist = ()=>configExist;
export const isPathInEnv = ()=>pathInENV;
