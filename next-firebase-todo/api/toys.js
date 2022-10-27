import { createData, deleteData, onUpdateWhere, setData } from "./firestore"

const toysDb = "toys";

const addToy = async ({ userId, name, description, rating, type}) => {
    let data = {
        user: userId,
        name: name,
        description: description,
        rating: rating,
        type: type,
        createdAt: new Date().getTime()
    }
    await createData(toysDb, data);
};

const toggleToyStatus = async ({ docId, rating }) => {
    let data = {
        rating
    }
    await setData(toysDb, docId, data);
};

const deleteToy = async ( docId ) => {
    deleteData(toysDb, docId);
};

const listenMyToys = async ( uid, callback ) => {
    onUpdateWhere(toysDb, "user", "==", uid, callback);
}

export { addToy, toggleToyStatus, deleteToy, listenMyToys };
