var myPythonScript =  "capture-video.py";

var sendData = require('./src/Database/send-environment-data');
var fs = require('fs');

var { PythonShell } = require('python-shell');
var pyshell = new PythonShell(myPythonScript);

console.log(__dirname,  "welmooobkjkjh");
const file = __dirname + '/forFirebase.mp4';
const fileMime = 'video/mp4';
const remotePath = '/videos';


    pyshell.on('message', function (message) {
    
        console.log(message);
        sendData.uploadVideoFile(file, remotePath, fileMime).then(downloadURL => {
            console.log(downloadURL);
            fs.unlinkSync(__dirname + '/forFirebase.mp4');
            fs.unlinkSync(__dirname + '/video.h264');
        }).catch((error) => {
            console.log(error);
        });
          
    });

    // pyshell.end(function(){
    //     console.log("pyshell endo")
    // })


