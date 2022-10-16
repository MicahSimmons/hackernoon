import admin from "firebase-admin";


const serviceAccount = JSON.parse(
    process.env.NEXT_FIREBASE_SVC_KEY
);

const appConfig = {

    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
}

function initApp () {
    try {
        if (!admin.apps.length) {
            admin.initializeApp( appConfig );
        }
    } catch (error) {
        console.log("Firebase/Firestore init failed", error.stack);
    }    
}



function getAdminDb () {
    initApp();
    return admin.firestore();
}

export { getAdminDb };