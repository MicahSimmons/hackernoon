import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Link from 'next/link';

import useAuth from "../hooks/useAuth";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteToy, toggleToyStatus, listenMyToys } from "../api/toys";

const ToyList = () => {
    const [toys, setToys] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
  
    useEffect(() => { 
        if (!user) {
            setToys([]);
            return;
        }
        console.log("here...");
        listenMyToys(user.uid, setToys);
    }, [user]);

    const handleToyDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this pupper?")) {
            deleteToy(id);
            toast({ title: "Toy removed successfully", status: "success" });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "favorite" ? "secondary" : "favorite";
        await toggleToyStatus({ docId: id, rating: newStatus });
        console.log(`Toy marked ${newStatus}`)
        toast({
            title: `Toy marked ${newStatus}`,
            status: "success",
        });
    };


    return (
    <Box mt={5}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {toys &&
        toys.map((toy,idx) => (
            <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "sm" }}
                key={"map"+idx}
            >
                <Heading as="h3" fontSize={"xl"}>
                    <Link href={"toys/"+toy.id}>{toy.name}</Link>
                    {" "}
                    <Badge
                        color="red.500"
                        bg="inherit"
                        transition={"0.2s"}
                        _hover={{
                            bg: "inherit",
                            transform: "scale(1.2)",
                        }}
                        float="right"
                        size="xs"
                        onClick={() => handleToyDelete(toy.id)}
                    >
                        <FaTrash />
                    </Badge>
                    <Badge
                        color={toy.rating == "favorite" ? "gray.500" : "green.500"}
                        bg="inherit"
                        transition={"0.2s"}
                        _hover={{
                            bg: "inherit",
                            transform: "scale(1.2)",
                        }}
                        float="right"
                        size="xs"
                        onClick={() => handleToggle(toy.id, toy.rating)}
                    >
                        {toy.rating == "secondary" ? <FaToggleOff /> : <FaToggleOn />}
                    </Badge>
                    <Badge
                        float="right"
                        opacity="0.8"
                        bg={toy.rating == "secondary" ? "yellow.500" : "green.500"}
                    >
                        {toy.rating}
                    </Badge>
                    <Badge
                        float="right"
                        opacity="0.8"
                        bg="green.500">
                            {toy.type}
                        </Badge>
                </Heading>
                <Text>{toy.description}</Text>
            </Box>
        ))}
        </SimpleGrid>
    </Box>
    );
};
export default ToyList;