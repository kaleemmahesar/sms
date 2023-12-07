import React from 'react'
import { useSelector } from 'react-redux'
import { Col, Container, Row, Card, Navbar, Nav , NavDropdown, Form, Button } from 'react-bootstrap'
import './SmsDashboard.css';


const SmsDashboard = () => {
    const { loading, error, challans, students } = useSelector((state) => state.sms)

    return (
        <div className="sms-dashboard">
            <div className="sidebar">
                <div className="hello"></div>
            </div>
            <Container fluid>
                
                <Row>
                    <Col className="col-md-12">
                        <Row>
                            <Col className="col-md-3">
                                <Card
                                    bg="success"
                                    text='light'
                                    className="mb-2"
                                >
                                    <Card.Body>
                                        <Card.Title>
                                            <div className="d-flex">
                                                <h5>Total Students</h5>  
                                                <b className="ml-auto">{students?.length}</b>  
                                            </div>
                                        </Card.Title>
                                        <Card.Text>
                                            <div className="d-flex">
                                                <p className="m-0">Total Paid Amount</p>  
                                                <b className="ml-auto">00</b>  
                                            </div>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col className="col-md-3">
                            <Card
                                bg="danger"
                                text='light'
                                className="mb-2"
                            >
                                <Card.Body>
                                    <Card.Title>
                                        <div className="d-flex">
                                            <h5>Total Challans</h5>  
                                            <b className="ml-auto">{challans?.length}</b>  
                                        </div>
                                    </Card.Title>
                                    <Card.Text>
                                        <div className="d-flex">
                                            <p className="m-0">Total UnPaid Amount</p>  
                                            <b className="ml-auto">00</b>  
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        </Row>
                    </Col>
                </Row>
                
            </Container>
    
        </div>
    )
}

export default SmsDashboard
