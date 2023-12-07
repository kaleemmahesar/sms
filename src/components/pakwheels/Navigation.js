import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

export const Navigation = ({loggedIn, handleSignOut}) => {
    const navigate = useNavigate()

    const username = localStorage.getItem("name");
    const userid = localStorage.getItem("id")
    const handleSignOutBtn = () => {
        handleSignOut(false)
        navigate('/wheels/login')
    }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                
                <Navbar.Brand href="#home">{loggedIn ? <h4>Welcome {username}</h4> : <h4>Pak Wheels</h4>}</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">New Cars</Nav.Link>
                        <NavDropdown title="Used Cars" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    {loggedIn ? 
                        <Nav>
                            <Link to="/wheels/post-add" className="mr-3">Post Add</Link>
                            <Link to="/wheels/users-cars-listing" className="mr-3">My Adds</Link>
                            <Link to={`/wheels/user-profile/${userid}`} className="mr-3">My Profile</Link>
                            <button onClick={handleSignOutBtn}> Sign Out</button>
                        </Nav>
                    : 
                        
                        <Nav>
                            <Link to="/wheels/signup" className="mr-4">Sign Up</Link>
                            <Link to="/wheels/login"> Sign In</Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation
