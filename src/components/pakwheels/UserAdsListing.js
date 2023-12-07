import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import { Link } from "react-router-dom";

const UserAdsListing = ({loggedIn, handleSignOut}) => {
    const { usedCars } = useSelector((state) => state.wheel)
    
    console.log('users Ads Listing')
    return (
        <>
            <Navigation loggedIn={loggedIn } handleSignOut= {handleSignOut} />
            <Container>
                <h3 className="mt-5 mb-5 text-center">My All Posted Ads</h3>
                <Row>
                    {usedCars.map((car) => {
                        if (car.userID == localStorage.getItem('id')) {
                            return (
                                <Col md={4} key={car.id}>
                                    <Card>
                                        <Card.Img variant="top" src={car.imageUrl} />
                                        <Card.Body>
                                            <Card.Title>{car.carmaker} {car.carname} {car.carmodel}</Card.Title>
                                            <Card.Text>{car.description}</Card.Text>
                                            <Link to={`/wheels/edit-car/${car.id}`}>Edit</Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        }
                    })}
                </Row>
            </Container>
        </>
    )
}

export default UserAdsListing
