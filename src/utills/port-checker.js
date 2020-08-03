import { spawn } from './electron-node';

const executeCommandOnRemote = (ip, command, ...commandArguments) => new Promise((resolve, reject) => {
    let output = '';
    // TODO: remove username and password
    const spawned = spawn('psexec', [`\\\\${ip}`, '-u', 'omri', '-p', 'z', command, ...commandArguments]);
    spawned.on('error', (err) => reject(err));

    spawned.stdout.on('data', chunk => output += chunk);

    spawned.stderr.on('data', err => {
        output += err;
    });

    spawned.on('exit', () => resolve(output));
});

const executeNetstat = async (toFind, ip, protocol) => {
    const netstatRawResult = await executeCommandOnRemote(ip, 'netstat', '-apn', protocol);
    const arrResultLines = netstatRawResult.split('\n');
    const result = [];
    toFind.forEach(searchObj => {
        const regex = new RegExp(`^.*${searchObj.matches.join('.*')}.*`);
        result.push({...searchObj, isExist: arrResultLines.some(line => line.match(regex))});
    });
    return result;
};

export const checkPorts = async ({ip, tcpPortsToCheck = [], udpPortsToCheck = []}) => {
    const [tcpResult, udpResult] = await Promise.all([
        executeNetstat(tcpPortsToCheck, ip, 'tcp'),
        executeNetstat(udpPortsToCheck, ip, 'udp'),
    ]);
    return {tcpResult, udpResult};
};