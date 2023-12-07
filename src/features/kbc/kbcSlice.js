import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"


let STATUSES = {
    idle: "Idle",
    loading: "Loading",
    error: "Error"
}

const initialState = {
  kbc: [
    
      {
        "id": 1,
        "answer": "B",
        "answer_text": "Nonviolent resistance",
        "question": "What was Gandhi's main method of resistance?",
        "type": "multiple_choice",
        "choices": {
          "A": "Violence",
          "B": "Nonviolent resistance",
          "C": "Political manipulation",
          "D": "Bribery"
        },
        "status" : false,
        "answer_info": "He employed nonviolent resistance to lead India's successful campaign for independence from British rule."
      },
      {
        "id": 2,
        "answer": "C",
        "answer_text": "London",
        "question": "Where did Gandhi train in law?",
        "type": "multiple_choice",
        "choices": {
          "A": "Mumbai",
          "B": "Delhi",
          "C": "London",
          "D": "New York"
        },
        "status" : false,
        "answer_info": "He was born in 1869 in coastal Gujarat and trained in law in London."
      },
      {
        "id": 3,
        "answer": "B",
        "answer_text": "Women's rights and religious and ethnic amity",
        "question": "What were some of the causes that Gandhi led campaigns for in India?",
        "type": "multiple_choice",
        "choices": {
          "A": "Animal rights and environmental protection",
          "B": "Women's rights and religious and ethnic amity",
          "C": "Gun control and military expansion",
          "D": "Tax cuts and economic deregulation"
        },
        "status" : false,
        "answer_info": "He returned to India in 1915 and led nationwide campaigns for various causes, including poverty, women's rights, and religious and ethnic amity."
      }
      
    
  ],
  status: STATUSES.idle
}

export const kbcSlice = createSlice({
  name: 'kbc',
  initialState,
  reducers: {
    updateQuestionsStatus(state, action) {
      state.kbc = action.payload
    }
  }
})


// export function fetchTodos () {
//     return async function fethTodosThunk(dispatch, getState) {
//         dispatch(setStatuses(STATUSES.loading))
//         try {
//             const response = await fetch('https://jsonplaceholder.typicode.com/todos')
//             const rdata = await response.json()
//             dispatch(getAllKbc(rdata))
//             dispatch(setStatuses(STATUSES.idle))
//         } catch(error) {
//             dispatch(setStatuses(STATUSES.error))
//         }
//     }
// }

// Action creators are generated for each case reducer function
export const { updateQuestionsStatus } = kbcSlice.actions

export default kbcSlice.reducer