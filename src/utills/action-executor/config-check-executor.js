import { changeConfig } from '../config-changer';

export const executeConfigChange = async (givenArguments) => {
    await changeConfig(givenArguments);
    return {success: true};
};