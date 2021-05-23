// import Firebase from 'firebase/app';
// import 'firebase/database';
// import 'firebase/storage';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCdz4zkzsZq4l2g8OF5LL5uXtCqqVEo4FM",
  authDomain: "barkplaypark-2.firebaseapp.com",
  databaseURL: "https://barkplaypark-2-default-rtdb.firebaseio.com/",
  projectId: "barkplaypark-2",
  storageBucket: "barkplaypark-2.appspot.com",
  messagingSenderId: "518392561315",
  appId: "1:518392561315:web:874f930a5bfbff4265c916",
  measurementId: "G-GTCY8H6YSW"
};

// const app = Firebase.initializeApp(firebaseConfig);
// export const db = app.database().ref();

firebase.initializeApp(firebaseConfig);

export default firebase;