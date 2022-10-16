import { getDb } from "./firebase";
import { collection, doc, getDoc, setDoc, onSnapshot, deleteDoc, getDocs, query, where } from "firebase/firestore";

export async function queryCollection (collectionId, field, operator, value) {
    const collRef = collection(getDb(), collectionId);
    const whereFn = where(field, operator, value);
    const q = query(collRef, whereFn);
    let docList = [];

    try {
        const snapshot = await getDocs(q);
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
        const docRef = doc(getDb(), collectionId, docId);
        docSnap = await getDoc(docRef);
    } catch (e) {
        console.log("getData failed.");
        console.log(e);
    }
    
    return (docSnap && docSnap.exists()) ? docSnap.data() : {};
}

export async function createData (collectionId, newData) {
    const collRef = collection(getDb(), collectionId);
    try {
        await addDoc(collRef, newData);
    } catch (e) {
        console.log("createData failed.");
        console.log(e);
    }
}

export async function setData (collectionId, docId, newData) {
    const docRef = doc(getDb(), collectionId, docId);
    try {
        await setDoc(docRef, newData, {merge:true});
    } catch (e) {
        console.log("setData failed.");
        console.log(e);
    }
}

export async function deleteData ( collectionId, docId ) {
    const docRef = doc(getDb(), collectionId, docId);
    try {
        await deleteDoc(docRef);
    } catch (e) {
        console.log("deleteData failed");
        console.log(e);
    }
}

export async function onUpdate ( collectionId, docId, callback ) {
    const docRef = doc(getDb(), collectionId, docId);
    onSnapshot(docRef, callback);
}

export async function onUpdateWhere ( collectionId, field, operator, value, callback) {
    const collRef = collection(getDb(), collectionId);
    const whereFn = where(field, operator, value);
    const qRef = query(collRef, whereFn);
    
    onSnapshot(qRef, (querySnapshot => {
        let doclist = [];
        querySnapshot.docs.forEach( (doc) => {
            doclist.push( { id: doc.id, ...doc.data() })
        })
        callback(doclist);
    }))
}