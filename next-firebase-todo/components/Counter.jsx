/* useState pulled in from global import */
import React, { useEffect } from "react"

import {
    Box,
    Button
} from "@chakra-ui/react";

export default class Counter extends React.Component { 
    constructor (props) {
        super(props);
        this.state = {
            cookies: 0
        }
    }

    /* Use effect is called whenever the react state of the component changes. 
     * This can influence other parts of the document, or create other side effects
     * (writing cookies, setting timers, AJAX, etc.)
     */
    componentDidUpdate () {
        document.title = `You have ${this.state.cookies} cookies!`
    }

    render () {
        /* The setter function has to be called instead of directly manipulating 
        * the cookies variable, in order to update the React State
        * 
        * Note, this.setState({newStuff}) is a merge, not a replace.
        */
        return (
            <Box margin={"10"}  display="flex" justifyContent="center">
                <Box display="flex" flexDirection="column"  border="1px" borderRadius="lg" padding="3">
                    <p>You have {this.state.cookies} cookies!</p>
                    <Button onClick={() => this.setState({cookies: this.state.cookies+1})}>
                    Click Me
                    </Button>
                </Box>
            </Box>
        )
    }
}