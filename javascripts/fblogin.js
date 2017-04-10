// Initialize Firebase
var config = {
  apiKey: "AIzaSyBp-dKFwvy61HlXmXoEpnm-rqvEgsNlzuE",
  authDomain: "authproject-3a7db.firebaseapp.com",
  databaseURL: "https://authproject-3a7db.firebaseio.com",
  projectId: "authproject-3a7db",
  storageBucket: "authproject-3a7db.appspot.com",
  messagingSenderId: "509466940796"
};

firebase.initializeApp(config);
// FirebaseUI config.
var uiConfig = {
  signInSuccessUrl: 'http://ideone.com',
  signInOptions: [
  // Leave the lines as is for the providers you want to offer your users.
  firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
