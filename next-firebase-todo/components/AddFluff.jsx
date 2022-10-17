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
import { addFloof } from "../api/floof";

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

class AddFloof extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            name: "",
            description: "",
            adopted: false,
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
                    title: "You must be logged in to create a todo",
                    status: "error",
                    duration: 9000,
                    isClosable: true,               
                }
            })
            return;
        }

        addFloof({ 
            userId: this.state.user.uid,
            name: this.state.name,
            description: this.state.description,
            adopted: this.state.adopted
        }).then( () => {
            console.log("done!");
            this.setState( {
                name: "",
                description: "",
                adopted: false,
                toastOptions:{ title: "Floof Registered successfully", status: "success" }
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
                    <Select value={this.state.adopted} onChange={(e) => this.setState({adopted: e.target.value})}>
                        <option value={"foster"} style={{color: "yellow", fontWeight:"bold"}} >Foster Puppy</option>
                        <option value={"adopted"} style={{color: "green", fontWeight:"bold"}} >Adopted!</option>

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

export default AddFloof;