import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function getServerSideProps (context) {

  //const docRef = doc(db, "test", "0");
  //const docSnap = await getDoc(docRef);

  return {
    props: {
      foo: "bar"
    }
  }
}

export default function Home( props ) {
  return (
    <Container maxW="7x1">
      <Auth />
      <TodoList />
      <p>{props.foo}</p>
    </Container>
  )
}