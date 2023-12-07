import React, { useEffect, useMemo, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { createUsedCar, createUser, updateUsedCar } from '../../features/wheels/wheelSlice';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import DropZoneUpload from '../dependencies/DropZoneUpload';
import Navigation from './Navigation';
import { useParams } from 'react-router-dom'


const PostAdd = ({loggedIn, handleSignOut}) => {
    console.log('users post add')
    const dispatch = useDispatch()
    const { loading, error, users, usedCars } = useSelector((state) => state.wheel)
    const { makersLoading, carMakers } = useSelector((state) => state.wheel)
    const [userisThere, setUserisThere] = useState(false)
    const [userRegistered, setuserRegistered] = useState(false)
    const [fileUrl, setFileUrl] = useState('')
    const [loader, setLoader] = useState(false)
    const [fromCountires, setFromCountries] = useState("");
    const [fromCities, setFromCities] = useState([]);
    const [editForm, setEditForm] = useState();
    const pathname = window.location.pathname
    let { id } = useParams();
    const [usedCar, setusedCar] = useState()
    useEffect(() => {
        // alert('working')
        // alert(usedCar?.carname)
        // setusedCar(usedCars?.find((car) => car.id == id))
        const getUser = async () => {
            const getCarbyID = await usedCars?.find((car) => car.id == id)
            console.log(getCarbyID)
        }
        getUser();
    },[pathname, editForm])

    console.log(usedCar)
    
    const updateFormState = useMemo(() => {
        if (!id) {
            return setEditForm(false)
        } else {
            return setEditForm(true)
        }
    }, [editForm, pathname])
    
    const getImageUrl = (imgurl) => {
        console.log(imgurl)
        setFileUrl(imgurl)
    }
    const handleLoader = (loaderState) => {
        setLoader(loaderState)
    }
    const handleFromCountries = (e) => {
        // e.preventDefault()
        formik.handleChange(e)
        const country = carMakers.find((carmaker) => carmaker.name === e.target.value);
        setFromCountries(country.name);
        setFromCities(country.cars);
    };
    const formik = useFormik({
        enableReinitialize: true,
        initialValues : {
            carname: usedCar?.carname,
            carmodel: usedCar?.carmodel,
            city: usedCar?.city,
            mileage: usedCar?.mileage,
            price: usedCar?.price,
            registry: usedCar?.registry,
            color: usedCar?.color,
            description: usedCar?.description,
            mobile: usedCar?.mobile,
            carmaker: usedCar?.carmaker,
        },
        onSubmit: values => {
            
            // console.log(fileUrl)
            // alert('sib')
            
            // dispatch(updateUsedCar(valuesWithId, id))
            // console.log(valuesWithId)
            // const userExistLength = users.filter(user => user.name == values.name).length;
            // console.log(userExistLength)
            // if(userExistLength > 0 ) {
            //     setUserisThere(true)
            // } else {
            //     dispatch(createUsedCar(valuesWithId))
            //     setUserisThere(false)
            //     setuserRegistered(true)
            //     formik.resetForm()
            // }
            if (editForm) {
                const updatedValuesWithId = {...values, id : usedCar?.id, imageUrl: usedCar?.imageUrl ,userID: usedCar?.userID }
                dispatch(updateUsedCar(updatedValuesWithId))
            } else {
                const newValuesWithId = {...values, id : Date.now() + Math.random(), imageUrl: fileUrl, userID: localStorage.getItem("id")}
                dispatch(createUsedCar(newValuesWithId))
            }
            
        },
        validate: values => {
            let errors = {};

            if (!values.carname) {
                errors.carname = "Required"
            }

            if (!values.carmodel) {
                errors.carmodel = 'Required'
            }
            
            if (!values.price) {
                errors.price = 'Required'
            }

            if (!values.city) {
                errors.city = 'Required'
            }

            if (!values.registry) {
                errors.registry = 'Required'
            }

            if (!values.color) {
                errors.color = 'Required'
            }
            
            if (!values.mileage) {
                errors.mileage = 'Required'
            }
            
            if (!values.mobile) {
                errors.mobile = 'Required'
            }

            if (!values.carmaker) {
                errors.carmaker = 'Required'
            }
            
            return errors
        }
    })

    
    
    if (loader) {
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
        <>
            <Navigation loggedIn={loggedIn } handleSignOut= {handleSignOut} />
            <div className="sign-up">
                <Container>
                    {
                        editForm ? <h2>Edit Form</h2> : <h2>Add Form</h2>
                    }
                    <Form onSubmit={formik.handleSubmit}>
                        <h3 className="text-center mb-5">Upload Car</h3>
                        {userisThere ? <Alert variant="danger"><Alert.Heading>Hey, User Already Taken!</Alert.Heading></Alert> : ""}
                        {userRegistered ? <Alert variant="success"><Alert.Heading>Hey, Car added Successfully!</Alert.Heading></Alert> : ""}
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Car Maker</Form.Label>
                                <Form.Select aria-label="Default select example" name="carmaker" value={formik.values.carmaker}  onChange={(e) => handleFromCountries(e)}>
                                    <option>Select Car Makers</option>
                                    {/* <option value="suzuki">Suzuki</option>
                                    <option value="toyota">Toyota</option>
                                    <option value="honda">Honda</option> */}
                                    {
                                        carMakers.map((makerName) => {
                                            return (
                                                <option key={makerName.id} value={makerName.name}>{makerName.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                {formik.errors.carmaker && formik.touched.carmaker && <p className="error">{formik.errors.carmaker}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Car Name</Form.Label>
                                <Form.Select aria-label="Default select example" name="carname" onChange={formik.handleChange} value={formik.values.carname}>
                                    <option>Select Car</option>
                                    {
                                        fromCities.map((makerName, index) => {
                                            return (
                                                <option key={makerName} value={makerName}>{makerName}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                                {formik.errors.carname && formik.touched.carname && <p className="error">{formik.errors.carname}</p>}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Car Model</Form.Label>
                                <Form.Control type="text" name="carmodel" placeholder="Enter User Name" value={formik.values.carmodel} onChange={formik.handleChange} onBlur={formik.handleBlur} autoComplete="off" />
                                {formik.errors.carmodel && formik.touched.carmodel && <p className="error">{formik.errors.carmodel}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Mileage</Form.Label>
                                <Form.Control type="text" name="mileage" placeholder="Mileage" onChange={formik.handleChange} value={formik.values.mileage} autoComplete="on" />
                                {formik.errors.mileage && formik.touched.mileage && <p className="error">{formik.errors.mileage}</p>}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Price (Rs).</Form.Label>
                                <Form.Control type="text" name="price" placeholder="Price" onChange={formik.handleChange} value={formik.values.price} autoComplete="on" />
                                {formik.errors.price && formik.touched.price && <p className="error">{formik.errors.price}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>City</Form.Label>
                                <Form.Select aria-label="Default select example" name="city" onChange={formik.handleChange} value={formik.values.city}>
                                    <option>Select City</option>
                                    <option value="lahore">Lahore</option>
                                    <option value="larkana">Larkana</option>
                                    <option value="karachi">Karachi</option>
                                </Form.Select>
                                {formik.errors.city && formik.touched.city && <p className="error">{formik.errors.city}</p>}
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Registered In</Form.Label>
                                <Form.Select aria-label="Default select example" name="registry" onChange={formik.handleChange} value={formik.values.registry}>
                                    <option>Select Registration</option>
                                    <option value="punjab">Punjab</option>
                                    <option value="islamabad">Islamabad</option>
                                    <option value="sindh">Sindh</option>
                                    <option value="kpk">KPK</option>
                                </Form.Select>
                                {formik.errors.registry && formik.touched.registry && <p className="error">{formik.errors.registry}</p>}
                            </Form.Group>

                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Contact Number</Form.Label>
                                <Form.Control type="tel" name="mobile" placeholder="Mobile Number" onChange={formik.handleChange} value={formik.values.mobile} autoComplete="on" />
                                {formik.errors.mobile && formik.touched.mobile && <p className="error">{formik.errors.mobile}</p>}
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Exterior Color</Form.Label>
                                <Form.Select aria-label="Default select example" name="color" onChange={formik.handleChange} value={formik.values.color}>
                                    <option>Select Color</option>
                                    <option value="white">White</option>
                                    <option value="black">Black</option>
                                    <option value="red">Red</option>
                                    <option value="blue">Blue</option>
                                </Form.Select>
                                {formik.errors.color && formik.touched.color && <p className="error">{formik.errors.color}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-5">
                            <Form.Group as={Col}>
                                <Form.Label>Add Description</Form.Label>
                                <Form.Control as="textarea" name="description" placeholder="Add Description" style={{ height: '100px' }} onChange={formik.handleChange} value={formik.values.description} autoComplete="on" />
                                {formik.errors.description && formik.touched.description && <p className="error">{formik.errors.description}</p>}
                            </Form.Group>
                        </Row>
                        <Row className="mb-5">
                            <Col>
                                <DropZoneUpload handleLoader={handleLoader} getImageUrl={getImageUrl} className="p-16 text-center border border-neutral-200" currentImageUrl={usedCar?.imageUrl} editForm={editForm} />
                            </Col>
                        </Row>
                        <Button variant="primary" type="submit">
                            Post Add
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default PostAdd
