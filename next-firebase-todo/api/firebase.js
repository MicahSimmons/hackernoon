// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth as getFireAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const apiKey = `${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;

// Your web app's Firebase configuration
/** **/
var firebaseConfig = {
  apiKey: apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MSG_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
var context = {
    app: null,
    db: null,
    auth: null
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function getApp () {
    if (!context.app) {
        console.log("Connecting to firebase");
        context.app = initializeApp(firebaseConfig);
    }

    return context.app;
}

function getDb () {
    if (!context.db) {
        let app = getApp();

        console.log("Connecting to firestore");
        context.db = getFirestore(app);
    }

    return context.db;
}

function getAuth () {
    if (!context.auth) {
        let app = getApp();
        console.log("Connecting to FireAuth");
        context.auth = getFireAuth(app);
    }

    return context.auth;
}

export { getApp, getDb, getAuth };