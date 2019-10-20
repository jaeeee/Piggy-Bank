import firebase from 'firebase';

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDm-9VzoXGLZji26XDghH9gx_n52rgmsHY",
    authDomain: "piggy-bank-71144.firebaseapp.com",
    databaseURL: "https://piggy-bank-71144.firebaseio.com",
    projectId: "piggy-bank-71144",
    storageBucket: "piggy-bank-71144.appspot.com",
    messagingSenderId: "677504131374",
    appId: "1:677504131374:web:7d80a2b5b5a3b094ed5abf"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase;
