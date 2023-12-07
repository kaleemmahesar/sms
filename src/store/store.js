import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit'
import todosReducer from '../features/todos/todosSlice'
import kbcReducer from '../features/kbc/kbcSlice'
import foodReducer from '../features/food/foodSlice'
import wheelReducer from '../features/wheels/wheelSlice'
import smsReducer from '../features/sms/smsSlice'


export const store = configureStore({
  reducer: {
    todos: todosReducer,
    kbc: kbcReducer,
    food: foodReducer,
    sms: smsReducer,
    wheel: wheelReducer
  }
})

