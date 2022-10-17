import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "./firebase";

function signIn () {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}

function signOut () {
    getAuth().signOut();
}

function onAuthUpdate (callback) {
    getAuth().onAuthStateChanged((user) => {
        callback(user);
    });
}

export { signIn, signOut, onAuthUpdate };