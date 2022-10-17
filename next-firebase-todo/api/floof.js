import { createData, deleteData, onUpdateWhere, setData } from "./firestore"

const floofDb = "floof";

const addFloof = async ({ userId, name, description, adopted}) => {
    let data = {
        user: userId,
        name: name,
        description: description,
        adopted: adopted,
        createdAt: new Date().getTime()
    }
    await createData(floofDb, data);
};

const toggleFloofStatus = async ({ docId, adopted }) => {
    let data = {
        adopted
    }
    await setData(floofDb, docId, data);
};

const deleteFloof = async ( docId ) => {
    deleteData(floofDb, docId);
};

const listenMyFloofs = async ( uid, callback ) => {
    onUpdateWhere(floofDb, "user", "==", uid, callback);
}

export { addFloof, toggleFloofStatus, deleteFloof, listenMyFloofs };
