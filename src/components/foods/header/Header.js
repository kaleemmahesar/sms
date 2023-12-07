import React from 'react'
import Logo from '../assets/etisalat-logo.svg'
import './Header.scss'
import {RiLoginCircleLine}  from "react-icons/ri";
import {FaShoppingBasket} from 'react-icons/fa'
import { useSelector } from 'react-redux';

const Header = () => {
    console.log('Food Apps Header')
    const { foodCart } = useSelector((state) => state.food)
    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <img src={Logo} alt="Logo" />
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 text-primary hover:text-gray-900">First Link</a>
                    <a className="mr-5 hover:text-gray-900">Second Link</a>
                    <a className="mr-5 hover:text-gray-900">Third Link</a>
                </nav>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 mr-5 md:mt-0"><FaShoppingBasket />{foodCart.length > 0 ? foodCart.length : ""}</button>
                <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"><RiLoginCircleLine /></button>
            </div>
        </header>
    )
}

export default Header
