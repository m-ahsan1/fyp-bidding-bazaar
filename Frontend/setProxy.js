const fs = require('fs');
const os = require('os');

function getWifiIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    // Check if the interface name is exactly 'Wi-Fi' (case-sensitive)
    if (name === 'Wi-Fi') {
      for (const iface of interfaces[name]) {
        if (iface.family === 'IPv4' && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return '127.0.0.1'; // Default address if 'Wi-Fi' interface is not found
}

const localIp = getWifiIpAddress();
const nodeProxy = `http://${localIp}:3001`;
process.env.REACT_APP_NODE_PROXY = nodeProxy;
const pythonProxy = `http://${localIp}:5000`;
process.env.REACT_APP_PYTHON_PROXY = pythonProxy;

// Write proxies to .env.local
fs.writeFileSync('.env.local', `REACT_APP_NODE_PROXY=${nodeProxy}\n`);
fs.appendFileSync('.env.local', `REACT_APP_PYTHON_PROXY=${pythonProxy}\n`);

console.log(`Set proxy to ${nodeProxy}`);
console.log(`Set proxy to ${pythonProxy}`);
