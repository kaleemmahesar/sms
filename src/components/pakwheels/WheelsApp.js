import React, { useMemo, useState } from 'react'
import Landing from './Landing'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './SignUp';
import SignIn from './SignIn';
import PostAdd from './PostAdd';
import UserAdsListing from './UserAdsListing';
import UserProfile from './UserProfile';


const WheelsApp = () => {
    const userLoggedIn = localStorage.getItem('name') ? true : false
    console.log(userLoggedIn)
    const [loggedIn, setLoggedIn] = useState(userLoggedIn)
    

    const handleSignIn = (getStatus) => {
        setLoggedIn(getStatus)
    }
    const handleSignOut = (getStatus) => {
        alert('handleSignOut' + getStatus)
        localStorage.removeItem("name");
        localStorage.removeItem("id");
        setLoggedIn(false)
        
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/wheels" element={<Landing loggedIn={loggedIn} handleSignOut={handleSignOut} />} />
                <Route path="/wheels/signup" element={<SignUp />} />
                <Route path="/wheels/user-profile/:id" element={<UserProfile />} />
                <Route path="/wheels/users-cars-listing" element={<UserAdsListing loggedIn={loggedIn} handleSignOut={handleSignOut} />} />
                <Route path="/wheels/login" element={<SignIn handleSignIn={handleSignIn} />} />
                <Route path="/wheels/post-add" element={<PostAdd loggedIn={loggedIn} handleSignOut={handleSignOut} />} />
                <Route path="/wheels/edit-car/:id" element={<PostAdd loggedIn={loggedIn} handleSignOut={handleSignOut} />} />
            </Routes>
        </BrowserRouter>
    )
}

export default WheelsApp
