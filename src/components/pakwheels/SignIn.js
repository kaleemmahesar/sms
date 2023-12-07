import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export const SignIn = ({handleSignIn}) => {
    const navigate = useNavigate();
    const { users } = useSelector((state) => state.wheel)
    const [userisNotThere, setUserisNotThere] = useState(false)

    const formik = useFormik({
        initialValues : {
            name: "",
            password: "",
        },
        onSubmit: values => {
            const userExists = users.find(user => user.name == values.name && user.password == values.password);
            // console.log(Object.keys(userExistLength).length)
            // console.log(userExistLength)
            if(Object.keys(userExists).length > 0 ) {
                localStorage.setItem('name', userExists.name)
                localStorage.setItem('id', parseInt(userExists.id))
                handleSignIn(true)
                navigate('/wheels')
            } else {
                alert('incorrect credentials')
                setUserisNotThere(false)
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
            return errors
        }
    })

    return (
        <div className="sign-up in">
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <h3 className="text-center mb-5">PakWheels</h3>
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
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <Row className="mt-3">
                        <Col md={5}>
                            <p><Link to="/wheels/fpassword">Forget Password ?</Link></p>
                        </Col>
                        <Col md={7}>
                            <p>Don't have an Account ? <Link to="/wheels/signup">Click here to SignUp</Link></p>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default SignIn
