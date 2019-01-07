var myPythonScript = 'capture-video.py';

var sendData = require('./src/Database/send-environment-data');
var fs = require('fs');

var { PythonShell } = require('python-shell');
var pyshell = new PythonShell(myPythonScript);

const file = __dirname + "/forFirebase.mp4";
const fileMime = 'video/mp4';
const remotePath = '/videos';

pyshell.on('message', function (message) {
    

    sendData.uploadVideoFile(file, remotePath, fileMime).then(downloadURL => {
        console.log(downloadURL);
        fs.unlinkSync(__dirname + '/forFirebase.mp4');
        fs.unlinkSync(__dirname + '/video.h264');
    });
  
    console.log(message);

});

pyshell.end(function () {
    console.log()
})

