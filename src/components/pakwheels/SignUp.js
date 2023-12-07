import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/wheels/wheelSlice';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

const SignUp = () => {
    console.log('users sign up')
    const dispatch = useDispatch()
    const { loading, error, users } = useSelector((state) => state.wheel)
    const [userisThere, setUserisThere] = useState(false)
    const [userRegistered, setuserRegistered] = useState(false)

    const formik = useFormik({
        initialValues : {
            name: "",
            password: "",
            city: "",
            mobile: ""
        },
        onSubmit: values => {
            const valuesWithId = {...values, id : Date.now() + Math.random()}
            const userExistLength = users.filter(user => user.name == values.name).length;
            console.log(userExistLength)
            if(userExistLength > 0 ) {
                setUserisThere(true)
            } else {
                dispatch(createUser(valuesWithId))
                setUserisThere(false)
                setuserRegistered(true)
                formik.resetForm()
            }
            
        },
        validate: values => {
            let errors = {};

            if (!values.name) {
                errors.name = 'Required'
            }

            if (!values.password) {
                errors.password = 'Required'
            }
            
            if (!values.city) {
                errors.city = 'Required'
            }

            if (!values.mobile) {
                errors.mobile = 'Required'
            }

            return errors
        }
    })

    
    
    if (loading) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        );
    }

    if (error) {
        return <p>Something Went Wrong.</p>
    }
      
    return (
        <div className="sign-up">
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <h3 className="text-center mb-5">PakWheels</h3>
                    {userisThere ? <Alert variant="danger"><Alert.Heading>Hey, User Already Taken!</Alert.Heading></Alert> : ""}
                    {userRegistered ? <Alert variant="success"><Alert.Heading>Hey, User Registerd Successfully!</Alert.Heading></Alert> : ""}
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter User Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.name && formik.touched.name && <p className="error">{formik.errors.name}</p>}
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Password" onChange={formik.handleChange} value={formik.values.password} autoComplete="on" />
                            {formik.errors.password && formik.touched.password && <p className="error">{formik.errors.password}</p>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-5">
                        <Form.Group as={Col}>
                            <Form.Label>City</Form.Label>
                            <Form.Select aria-label="Default select example" name="city" onChange={formik.handleChange} value={formik.values.city}>
                                <option value="lahore">Lahore</option>
                                <option value="larkana">Larkana</option>
                                <option value="karachi">Karachi</option>
                            </Form.Select>
                            {formik.errors.city && formik.touched.city && <p className="error">{formik.errors.city}</p>}
                        </Form.Group>

                        

                        <Form.Group as={Col}>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control type="tel" name="mobile" placeholder="Mobile Number" onChange={formik.handleChange} value={formik.values.mobile} autoComplete="on" />
                            {formik.errors.mobile && formik.touched.mobile && <p className="error">{formik.errors.mobile}</p>}
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className="mt-3">
                        <Col md={12}>
                            <p>Already have an Account ? <Link to="/wheels/login">Click here to Login</Link></p>
                        </Col>
                    </Row>
                </Form>
                
            </Container>
        </div>
    )
}

export default SignUp
