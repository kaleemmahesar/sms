import React from 'react'

const Todo = ({todo, updateTodo, deleteTodo}) => {
    // const updateTodoItem = (id) => {
    //     updateTodo(id)
    // }

    return (
        <div className="todo">
            <h4>{todo.title}</h4>
            <button className={todo.completed ? "done" : "pending"} onClick={() => updateTodo(todo.id, todo.completed)}>{todo.completed ? "Completed" : "Pending"}</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    )
}

export default Todo
