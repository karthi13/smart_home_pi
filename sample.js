var myPythonScript = 'capture-video.py';

var {PythonShell} = require('python-shell');
var pyshell = new PythonShell(myPythonScript);

// do camera and firebase stuff
pyshell.on('message', function(message) {
    console.log(message);
        
});

pyshell.end(function(){
    console.log()
})

