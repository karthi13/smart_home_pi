const firebase = require('../firebase');
const { Storage } = require('@google-cloud/storage');
const { FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET } = require('../constants');
// Database instance from firebase
const database = firebase.database();
// var config = {
//     projectId: 'iotproject999-b5fee'
//   };
// const projectId = 'iotproject999-b5fee';

// Creates a client
const storage = new Storage({
  projectId: FIREBASE_PROJECT_ID,
  keyFilename: '/home/pi/Desktop/smart_home_pi/iotproject999-b5fee-firebase-adminsdk-g3cyz-55b28f69c0.json'
});

const bucket = storage.bucket(FIREBASE_STORAGE_BUCKET);
const file = "/home/pi/Desktop/smart_home_pi/src/images/videoplayback1.mp4";
const fileMime = "video/mp4";
const remotePath = "/videos";

exports.uploadVideoFile = (filePath, remoteFile, fileMime) => {

  let uuid = "2";

  return bucket.upload(filePath, {
    destination: remoteFile,
    uploadType: "media",
    metadata: {
      contentType: fileMime,
      metadata: {
        firebaseStorageDownloadTokens: uuid
      }
    }
  })
    .then((data) => {

      let file = data[0];
      database.ref('videoDownloadLink/').set({
        video_url : "https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid
      })
      return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid);
    });
}

//This function is for generation download url    
// uploadVideoFile(file, remotePath, fileMime).then(downloadURL => {
//   console.log(downloadURL);
// });
//Storage instance from firebase
// const firebaseStorageRef = firebase.storage().ref();


/**
 * Store the environmental sensor values to firebase instance
 */
exports.firebaseWriteEnvironmentData = function (environmentData) {
  var date = new Date()
  var ISOString = date.toISOString();
  var timestamp = ISOString.split('T')[0] + '/' + ISOString.split('T')[1].split('Z')[0].replace('.', '_');
  console.log(timestamp, " thingy_id ", environmentData.thingy_id);
  database.ref('thingy/' + environmentData.thingy_id + '/' + timestamp).set({
    timestamp,
    eco2: environmentData.eco2,
    tvoc: environmentData.tvoc,
    temperature: environmentData.temperature,
    pressure: environmentData.pressure,
    humidity: environmentData.humidity
  });
}

exports.firebaseWriteHSPlugData = function (plugStatus) {
  var date = new Date()
  var ISOString = date.toISOString();
  var timestamp = ISOString.split('T')[0] + '/' + ISOString.split('T')[1].split('Z')[0].replace('.', '_');
  console.log("inside hsapi write data");
  database.ref('hsAPI100/').set({
    plugStatus
  })
  console.log("exit hsapi write data");
}