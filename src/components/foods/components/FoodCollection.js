import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateProductsCats } from '../../../features/food/foodSlice'
import FoodCategories from './FoodCategories'
import SearchFood from './SearchFood'
import SingleFood from './SingleFood'

const FoodCollection = ({foods, foodsContainer}) => {
    console.log('Food Collection')
    const dispatch = useDispatch()

    const showByCollection = (getcat) => {
        dispatch(updateProductsCats(getcat))
    }
    
     
    return (
        <div className="food-collection">
            <div className="text-gray-600 body-font">
                <div className="container mx-auto p-5">
                    <div className="flex justify-between text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
                        <FoodCategories foodsContainer={foodsContainer} showByCollection={showByCollection} />
                        <SearchFood />
                    </div>
                    <div className="flex flex-wrap flex-col md:flex-row items-center">
                    {
                        foods.map((food) => {
                            return (
                                <div className="lg:w-1/6 md:w-1/4 p-4 w-full" key={food.id}>
                                    <SingleFood food={food} />
                                </div>
                            ) 
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FoodCollection
