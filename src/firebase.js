import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB4CIaS7gEVDPwdWW-oFRyONGsMgaQR_DY",
    authDomain: "react-firebase-chat-app-a733c.firebaseapp.com",
    projectId: "react-firebase-chat-app-a733c",
    storageBucket: "react-firebase-chat-app-a733c.appspot.com",
    messagingSenderId: "381281768971",
    appId: "1:381281768971:web:b1c5bcf73b63e0c268d90e",
    measurementId: "G-Q4W3YX3RGB"
};

firebase.initializeApp(firebaseConfig);

export default firebase;