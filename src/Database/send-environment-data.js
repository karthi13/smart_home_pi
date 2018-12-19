const firebase = require('../firebase');
const {Storage} = require('@google-cloud/storage');
const {FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET} = require('../constants');
// Database instance from firebase
const database = firebase.database();
// var config = {
//     projectId: 'iotproject999-b5fee'
//   };
// const projectId = 'iotproject999-b5fee';

// Creates a client
const storage = new Storage({
  projectId: FIREBASE_PROJECT_ID,
  keyFilename : '/home/karthik/Documents/Personal_Utilites/Projects/Node/smart_home_pi/iotproject999-b5fee-firebase-adminsdk-g3cyz-55b28f69c0.json'
});
  
const bucket = storage.bucket(FIREBASE_STORAGE_BUCKET);
const file = "/home/karthik/Documents/Personal_Utilites/Projects/Node/smart_home_pi/src/images/videoplayback1.mp4";
const fileMime = "video/mp4";
const remotePath = "/videos";

var upload = (filePath, remoteFile, fileMime) => {

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

            return Promise.resolve("https://firebasestorage.googleapis.com/v0/b/" + bucket.name + "/o/" + encodeURIComponent(file.name) + "?alt=media&token=" + uuid);
        });
  }

//This function is for generation download url    
upload(file, remotePath, fileMime).then( downloadURL => {
    console.log(downloadURL);
});
//Storage instance from firebase
// const firebaseStorageRef = firebase.storage().ref();

// // Points to 'images'
// var imagesRef = storageRef.child('images');
// var fileName = 'space.jpg';
// var spaceRef = imagesRef.child(fileName);
// // File path is 'images/space.jpg'
// var path = spaceRef.fullPath

// // File name is 'space.jpg'
// var name = spaceRef.name

// // Points to 'images'
// var imagesRef = spaceRef.parent;
// var metadata = {
//     contentType: 'image/jpg'
// };
// // Upload file and metadata to the object 'images/mountains.jpg'
// var uploadTask = storageRef.child('images/' + fileName).put(fileName, metadata);
// // Listen for state changes, errors, and completion of the upload.
// uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//     function (snapshot) {
//         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//         console.log('Upload is ' + progress + '% done');
//         switch (snapshot.state) {
//             case firebase.storage.TaskState.PAUSED: // or 'paused'
//                 console.log('Upload is paused');
//                 break;
//             case firebase.storage.TaskState.RUNNING: // or 'running'
//                 console.log('Upload is running');
//                 break;
//         }
//     }, function (error) {

//         // A full list of error codes is available at
//         // https://firebase.google.com/docs/storage/web/handle-errors
//         switch (error.code) {
//             case 'storage/unauthorized':
//                 // User doesn't have permission to access the object
//                 break;

//             case 'storage/canceled':
//                 // User canceled the upload
//                 break;
//             case 'storage/unknown':
//                 // Unknown error occurred, inspect error.serverResponse
//                 break;
//         }
//     }, function () {
//         // Upload completed successfully, now we can get the download URL
//         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
//             console.log('File available at', downloadURL);
//         });
//     });

/**
 * Store the environmental sensor values to firebase instance
 */
exports.firebaseWriteEnvironmentData = function (environmentData) {
    var date = new Date()
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