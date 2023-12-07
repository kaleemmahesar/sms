import React from 'react'
import { useDispatch } from 'react-redux';
import { updateProductsCats } from '../../../features/food/foodSlice';

const FoodCategories = ({foodsContainer, showByCollection}) => {
    const dispatch = useDispatch()
    let unique = [];
    let updatedFoods;
    updatedFoods = foodsContainer
    
    function removeDuplicates(foodsContainer) {    
        foodsContainer.forEach(element => {
            if (!unique.includes(element.category)) {
                unique.push(element.category);
            }
        });
        return unique;
    }
    console.log(removeDuplicates(foodsContainer));
    
    const handleCats = (item) => {
        showByCollection(item)
    }
    return (
        
            <ul className="flex flex-wrap justify-center -mb-px">
                <li className="mr-2">
                    <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 capitalize" onClick={() => handleCats('all')} >All</button>
                </li>
                {unique.map((item) => {
                    return (
                        <li className="mr-2" key={item}>
                            <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 capitalize" onClick={() => handleCats(item)} >{item}</button>
                        </li>
                    )
                })}
                
            </ul>
        

    )
}

export default FoodCategories;