import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBPyH79eqtGuQmHs7ttTF2r3v70fR2Nf50",
    authDomain: "reacipe-63925.firebaseapp.com",
    projectId: "reacipe-63925",
    storageBucket: "reacipe-63925.appspot.com",
    messagingSenderId: "829765184525",
    appId: "1:829765184525:web:16e8bcd7da3f237ffdb944"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export default {
    app, db, auth
}