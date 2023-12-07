import React from 'react'
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useGetAllWheelsQuery } from '../../services/wheels';
import CarsListing from './CarsListing';
import FileUpload from './FileUpload';
import HomeBanner from './HomeBanner';
import Navigation from './Navigation';

const Landing = ({loggedIn, handleSignOut}) => {
    console.log('users landing')
    return (
        <>
            <Navigation loggedIn={loggedIn} handleSignOut={handleSignOut} />
            <HomeBanner />
            <CarsListing />
            {/* <FileUpload /> */}
        </>
    )
}

export default Landing
