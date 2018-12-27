var myPythonScript = 'capture-video.py';
var handbrake = require('handbrake-js');

var sendData = require('./src/Database/send-environment-data');

var { PythonShell } = require('python-shell');
var pyshell = new PythonShell(myPythonScript);
console.log(__dirname)
const file = __dirname + "/video.h264";
const fileMime = 'video/h264';
const remotePath = '/videos';
// do camera and firebase stuff
pyshell.on('message', function (message) {
    let outputfile = 'video.mp4'

    let options = {
        input: file,
        output : outputfile,
        preset : 'Normal',
        rotate : 1
    }

    handbrake.spawn(options).on('error',console.error).on('output',console.log);
    // ffmpeg(file).outputOptions("-c:v", "copy").save(outputfile);
    sendData.uploadVideoFile(outputfile, remotePath, fileMime).then(downloadURL => {
        console.log(downloadURL);
    });
    console.log(message);

});

pyshell.end(function () {
    console.log()
})

