import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"


let STATUSES = {
    idle: "Idle",
    loading: "Loading",
    error: "Error"
}

const initialState = {
  todos: [],
  status: STATUSES.idle
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    getAllTodos(state, action) {
        state.todos = action.payload
    },
    setStatuses(state, action) {
        state.status = action.payload
    },
    updateTodoStatus(state, action) {
        state.todos = action.payload
    },
    addNewTodoItem (state, action) {
        state.todos.push(action.payload)
        console.log(action.payload)
    },
    deleteTodoItem (state, action) {
        state.todos = action.payload
    }
  }
})


export function fetchTodos () {
    return async function fethTodosThunk(dispatch, getState) {
        dispatch(setStatuses(STATUSES.loading))
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos')
            const rdata = await response.json()
            dispatch(getAllTodos(rdata))
            dispatch(setStatuses(STATUSES.idle))
        } catch(error) {
            dispatch(setStatuses(STATUSES.error))
        }
    }
}

// Action creators are generated for each case reducer function
export const { setStatuses, getAllTodos, updateTodoStatus, addNewTodoItem, deleteTodoItem } = todosSlice.actions

export default todosSlice.reducer