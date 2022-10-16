import React from "react";
import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { FaGoogle, FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import signIn from "../api/auth";


const Auth = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    const { isLoggedIn, user } = useAuth();
    const handleAuth = async () => { signIn() };
    return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
            <Link href="/">Home</Link>
        </Box>
        <Box>
            <Link href="/addtodo">Add Todo</Link>
        </Box>

        <Box textAlign="right">
            <Button onClick={() => toggleColorMode()}>
                {colorMode == "dark" ? <FaSun /> : <FaMoon />}
            </Button>{" "}
            {isLoggedIn && (
                <>
                    <Text color="green.500">{user.email}</Text>
                    <Link color="red.500" onClick={() => auth.signOut()}>
                        Logout
                    </Link>
                </>
            )}
            {!isLoggedIn && (
                <Button leftIcon={<FaGoogle />} onClick={() => handleAuth()}>
                    Login with Google
                </Button>
            )}
        </Box>
    </Box>
    );
};
export default Auth;