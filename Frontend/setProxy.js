const fs = require('fs');
const os = require('os');

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1';
}

const localIp = getLocalIpAddress();
const proxy = `http://${localIp}:3001`;
process.env.REACT_APP_PROXY = proxy;


fs.writeFileSync('.env.local', `REACT_APP_PROXY=${proxy}\n`);

console.log(`Set proxy to ${proxy}`);
