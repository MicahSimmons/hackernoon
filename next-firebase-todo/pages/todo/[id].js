import React from "react"
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Container
} from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import Auth from "../../components/Auth";

import { getData } from "../../api/firestore_admin";

/* Get server side props can't be part of the component.  It has
 * to be a separate function.  The resulting props are passed
 * in through the constructor of the page component.
 */
export async function getServerSideProps(context) {
    let itemData = null;

    itemData = await getData("todo", context.params.id);

    return {
        props: {
            id: context.params.id,
            itemData
        }
    }
} 

function timestampToString ( epochSeconds ) {
    var t = new Date(0);
    t.setSeconds(epochSeconds / 1000);
    return t.toLocaleDateString();
}

const TodoPage = ( props ) => {
    /* Hold on... since this is a react hook, does that mean user privacy enforcement
     * only happens from the client side???
     */
    const {  user } = useAuth();
    console.log(props);

    return (
        <Container>
          <Heading>{props.itemData.title}</Heading>
          <Text>{props.itemData.description}</Text>
          <Text>
            Started: {timestampToString(props.itemData.createdAt)}
          </Text>
        </Container>
    )
};

export default TodoPage;