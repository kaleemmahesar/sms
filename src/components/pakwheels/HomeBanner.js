import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const HomeBanner = () => {
    return (
        <div className="home-banner">
            <Container>
                <h2>Find Used Cars in Pakistan</h2>
                <h4 className="mb-5">With thousands of cars, we have just the right one for you</h4>
                <Form>
                    <Row>
                        <Col xs={6}>
                            <Form.Control placeholder="Car Make or Model" />
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select title="hasdasd" defaultValue="Cites">
                                    <option value="all">Cites</option>
                                    <option value="karachi">Karachi</option>
                                    <option value="larkana">Larkana</option>
                                    <option value="lahore">Lahore</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Select defaultValue="Price Range">
                                    <option value="all">Price Range</option>
                                    <option value="5-10">5 - 10 Lacs</option>
                                    <option value="11-20">11 - 20 Lacs</option>
                                    <option value="21-30">21 - 30 Lacs</option>
                                    <option value="31-50">31 - 50 Lacs</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default HomeBanner
