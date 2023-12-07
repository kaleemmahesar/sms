import { createSlice } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux"
import httpCommon from '../../http-common'

const apiUrl = 'http://localhost:3002'

let STATUSES = {
    idle: "Idle",
    loading: "Loading",
    error: "Error"
}

const initialState = {
  foods: [],
  foodsContainer: [],
  status: STATUSES.idle,
  foodCart: []
}

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    getAllFoods(state, action) {
        state.foods = action.payload
        state.foodsContainer = action.payload
    },
    setStatuses(state, action) {
        state.status = action.payload
    },
    addToCart(state, action) {
        // httpCommon.post('/carts', action.payload)
        state.foodCart.push(action.payload)
    },
    updateCartProduct(state, action) {
        const updatedCartState =  state.foodCart.map((item) => {
            if (item.id == action.payload.id) {
                return {...item , quantity: item.quantity + 1}
            } else {
                return item
            }
        });
        return { ...state, foodCart: updatedCartState }
    },
    updateProductsCats (state, action) {
        if (action.payload !== 'all') {
            state.foods = state.foodsContainer.filter((product) => product.category === action.payload)
        } else {
            state.foods = state.foodsContainer
        }
    },
    searchByQuery(state, action) {        
        state.foods = state.foodsContainer.filter(food => food.name.toLowerCase().includes(action.payload))
    } 
  }
})


export function fetchBanners () {
    return async function fetchBannersThunk(dispatch, getState) {
        dispatch(setStatuses(STATUSES.loading))
        try {
            const response = await fetch(`${apiUrl}/foods`)
            const rdata = await response.json();
            dispatch(getAllFoods(rdata))
            dispatch(setStatuses(STATUSES.idle))
        } catch(error) {
            dispatch(setStatuses(STATUSES.error))
        }
    }
}

// Action creators are generated for each case reducer function
export const { getAllFoods, setStatuses, addToCart, updateCartProduct, updateProductsCats, searchByQuery } = foodSlice.actions

export default foodSlice.reducer