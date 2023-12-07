import React, { useState } from 'react'

const AddTodo = ({addNewTodo}) => {
    const [todoName, setTodoName] = useState('')
    
    const handleChange = (e) => {
        setTodoName(e.target.value)
    }

    const handleSubmit = (todoName) => {
        addNewTodo(todoName)
        setTodoName('')
    }

    return (
        <div>
            <input type="text" value={todoName} onChange={handleChange} />
            <button className="" onClick={() => handleSubmit(todoName)}>Add Todo</button>
        </div>
    )
}

export default AddTodo
