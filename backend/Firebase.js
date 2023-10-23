// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPyH79eqtGuQmHs7ttTF2r3v70fR2Nf50",
    authDomain: "reacipe-63925.firebaseapp.com",
    projectId: "reacipe-63925",
    storageBucket: "reacipe-63925.appspot.com",
    messagingSenderId: "829765184525",
    appId: "1:829765184525:web:16e8bcd7da3f237ffdb944"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();

// Initialize Firebase
export default {
    app, db, auth
}