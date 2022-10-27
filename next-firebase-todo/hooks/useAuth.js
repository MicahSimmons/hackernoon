import { useEffect, useState } from "react";
import { onAuthUpdate } from "../api/auth";

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        onAuthUpdate((user) => {
            setIsLoggedIn(user && user.uid ? true : false);
            setUser(user);
        })
    });
    return { user, isLoggedIn };
};

export default useAuth;