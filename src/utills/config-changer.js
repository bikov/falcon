import { promisesFS } from './electron-node.js';
import { logger } from './logger';

const sleep = async (time) => new Promise((resolve => setTimeout(resolve, time)));

const changeLine = async (filePath, searchValue, replace) => {
    try {
        const originalFileContent = await promisesFS.readFile(filePath, 'utf-8');
        const replacedText = originalFileContent.replace(searchValue, replace);
        await promisesFS.writeFile(filePath, replacedText, 'utf-8');
    } catch (e) {
        logger.error(`unable to change line: '${searchValue}' in file: '${filePath}' to line: '${replace}' because:`, e);
        console.error(`unable to change line: '${searchValue}' in file: '${filePath}' to line: '${replace}' because:`, e);
        throw e;
    }
};

export const changeConfig = async ({filePath, lineToChange, newLine, returnBack, secondToWaitBeforeReturnBack}) => {
    console.log('changing config');
    await changeLine(filePath, lineToChange, newLine);
    console.log('config changed');
    if (returnBack) {
        console.log('waiting to change back');
        await sleep(secondToWaitBeforeReturnBack * 1000);
        console.log('changing back');
        await changeLine(filePath, newLine, lineToChange);
        console.log('changed back');
    }
};