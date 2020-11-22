import { fs } from './electron-node';
import { logger } from "./logger";
const isFileExist = async (path) => {
  try {
      await fs.promises.access(path, fs.constants.R_OK);
      return true;
  } catch (e) {
      logger.warn(`check for file exist - cannot access to file: '${path}' because: `, e);
      return false;
  }
};

const createResultMap = (toFind) => new Map(toFind.map(({ name, line }) => [name, { line, isFound: false}]));

const markFoundLines = (linesToFind, textLinesToSearch) => {
    const result = new Map(linesToFind.entries());
    result.forEach(({ isFound, line }, name) => {
        if (!isFound) {
            result.set(name, { line, isFound: textLinesToSearch.some(textLine => textLine.includes(line))});
        }
    });
    return result;
};

const findLastIndexOf = (array, predicate) => {
    let l = array.length;
    while (l--) {
        if (predicate(array[l], l, array)) {
            return l;
        }
    }
    return -1;
};

// after log file size is more then some configurable value logger creating new file and the old one is ${logfileName}.${count}
// so we want to check them all

const getTextSinceStart = async (filePath, startText) => {
    if (!await isFileExist(filePath)) {
        throw new Error(`unable to find path to check logs in path: '${filePath}'`);
    }
    let currentFileNumber = 0;
    let resultLines = [];
    let currentFilePath = filePath;
    let isNextFileExist;
    do {
        let currentFileText = (await fs.promises.readFile(currentFilePath, 'UCS-2')).toString();
        let currentFileLines = currentFileText.split('\n');
        const startLineIndex = findLastIndexOf(currentFileLines, line => line.includes(startText));
        if (startLineIndex !== -1) {
            logger.info(`found start line in file path: '${currentFilePath}' at line: ${startLineIndex}`);
            resultLines = resultLines.concat(currentFileLines.slice(startLineIndex + 1));
            break;
        } else {
            resultLines = resultLines.concat(currentFileLines);
            logger.info(`didn't find start line in file: ${currentFilePath}, continue to next file`);
        }
        currentFilePath = `${filePath}. ${++currentFileNumber}`;
        isNextFileExist = await isFileExist(currentFilePath);
    } while (isNextFileExist);
    return  resultLines;
};

const getStringFromMap = (map) => Array
    .from(map.entries(), ([k, v]) => `\n    ${k}: ${JSON.stringify(v)}`)
    .join('') + '\n';

export const checkLinesInLog = async (linesToFind, filePath, startText) => {
    logger.info(`searching for ${linesToFind.length} lines in files: '${filePath}' from start line: '${startText}'`);
    let linesToFindMap = createResultMap(linesToFind);
    const textLinesToSearch = await getTextSinceStart(filePath, startText);
    const result = markFoundLines(linesToFindMap, textLinesToSearch);
    logger.info(`logs check came up with result: ${getStringFromMap(result)}`);
    return result;
};