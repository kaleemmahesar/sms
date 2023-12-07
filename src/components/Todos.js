import React from 'react'
import { useSelector } from 'react-redux'
import Todo from './Todo'
import { useDispatch } from "react-redux";
import { addNewTodoItem, deleteTodoItem, updateTodoStatus } from '../features/todos/todosSlice';
import AddTodo from './AddTodo';

const Todos = () => {
    const dispatch = useDispatch()
    const { todos , status } = useSelector((state) => state.todos)
    
    const updateTodo  = (id, todostatus) => {
        
        const updatedTodoList = todos.map((todo) => {
            return todo.id === id ? {...todo, completed: !todostatus} : todo
        })
        
        dispatch(updateTodoStatus(updatedTodoList))
    }

    const addNewTodo = (todoName) => {
        let newTodoItem = {
            userId: 1,
            id: Math.floor((Math.random() + 100) * 1000),
            title : todoName,
            completed : false
        } 
        dispatch(addNewTodoItem(newTodoItem))
    }

    const deleteTodo = (id) => {
        const updatedTodoList = todos.filter((todo) => {
            return todo.id !== id 
        })
        dispatch(deleteTodoItem(updatedTodoList))
    }

    if (status === 'Loading') {
        return <p>Loading</p>
    }
    

    return (
        <>
        <AddTodo addNewTodo={addNewTodo} />
        {
            todos.map((todo) => {
                return <Todo key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />
            })
        }
        </>
    )
}

export default Todos