import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { Button, useColorMode } from "@chakra-ui/react";


const ColorMode = () => {
    const { toggleColorMode, colorMode } = useColorMode();
    return (
        <Button onClick={() => toggleColorMode()}>
            {colorMode == "dark" ? <FaSun /> : <FaMoon />}
        </Button>
    )
}

export default ColorMode ;