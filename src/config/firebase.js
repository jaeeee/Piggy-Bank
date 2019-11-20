import firebase from 'firebase';

  // Your web app's Firebase configuration

  /**
   * ORIGINAL PIGGY BANK DATABASE (use when storage is not full)
   */
  // var firebaseConfig = {
  //   apiKey: "AIzaSyDm-9VzoXGLZji26XDghH9gx_n52rgmsHY",
  //   authDomain: "piggy-bank-71144.firebaseapp.com",
  //   databaseURL: "https://piggy-bank-71144.firebaseio.com",
  //   projectId: "piggy-bank-71144",
  //   storageBucket: "piggy-bank-71144.appspot.com",
  //   messagingSenderId: "677504131374",
  //   appId: "1:677504131374:web:7d80a2b5b5a3b094ed5abf"
  // };

  /**
   * BACKUP PIGGY DATABASE
   */
   var firebaseConfig = {
     apiKey: "AIzaSyBNGQ94b3sh_CA0Xud_2RKTDZcrmCSV1aQ",
     authDomain: "piggy-backup.firebaseapp.com",
     databaseURL: "https://piggy-backup.firebaseio.com",
     projectId: "piggy-backup",
     storageBucket: "piggy-backup.appspot.com",
     messagingSenderId: "314565949487",
     appId: "1:314565949487:web:e5b4472d9b1da8b367aeda",
     measurementId: "G-VDJS8GGM8B"
   };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // this.db = firebase.firestore();
const db = firebase.firestore();

export { db };

  // export default db;
  // export { db };

export default firebase;
