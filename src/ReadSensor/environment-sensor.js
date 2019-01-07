const writeData = require('../Database/send-environment-data');
const { Client } = require('tplink-smarthome-api');
const client = new Client();
const {HSAPI100_URL} = require('../constants');

let current_eco2 = 0;
let current_tvoc = 0;
let current_temperature = 0;
let current_pressure = 0;
let current_humidity = 0;
let thingy_id = undefined;
let environmentData = {
    eco2: 0,
    tvoc: 0,
    temperature: 0,
    pressure: 0,
    humidity: 0,
    thingy_id : undefined
}


let enabled = false;

function setEnvironmentData() {
    environmentData.eco2 = current_eco2;
    environmentData.tvoc = current_tvoc;
    environmentData.temperature = current_temperature;
    environmentData.pressure = current_pressure;
    environmentData.humidity = current_humidity;
    environmentData.thingy_id = thingy_id;
}

function onTemperatureData(temperature) {
    current_temperature = temperature;
    setEnvironmentData();
    writeData.firebaseWriteEnvironmentData(environmentData);
}

function onPressureData(pressure) {
    current_pressure = pressure;
}

function onHumidityData(humidity) {
    current_humidity = humidity;
}

function onGasData(gas) {
    current_eco2 = gas.eco2;
    current_tvoc = gas.tvoc;
}

function onColorData(color) {

}

function onButtonChange(state) {
    if (state == 'Pressed') {
        if (enabled) {
            enabled = false;
            this.temperature_disable(function (error) {
                console.log('Temperature sensor stopped! ' + ((error) ? error : ''));
            });
            this.pressure_disable(function (error) {
                console.log('Pressure sensor stopped! ' + ((error) ? error : ''));
            });
            this.humidity_disable(function (error) {
                console.log('Humidity sensor stopped! ' + ((error) ? error : ''));
            });
            this.color_disable(function (error) {
                console.log('Color sensor stopped! ' + ((error) ? error : ''));
            });
            this.gas_disable(function (error) {
                console.log('Gas sensor stopped! ' + ((error) ? error : ''));
            });
        }
        else {
            enabled = true;
            this.temperature_enable(function (error) {
                console.log('Temperature sensor started! ' + ((error) ? error : ''));
            });
            this.pressure_enable(function (error) {
                console.log('Pressure sensor started! ' + ((error) ? error : ''));
            });
            this.humidity_enable(function (error) {
                console.log('Humidity sensor started! ' + ((error) ? error : ''));
            });
            this.color_enable(function (error) {
                console.log('Color sensor started! ' + ((error) ? error : ''));
            });
            this.gas_enable(function (error) {
                console.log('Gas sensor started! ' + ((error) ? error : ''));
            });
        }
    }
}

exports.onDiscover = function (thingy) {
    console.log('Discovered: ' + thingy);
    console.log(thingy.uuid, "uuid");
    thingy_id = thingy.uuid;
    thingy.on('disconnect', function () {
        console.log('Disconnected!');
    });

    thingy.connectAndSetUp(function (error) {
        console.log('Connected! ' + error ? error : '');

        thingy.on('temperatureNotif', onTemperatureData);
        thingy.on('pressureNotif', onPressureData);
        thingy.on('humidityNotif', onHumidityData);
        thingy.on('gasNotif', onGasData);
        thingy.on('colorNotif', onColorData);
        // thingy.on('buttonNotif', onButtonChange);

        thingy.temperature_interval_set(6000, function (error) {
            if (error) {
                console.log('Temperature sensor configure! ' + error);
            }
        });
        thingy.pressure_interval_set(6000, function (error) {
            if (error) {
                console.log('Pressure sensor configure! ' + error);
            }
        });
        thingy.humidity_interval_set(6000, function (error) {
            if (error) {
                console.log('Humidity sensor configure! ' + error);
            }
        });
        thingy.color_interval_set(6000, function (error) {
            if (error) {
                console.log('Color sensor configure! ' + error);
            }
        });
        thingy.gas_mode_set(1, function (error) {
            if (error) {
                console.log('Gas sensor configure! ' + error);
            }
        });

        enabled = true;

        thingy.temperature_enable(function (error) {
            console.log('Temperature sensor started! ' + ((error) ? error : ''));
        });
        thingy.pressure_enable(function (error) {
            console.log('Pressure sensor started! ' + ((error) ? error : ''));
        });
        thingy.humidity_enable(function (error) {
            console.log('Humidity sensor started! ' + ((error) ? error : ''));
        });
        thingy.color_enable(function (error) {
            console.log('Color sensor started! ' + ((error) ? error : ''));
        });
        thingy.gas_enable(function (error) {
            console.log('Gas sensor started! ' + ((error) ? error : ''));
        });
        thingy.button_enable(function (error) {
            console.log('Button started! ' + ((error) ? error : ''));
        });
    });
}

// Thingy.discover(onDiscover);

exports.ChangeHSAPIPlugStatus = function(plugStatus){
    console.log("inside change plug sttaus",HSAPI100_URL);
    const plug = client.getDevice({host : HSAPI100_URL}).then((device) =>{
        console.log("inside get device");
        // device.getSysInfo().then(console.log);
        let state = device.getPowerState().then(res => {return res;});
        console.log(state)
        device.setPowerState(!state);
    })
    console.log("exit change plug sttaus");
}