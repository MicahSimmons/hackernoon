import { getAdminDb } from "./firebase_admin";

export async function queryCollection (collectionId, field, operator, value) {
    const collRef = getAdminDb().collection(collectionId);
    const qRef = collRef.where(field, operator, value);
    let docList = [];

    try {
        const snapshot = await qRef.get();
        snapshot.forEach( (doc) => {
            let row = {
                id: doc.id,
                data: doc.data()
            }
            docList.push(row);
        })
    } catch (e) {
        console.log("Failed queryCollection");
        console.log(e);
    }

    return docList;
}

export async function getData (collectionId, docId) {
    let docSnap = null;

    try {
        const docRef = getAdminDb().collection(collectionId).doc(docId);
        docSnap = await docRef.get();
    } catch (e) {
        console.log("getData (admin) failed.");
        console.log(e);
    }

    return (docSnap) ? docSnap.data() : {};
}

export async function createData (collectionId, docId, newData) {
    const docRef = getAdminDb().collection(collectionId).doc(docId);
    try {
        docRef.set(newData);
    } catch (e) {
        console.log("createData failed.");
        console.log(e);
    }
}

export async function setData (collectionId, docId, newData) {
    const docRef = getAdminDb().collection(collectionId).doc(docId);
    try {
        docRef.set(newData, {merge: true});
    } catch (e) {
        console.log("createData failed.");
        console.log(e);
    }
}

export async function deleteData ( collectionId, docId ) {
    const docRef = getAdminDb().collection(collectionId).doc(docId);
    try {
        await docRef.delete();
    } catch (e) {
        console.log("deleteData failed");
        console.log(e);
    }
}

export async function onUpdate ( collectionId, docId, callback ) {
    const docRef = getAdminDb().collection(collectionId).doc(docId);
    docRef.onSnapshot( callback, (err) => {
        console.log(`onUpdate error: ${err}`)
    })
}