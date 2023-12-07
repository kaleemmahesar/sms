import React from 'react'

const UserProfile = () => {
    console.log('users user profile')
    const username = localStorage.getItem("name");
    return (
        <div>
            <h2>Welcome {username}</h2>
        </div>
    )
}

export default UserProfile
