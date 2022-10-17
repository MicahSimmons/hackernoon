import { Container } from "@chakra-ui/react";
import TodoList from "../components/TodoList";

export default function Home( props ) {
  return (
    <Container maxW="7x1">
      <TodoList />
    </Container>
  )
}