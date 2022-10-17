import { Box, Button, Link, Text, useColorMode } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { signIn, signOut } from "../api/auth";


const Auth = () => {
    const { isLoggedIn, user } = useAuth();
    const handleAuth = async () => { signIn() };
    return (
    <Box textAlign="right">
        {isLoggedIn && (
            <>
                <Text color="green.500">{user.email}</Text>
                <Link color="red.500" onClick={() => signOut()}>
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
    );
};

export default Auth;