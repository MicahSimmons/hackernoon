import { Container } from "@chakra-ui/react";
import ToyList from "../../components/ToyList";

export default function Home( props ) {
  return (
    <Container maxW="7x1">
      <ToyList />
    </Container>
  )
}