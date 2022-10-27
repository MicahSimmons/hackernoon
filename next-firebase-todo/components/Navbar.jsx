import React from "react";
import Link from "next/link";
import { Box, Button, Menu, MenuList, MenuButton, MenuItem } from "@chakra-ui/react";
import { BiChevronDownSquare } from "react-icons/Bi"
import Auth from "./Auth";
import ColorMode from "./ColorMode";


export class Navbar extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box display="flex" alignItems="left">
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDownSquare />}>ToDo Items</MenuButton>
                        <MenuList>
                            <MenuItem><Link href="/">List ToDo Items</Link></MenuItem>
                            <MenuItem><Link href="/addtodo">Add ToDo Items</Link></MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDownSquare />}>Furballs</MenuButton>
                        <MenuList>
                            <MenuItem><Link href="/fluff">List Furballs</Link></MenuItem>
                            <MenuItem><Link href="/fluff/add">Add Furballs</Link></MenuItem>
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<BiChevronDownSquare />}>Puppy Toys</MenuButton>
                        <MenuList>
                            <MenuItem><Link href="/toys">List Toys</Link></MenuItem>
                            <MenuItem><Link href="/toys/add">Add Toys</Link></MenuItem>
                        </MenuList>
                    </Menu>
                </Box>

                <Box display="flex" alignItems="right">
                    <ColorMode />
                    <Auth />
                </Box>              
            </Box>
        )
    }
}