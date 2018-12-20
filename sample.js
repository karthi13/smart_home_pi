const { Client } = require('tplink-smarthome-api');
let {PythonShell} = require('python-shell');



const client = new Client();
const plug = client.getDevice({host: '192.168.230.201'}).then((device)=>{
  device.getSysInfo().then(console.log);
  device.setPowerState(false);
});