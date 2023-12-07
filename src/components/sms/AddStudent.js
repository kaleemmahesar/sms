import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/wheels/wheelSlice';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import DatePicker from 'react-date-picker';
import { createStudent } from '../../features/sms/smsSlice';


const AddStudent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, students } = useSelector((state) => state.sms)
    const [userisThere, setStudentisThere] = useState(false)
    const [userRegistered, setstudentRegistered] = useState(false)

    const [formValues, setFormValues] = useState([{ subjectomarks: 0, subjecttotalmarks : 0}])

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.subjectomarks] = e.target.value;
        setFormValues(newFormValues);
      }
    
    let addFormFields = () => {
        setFormValues([...formValues, { subjectomarks: 0, subjecttotalmarks: 0 }])
    }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }

    const formik = useFormik({
        initialValues : {
            name: "",
            fname: "",
            caste: "",
            religion: "",
            dob: "",
            doa: "",
            class: "",
            section: "",
            gname: "",
            gphone: "",
            bgroup: "",
            address: "",
        },
        onSubmit: values => {
            const valuesWithId = {...values, id : Math.floor(Math.random() * 10000)}
            console.log(valuesWithId)
            const userExistLength = students.filter(student => student.name == values.name).length;
            console.log(userExistLength)
            if(userExistLength > 0 ) {
                setStudentisThere(true)
            } else {
                dispatch(createStudent(valuesWithId))
                setStudentisThere(false)
                setstudentRegistered(true)
                formik.resetForm();
                navigate('/sms')
            }
        },
        validate: values => {
            let errors = {};

            if (!values.name) {
                errors.name = 'Required'
            }

            if (!values.class) {
                errors.class = 'Required'
            }
            
            if (!values.fname) {
                errors.fname = 'Required'
            }

            if (!values.gname) {
                errors.gname = 'Required'
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
        <div className="add-student">
            <Container>
                <Form onSubmit={formik.handleSubmit}>
                    <h3 className="text-center mt-5 mb-5">Add Student</h3>
                    {userisThere ? <Alert variant="danger"><Alert.Heading>Hey, User Already Taken!</Alert.Heading></Alert> : ""}
                    {userRegistered ? <Alert variant="success"><Alert.Heading>Hey, Student Registerd Successfully!</Alert.Heading></Alert> : ""}
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control type="text" name="name" placeholder="Enter User Name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.name && formik.touched.name && <p className="error">{formik.errors.name}</p>}
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label>Father's Name</Form.Label>
                            <Form.Control type="text" name="fname" placeholder="Enter Father's Name" value={formik.values.fname} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.fname && formik.touched.fname && <p className="error">{formik.errors.fname}</p>}
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label>Caste</Form.Label>
                            <Form.Control type="text" name="caste" placeholder="Enter Caste" value={formik.values.caste} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.caste && formik.touched.caste && <p className="error">{formik.errors.caste}</p>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Religion</Form.Label>
                            <Form.Select aria-label="Default select example" name="religion" onChange={formik.handleChange} value={formik.values.religion}>
                                <option defaultValue>Choose...</option>
                                <option value="islam">Islam</option>
                                <option value="chiristian">Chiristian</option>
                                <option value="hindu">Hindu</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" name="dob" placeholder="Enter Date of Birth" value={formik.values.dob} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.dob && formik.touched.dob && <p className="error">{formik.errors.dob}</p>}
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Date of Admission</Form.Label>
                            <Form.Control type="text" name="doa" placeholder="Enter Date of Admission" value={formik.values.doa} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.doa && formik.touched.doa && <p className="error">{formik.errors.doa}</p>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Class</Form.Label>
                            <Form.Select aria-label="Default select example" name="class" onChange={formik.handleChange} value={formik.values.class}>
                                <option defaultValue>Choose...</option>
                                <option value="1">Class 1</option>
                                <option value="2">Class 2</option>
                                <option value="3">Class 3</option>
                                <option value="4">Class 4</option>
                                <option value="5">Class 5</option>
                                <option value="6">Class 6</option>
                                <option value="7">Class 7</option>
                                <option value="8">Class 8</option>
                                <option value="9">Class 9</option>
                                <option value="10">Class 10</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Class</Form.Label>
                            <Form.Select aria-label="Default select example" name="section" onChange={formik.handleChange} value={formik.values.section}>
                                <option defaultValue>Choose...</option>
                                <option value="A">Section A</option>
                                <option value="B">Section B</option>
                                <option value="C">Section C</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Guardian Name</Form.Label>
                            <Form.Control type="text" name="gname" placeholder="Enter Guardian Name" value={formik.values.gname} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.gname && formik.touched.gname && <p className="error">{formik.errors.gname}</p>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Guardian Phone</Form.Label>
                            <Form.Control type="text" name="gphone" placeholder="Enter Guradian Phone" value={formik.values.gphone} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.gphone && formik.touched.gphone && <p className="error">{formik.errors.gphone}</p>}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Bloog Group</Form.Label>
                            <Form.Select aria-label="Default select example" name="bgroup" onChange={formik.handleChange} value={formik.values.bgroup}>
                                <option defaultValue>Choose...</option>
                                <option value="A+">A +</option>
                                <option value="AB+">AB +</option>
                                <option value="O+">O +</option>
                                <option value="O-">O -</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" placeholder="Enter Address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                            {formik.errors.address && formik.touched.address && <p className="error">{formik.errors.address}</p>}
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit">
                        <b>ADD STUDENT</b>
                    </Button>
                </Form>
                
            </Container>
        </div>
    )
}

export default AddStudent
