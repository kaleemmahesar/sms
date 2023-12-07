import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, updateCartProduct } from '../../../features/food/foodSlice';

const SingleFood = ({food}) => {
    const dispatch = useDispatch();
    const { foodCart } = useSelector((state) => state.food)
    
    const handleAddtoCard = (food) => {
        const productExist = foodCart.filter(value => value.id === food.id).length > 0
        console.log(productExist)
        // console.log(food.id)
        if (!productExist) {
            dispatch(addToCart(food))
        } else {
            dispatch(updateCartProduct(food))
        }
        
    }

    return (
        <div className="single-product">
            <a className="block relative h-48 rounded overflow-hidden">
                <img alt="ecommerce" className="object-cover object-center w-full h-full block" src={food.url} />
            </a>
            <div className="mt-4">
                <h2 className="text-gray-900 title-font text-lg font-medium">{food.name}</h2>
                <p className="mt-1">Rs. {food.price}</p>
                <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded mt-4" onClick={() => handleAddtoCard(food)}>Add to Cart</button>
            </div>
        </div>
    )
}

export default SingleFood
