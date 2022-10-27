import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"
import { Navbar } from "../components/Navbar";

import React from "react";
import ReactDOM from "react-dom";
import { ColorModeScript } from "@chakra-ui/color-mode";
import theme from "../api/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp
