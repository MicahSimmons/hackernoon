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
import { deleteFloof, toggleFloofStatus, listenMyFloofs } from "../api/floof";

const FloofList = () => {
    const [floofs, setFloofs] = React.useState([]);
    const {  user } = useAuth();
    const toast = useToast();
  
    useEffect(() => { 
        if (!user) {
            setFloofs([]);
            return;
        }
        console.log("here...");
        listenMyFloofs(user.uid, setFloofs);
    }, [user]);

    const handleFloofDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this pupper?")) {
            deleteFloof(id);
            toast({ title: "Floof removed successfully", status: "success" });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "adopted" ? "foster" : "adopted";
        await toggleFloofStatus({ docId: id, adopted: newStatus });
        toast({
            title: `Floof marked ${newStatus}`,
            status: newStatus == "adopted" ? "success" : "warning",
        });
    };


    return (
    <Box mt={5}>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {floofs &&
        floofs.map((dogo,idx) => (
            <Box
                p={3}
                boxShadow="2xl"
                shadow={"dark-lg"}
                transition="0.2s"
                _hover={{ boxShadow: "sm" }}
                key={"map"+idx}
            >
                <Heading as="h3" fontSize={"xl"}>
                    <Link href={"fluff/"+dogo.id}>{dogo.name}</Link>
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
                        onClick={() => handleFloofDelete(dogo.id)}
                    >
                        <FaTrash />
                    </Badge>
                    <Badge
                        color={dogo.adopted == "foster" ? "gray.500" : "green.500"}
                        bg="inherit"
                        transition={"0.2s"}
                        _hover={{
                            bg: "inherit",
                            transform: "scale(1.2)",
                        }}
                        float="right"
                        size="xs"
                        onClick={() => handleToggle(dogo.id, dogo.adopted)}
                    >
                        {dogo.adopted == "foster" ? <FaToggleOff /> : <FaToggleOn />}
                    </Badge>
                    <Badge
                        float="right"
                        opacity="0.8"
                        bg={dogo.adopted == "foster" ? "yellow.500" : "green.500"}
                    >
                        {dogo.adopted}
                    </Badge>
                </Heading>
                <Text>{dogo.description}</Text>
            </Box>
        ))}
        </SimpleGrid>
    </Box>
    );
};
export default FloofList;