import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBanners } from '../../features/food/foodSlice'

import Banners from './banner/Banners'
import FoodCollection from './components/FoodCollection'
import Header from './header/Header'

const FoodApps = () => {
    

    const dispatch = useDispatch()
    const { foods, foodsContainer }  = useSelector((state) => state.food)

    useEffect(() => {
        dispatch(fetchBanners())
    }, [])
    
    
    console.log('Food Apps Main')
    return (
        <div>
            <Header />
            <h1>Shop Foods</h1>
            <FoodCollection foods={foods} foodsContainer={foodsContainer} />
            <h1>Related Foods</h1>
            <Banners foodsContainer={foodsContainer} />
        </div>
    )
}

export default FoodApps
