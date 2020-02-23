
import React from 'react';
import { Component } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';


export default class TodoList extends Component {

    state = {
        toShow: "all",
        todos: [],
        toggleAllComplete: true
    }

    addTodo = (todo) => {
        this.setState({
            todos: [todo, ...this.state.todos]
        })
    }

    toggleComplete = (todoId) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === todoId) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                }
                else { return todo };
            })
        })

    }

    updateTodoToShow = (state) => {
        this.setState({
            toShow: state
        })
    }

    delete = (todoId) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== todoId)
        })
    }

    removeAllComplete = () => {
        this.setState({
            todos: this.state.todos.filter(todo => !todo.complete)
        })
    }

    render() {

        let todos = this.state.todos;

        if (this.state.toShow === "all") {
            todos = this.state.todos;
        } else if (this.state.toShow === "allComplete") {
            todos = this.state.todos.filter(todo => todo.complete);
        } else if (this.state.toShow === "allActive") {
            todos = this.state.todos.filter(todo => !todo.complete);
        }

        return (
            <div> ** TodoList **
            <TodoForm onSubmit={this.addTodo} />
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        toggleComplete={() => this.toggleComplete(todo.id)}
                        delete={() => this.delete(todo.id)}
                        todo={todo} />
                ))}


                <button onClick={() => { this.updateTodoToShow("all") }}> All Tasks </button>
                <button onClick={() => { this.updateTodoToShow("allComplete") }}> All Completed </button>
                <button onClick={() => { this.updateTodoToShow("allActive") }}> All Left to complete </button>

                <div># Completed :  {this.state.todos.filter(todo => todo.complete === true).length}</div>
                <div> # Left to Do: {this.state.todos.filter(todo => todo.complete === false).length}</div>

                {
                    this.state.todos.some(todo => todo.complete) ?
                        <button onClick={this.removeAllComplete}>Remove All completed Tasks</button>
                        : null
                }

                <button
                    onClick={() =>
                        this.setState((state) => ({
                            todos: state.todos.map(todo => (
                                {
                                    ...todo,
                                    complete: todo.toggleAllCOmplete
                                })),
                            toggleAllComplete: !this.state.toggleAllComplete
                        }))
                    }
                >Toggle All Complete : {`${this.state.toggleAllCOmplete}`}</button>
            </div >
        )
    }
}