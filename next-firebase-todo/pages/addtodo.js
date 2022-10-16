import { Container } from "@chakra-ui/react";
import AddTodo from "../components/AddTodo";
import Auth from "../components/Auth";

export default function AddTodoPage() {
  return (
    <Container maxW="7x1">
      <Auth />
      <AddTodo />
    </Container>
  )
}