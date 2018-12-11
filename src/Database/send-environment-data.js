const firebase = require('../firebase');

// Database instance from firebase
const database = firebase.database();

/**
 * Store the environmental sensor values to firebase instance
 */
exports.firebaseWriteEnvironmentData = function (environmentData) {
    var date  = new Date()
    var ISOString = date.toISOString();
    var timestamp = ISOString.split('T')[0] + '/' + ISOString.split('T')[1].split('Z')[0].replace('.', '_');
    console.log(timestamp);
    database.ref('thingy/' + thingy_id + '/' + timestamp).set({
        eco2: environmentData.eco2,
        tvoc: environmentData.tvoc,
        temperature: environmentData.temperature,
        pressure: environmentData.pressure,
        humidity: environmentData.humidity
    });
}