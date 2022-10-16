import { createData, deleteData, onUpdateWhere, setData } from "./firestore"

const addTodo = async ({ userId, title, description, status}) => {
    let data = {
        user: userId,
        title: title,
        description: description,
        status: status,
        createdAt: new Date().getTime()
    }
    await createData("todo", newData);
};

const toggleTodoStatus = async ({ docId, status }) => {
    let data = {
        status
    }
    await setData("todo", docId, data);
};

const deleteTodo = async ( docId ) => {
    deleteData("todo", docId);
};

const listenMine = async ( uid, callback ) => {
    onUpdateWhere("todo", "user", "==", uid, callback);
}

export { addTodo, toggleTodoStatus, deleteTodo, listenMine };
