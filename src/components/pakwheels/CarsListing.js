import React from 'react'
import Car from './Car'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';


const CarsListing = () => {
    return (
        <div className="cars-listing mt-5">
            <Container>
                <Row>
                    <Col>
                        <Car />
                    </Col>
                    <Col>
                        <Car />
                    </Col>
                    <Col>
                        <Car />
                    </Col>
                    <Col>
                        <Car />
                    </Col>
                </Row>
            </Container>
        </div>
        
    )
}

export default CarsListing
