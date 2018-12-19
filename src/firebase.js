const firebase = require('firebase');

const firebase_config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebase_config);

firebase.auth().signInWithEmailAndPassword(process.env.FIREBASE_LOGIN, process.env.FIREBASE_PASSWORD)
    .then(sucess => {}).catch(function (error) {
        console.log('Firebase sign in failed: ' + error.code + ' -' + error.message);
});


module.exports = firebase;
