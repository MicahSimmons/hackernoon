import React from "react"
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Container
} from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

import Auth from "../../components/Auth";

/* Get server side props can't be part of the component.  It has
 * to be a separate function.  The resulting props are passed
 * in through the constructor of the page component.
 */
export async function getServerSideProps(context) {
    let itemData = null;

    return {
        props: {
            id: context.params.id,
            itemData
        }
    }
} 

const TodoPage = ( props ) => {
    const {  user } = useAuth();

    return (
        <Container>
            <Auth />
          <p>Here... have some text</p>
        </Container>
    )
};

export default TodoPage;