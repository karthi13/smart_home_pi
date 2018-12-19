const firebase = require('firebase');
const { FIREBASE_API_KEY, FIREBASE_DATABASE_URL, FIREBASE_AUTH_DOMAIN,
    FIREBASE_LOGIN, FIREBASE_STORAGE_BUCKET, FIREBASE_PASSWORD, FIREBASE_PROJECT_ID } = require('./constants');

const firebase_config = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    databaseURL: FIREBASE_DATABASE_URL,
    storageBucket: FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebase_config);

firebase.auth().signInWithEmailAndPassword(FIREBASE_LOGIN, FIREBASE_PASSWORD)
    .then(sucess => { }).catch(function (error) {
        console.log('Firebase sign in failed: ' + error.code + ' -' + error.message);
    });


module.exports = firebase;
