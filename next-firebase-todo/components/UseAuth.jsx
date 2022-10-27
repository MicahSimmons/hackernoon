import React from "react";
import { onAuthUpdate } from "../api/auth";

export default class UseAuth extends React.Component {
    constructor (props) {
        super(props);
        this.onChange = props.onChange;
        this.state = {
            user: null,
            isLoggedIn: false
        }
    }

    componentDidMount () {
        onAuthUpdate((user) => {
            this.setState( {
                user: user,
                isLoggedIn: (user && user.uid) ? true : false
            })
        })
    }

    componentDidUpdate () {
        this.onChange && this.onChange({
            user: this.state.user,
            isLoggedIn: this.state.isLoggedIn
        });
    }

    render () {
        return (<></>);
    }
}