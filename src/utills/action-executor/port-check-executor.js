import { checkPorts } from '../port-checker';

export const executePortCheck = async ({ip, tcpPorts, udpPorts}) => {
    const result = await checkPorts({ip, tcpPortsToCheck: tcpPorts, udpPortsToCheck: udpPorts});
    const failed = [...result.tcpResult, ...result.udpResult].filter((result) => !result.isExist);
    return {
        success: !failed.length,
        error: failed.length && `Some ports are missing!!! missing ports are: ${JSON.stringify(failed.map(failed => failed.name))}`,
    };
};