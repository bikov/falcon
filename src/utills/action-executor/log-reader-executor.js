import { checkLinesInLog } from '../log-reader';

export const executeLogChecking = async ({linesToFind, filePath, startText}) => {
    const result = await checkLinesInLog(linesToFind, filePath, startText);
    const failed = Array.from(result.entries()).reduce((accumulator, [name, {isFound}]) => {
        if (!isFound) {
            accumulator.push(name);
        }
        return accumulator;
    }, []);
    return {
        success: !failed.length,
        error: failed.length && `Some logs are missing!!! missing logs are: ${JSON.stringify(failed)}`
    };
};