
import React from 'react';
import { Component } from 'react';
import shortid from 'shortid';


export default class TodoForm extends Component {

    state = {
        text: ""
    }


    handleOnchange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Submit 
        this.props.onSubmit({
            text: this.state.text,
            complete: false,
            id: shortid.generate()
        });
        this.setState({
            text: ""
        });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input name="text" value={this.state.text} onChange={this.handleOnchange} placeholder="enter todo's ..." />
                <button onClick={this.handleSubmit}>Add Todo</button>
            </form>
        )
    }
}