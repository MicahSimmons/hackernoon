import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";

import UseAuth from "./UseAuth";
import { addToy } from "../api/toys";

/* React hooks only work in function style components */
const Toaster = (props) => {
    const [options, setOptions] = React.useState({});
    const toast = useToast();

    if ((props.options != options)) {
        setOptions(props.options);
    }

    React.useEffect( () => {
        if (Object.keys(options).length > 0) {
            toast(options);
        }
    })

    return <></>;
}

class AddToy extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            rating: false,
            type: "other",
            user: null,
            isLoggedIn: false,
            toastOptions: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin ({ user, isLoggedIn }) {
        if (user != this.state.user) {
            console.log("handleLogin");
            this.setState( { 
                user: user,
                isLoggedIn: isLoggedIn,
                toastOptions: {}
            })            
        }
    }

    handleCreate () {
        console.log("Create clicked!");
        if (this.state.isLoggedIn == false) {
            this.setState({
                toastOptions: {
                    title: "You must be logged in to create an entry",
                    status: "error",
                    duration: 9000,
                    isClosable: true,               
                }
            })
            return;
        }

        addToy({ 
            userId: this.state.user.uid,
            name: this.state.name,
            description: this.state.description,
            rating: this.state.rating,
            type: this.state.type
        }).then( () => {
            console.log("done!");
            this.setState( {
                name: "",
                description: "",
                adopted: false,
                toastOptions:{ title: "Puppy Toy Registered successfully", status: "success" }
            })
        })
    }

    render () {
        return (
            <Box w="40%" margin={"0 auto"} display="block" mt={5}>
                <UseAuth onChange={this.handleLogin}/>
                <Toaster options={this.state.toastOptions} />
                <Stack direction="column">

                    <Input
                    placeholder="Name"
                    value={this.state.name}
                    onChange={ (e) => this.setState({name: e.target.value})}
                    />
                    <Textarea
                    placeholder="Description"
                    value={this.state.description}
                    onChange={ (e) => this.setState({description: e.target.value})}
                    />
                    <Select value={this.state.rating} onChange={(e) => this.setState({rating: e.target.value})}>
                        <option value={"favorite"} style={{color: "yellow", fontWeight:"bold"}} >Best Toy Ever!</option>
                        <option value={"secondary"} style={{color: "green", fontWeight:"bold"}} >Sure, that&apos;s ok.</option>

                    </Select>
                    <Select value={this.state.type} onChange={(e) => this.setState({type: e.target.value})}>
                        <option value={"squeek"} style={{color: "yellow", fontWeight:"bold"}} >Squeeky Toy</option>
                        <option value={"crunch"} style={{color: "yellow", fontWeight:"bold"}} >Crunchy Toy</option>
                        <option value={"chew"} style={{color: "yellow", fontWeight:"bold"}} >Chewy Toy</option>
                        <option value={"puzzle"} style={{color: "yellow", fontWeight:"bold"}} >Puzzle Toy</option>
                        <option value={"agility"} style={{color: "yellow", fontWeight:"bold"}} >Agility Toy</option>
                        <option value={"other"} style={{color: "yellow", fontWeight:"bold"}} >Other Type</option>
                    </Select>
                    <Button
                        onClick={() => this.handleCreate()}
                        disabled={this.state.name.length < 1 || this.state.description.length < 1}
                        variant="solid"
                    >
                        Add
                    </Button>

                </Stack>
            </Box>
        )
    }
}

export default AddToy;