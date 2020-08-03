const spawn = require('child_process').spawn;

const tcpMockToFind = [
    {
        name: 'one',
        matches: [':135', 'ESTABLISHED'],
    },
    {
        name: 'two',
        matches: [':10243', 'LISTENING'],
    },
    {
        name: 'three',
        matches: [':some shit', 'LISTENING'],
    },
];

const udpMockToFind = [
    {
        name: 'odin',
        matches: [':3702'],
    },
    {
        name: 'dva',
        matches: [':52835'],
    },
    {
        name: 'tree',
        matches: [':some shit'],
    },
];

const executeCommandOnRemote = (ip, command, ...commandArguments) => new Promise((resolve, reject) => {
    let output = '';
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

const main = async (ip, {tcpPortsToCheck = [], udpPortsToCheck = []}) => {
    const [tcpResult, udpResult] = await Promise.all([
        executeNetstat(tcpPortsToCheck, ip, 'tcp'),
        executeNetstat(udpPortsToCheck, ip, 'udp'),
    ]);
    console.log(tcpResult);
    console.log(udpResult);
};

main('192.168.56.101', {tcpPortsToCheck: tcpMockToFind, udpPortsToCheck: udpMockToFind});