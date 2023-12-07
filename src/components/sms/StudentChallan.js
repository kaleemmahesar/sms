import React, { useRef, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik, FieldArray, Field, ErrorMessage, FormikProvider } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/wheels/wheelSlice';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

import { createChallan, createStudent } from '../../features/sms/smsSlice';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs


const StudentChallan = () => {
    var currentDate = new Date()
    var dayToday = currentDate.getDate()
    var monthToday = currentDate.getMonth() + 1
    var yearToday = currentDate.getFullYear();
    var minutesNow = currentDate.getMinutes();
    var seocondsNow = currentDate.getSeconds();
    var invId = `${minutesNow}${seocondsNow}`
    const dateToday = yearToday  + "-" + monthToday + "-" + dayToday
    const [date, setDate] = useState(new Date());
    const [pdfurl, setPdfurl] = useState(null)
    const createPdf = (docDefinition) => {
        const pdfGenerator = pdfMake.createPdf(docDefinition)
        pdfGenerator.getBlob((blob) => {
            const pdfurl = URL.createObjectURL(blob);
            setPdfurl(pdfurl)
            window.open(pdfurl);
        })
        // pdfGenerator.download()
    }
    const { id } = useParams();
    const { loading, error, students } = useSelector((state) => state.sms)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const getCurrentStudent = students?.find(item => item.id == id && item)
    
    const formik = useFormik({
        initialValues : {
            challanType : '',
            amount: '',
            ddate: '',
            vdate: '', 
        },
        onSubmit: values => {
            // console.log(gradeTaken(percentageTaken))
            const allValues = {...values, studentId: getCurrentStudent?.id , studentClass: getCurrentStudent?.class, studentName: getCurrentStudent?.name, challanDate: dateToday, paymentStatus: false, id : Number(invId)}
            console.log(allValues)
            let docDefinition = {
                content: [
                    {
                        style: 'tableExample',
                        table: {
                            widths: [60, '*', 100],
                            body: [
                                [
                                    { 
                                        image: 'data:image/png;base64,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', 
                                        rowSpan: 3,
                                        width: 50,
			                            height: 50,
                                        border: [false, false, false, false],
                                    },
                                    { text: `Systems Model School`, noWrap: true, fontSize: 15, bold: true, border: [false, false, false, false] },
                                    {text: ``, border:[false, false, false, false]},
                                    
                                ],
                                [
                                    {text: ``},
                                    { text: `MA Society Karachi`, fontSize: 11, noWrap: true, bold: true, bold:true, border: [false, false, false, false] },
                                    {text: ``, border:[false, false, false, false]},
                                ],
                                [   
                                    {text: ``},
                                    { text: `021-24157567`, noWrap: true, fontSize: 10, border: [false, false, false, false] },
                                    { text: 'PARENT COPY', bold: true, fontSize: 10, alignment: 'right', border:[false, false, false, false]}
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', 120],
                            body: [
                                [
                                    
                                    { text: `Student ID: ${getCurrentStudent?.id}`, noWrap: true, border: [true, true, false, false] },
                                    { text: `Invoice ID: #${minutesNow}${seocondsNow}`, bold:true, alignment: 'right', rowSpan: 3, fontSize: 10, border:[false, true, true, true]}
                                ],
                                [
                                    
                                    { text: `Name: ${getCurrentStudent?.name}`, noWrap: true, bold:true, border: [true, false, false, false] }
                                ],
                                [
                                    
                                    { text: `Class: ${getCurrentStudent?.class} - ${getCurrentStudent?.section}`, noWrap: true, border: [true, false, false, true] }
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        styles: 'tableExample',
                        table: {
                            widths: [100, 100, 100],
                            
                            body: [
                                [
                                    'Invoice Date', 
                                    { text: 'Due Date', noWrap: true },
                                    { text: 'Valid Date', noWrap: true }
                                ],
                                [
                                    dateToday, 
                                    { text: values.ddate, noWrap: true },
                                    { text: values.vdate, noWrap: true }
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        columns: [
                            {
                                styles: 'tableExample',
                                table: {
                                    widths: [209, 100],
                                    heights: 15,
                                    body: [
                                        [
                                            { text: 'Description', alignment:'center', colSpan: 2},
                                            { text: '' }
                                        ], 
                                        [
                                            values.challanType, 
                                            { text: values.amount, alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            { text: 'Invoice Total', alignment:'left', bold: true },
                                            { text: values.amount, alignment:'right' }
                                        ],  
                                    ]
                                }
                            },
                            {
                                styles: 'tableExample',
                                table: {
                                    widths: [109, 60],
                                    heights: 15,
                                    
                                    body: [
                                        [
                                            { text: 'Payment History', alignment:'center', colSpan: 2},
                                            { text: '' }
                                        ], 
                                        [
                                            'Mon, 09-Oct-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            'Mon, 04-Nov-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            'Tue, 05-Aug-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                    ]
                                }
                            }
                        ]
                    },
                    {
                        text: '', margin: [0, 0, 0, 30] 
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [60, '*', 100],
                            body: [
                                [
                                    { 
                                        image: 'data:image/png;base64,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', 
                                        rowSpan: 3,
                                        width: 50,
			                            height: 50,
                                        border: [false, false, false, false],
                                    },
                                    { text: `Systems Model School`, noWrap: true, fontSize: 15, bold: true, border: [false, false, false, false] },
                                    {text: ``, border:[false, false, false, false]},
                                    
                                ],
                                [
                                    {text: ``},
                                    { text: `MA Society Karachi`, noWrap: true, fontSize: 11, bold: true, bold:true, border: [false, false, false, false] },
                                    {text: ``, border:[false, false, false, false]},
                                ],
                                [   
                                    {text: ``},
                                    { text: `021-24157567`, noWrap: true, fontSize: 10, border: [false, false, false, false] },
                                    { text: 'SCHOOL COPY', bold: true, fontSize: 10, alignment: 'right', border:[false, false, false, false]}
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: ['*', 120],
                            body: [
                                [
                                    
                                    { text: `Student ID: ${getCurrentStudent?.id}`, noWrap: true, border: [true, true, false, false] },
                                    { text: `Invoice ID: #${minutesNow}${seocondsNow}`, bold:true, alignment: 'right', rowSpan: 3, fontSize: 10, border:[false, true, true, true]}
                                ],
                                [
                                    
                                    { text: `Name: ${getCurrentStudent?.name}`, noWrap: true, bold:true, border: [true, false, false, false] }
                                ],
                                [
                                    
                                    { text: `Class: ${getCurrentStudent?.class} - ${getCurrentStudent?.section}`, noWrap: true, border: [true, false, false, true] }
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        styles: 'tableExample',
                        table: {
                            widths: [100, 100, 100],
                            
                            body: [
                                [
                                    'Invoice Date', 
                                    { text: 'Due Date', noWrap: true },
                                    { text: 'Valid Date', noWrap: true }
                                ],
                                [
                                    dateToday, 
                                    { text: values.ddate, noWrap: true },
                                    { text: values.vdate, noWrap: true }
                                ],
                            ]
                        }
                    },
                    {
                        text: '', margin: [0, 0, 0, 20] 
                    },
                    {
                        columns: [
                            {
                                styles: 'tableExample',
                                table: {
                                    widths: [209, 100],
                                    heights: 15,
                                    body: [
                                        [
                                            { text: 'Description', alignment:'center', colSpan: 2},
                                            { text: '' }
                                        ], 
                                        [
                                            values.challanType, 
                                            { text: values.amount, alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            { text: 'Invoice Total', alignment:'left', bold: true },
                                            { text: values.amount, alignment:'right' }
                                        ],  
                                    ]
                                }
                            },
                            {
                                styles: 'tableExample',
                                table: {
                                    widths: [109, 60],
                                    heights: 15,
                                    
                                    body: [
                                        [
                                            { text: 'Payment History', alignment:'center', colSpan: 2},
                                            { text: '' }
                                        ], 
                                        [
                                            'Mon, 09-Oct-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            'Mon, 04-Nov-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            'Tue, 05-Aug-23', 
                                            { text: '1500', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                        [
                                            '', 
                                            { text: '', alignment:'right' },
                                        ],
                                    ]
                                }
                            }
                        ]
                    }
                ],
                styles: {
                    header: {
                        fontSize: 16,
                        bold: true
                    },
                    bigger: {
                        fontSize: 13,
                        italics: true
                    }
                }
            };
            createPdf(docDefinition);
            dispatch(createChallan(allValues))
            formik.resetForm();
            // navigate('/sms')
            // navigate()
            // await new Promise((r) => setTimeout(r, 500));
            // alert(JSON.stringify(values, null, 2));
            // console.log(values)
            // valuesWithMarks = {...values, }
            // const valuesWithId = {...values, id : Math.floor(Math.random() * 10000)}
            // console.log(valuesWithId)
            // const userExistLength = students.filter(student => student.name == values.name).length;
            // console.log(userExistLength)
            // if(userExistLength > 0 ) {
            //     setStudentisThere(true)
            // } else {
            //     dispatch(createStudent(valuesWithId))
            //     setStudentisThere(false)
            //     setstudentRegistered(true)
            //     formik.resetForm();
            //     navigate('/sms')
            // }
        },
        validate: values => {
            let errors = {};

            if (!values.challanType) {
                errors.challanType = 'Required'
            }
            if (!values.amount) {
                errors.amount = 'Required'
            }
            if (!values.ddate) {
                errors.ddate = 'Required'
            }
            if (!values.vdate) {
                errors.vdate = 'Required'
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
                    <h3 className="text-center mt-5 mb-5"> {getCurrentStudent?.name} Fees Challan</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Roll Number</Form.Label>
                            <Form.Control type="text" name="id" value={getCurrentStudent?.id} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Student Name</Form.Label>
                            <Form.Control type="text" name="name" value={getCurrentStudent?.name} disabled />
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label>Father's Name</Form.Label>
                            <Form.Control type="text" name="fname" value={getCurrentStudent?.fname} disabled />
                        </Form.Group>
                        
                        <Form.Group as={Col}>
                            <Form.Label>Caste</Form.Label>
                            <Form.Control type="text" name="caste" value={getCurrentStudent?.caste} disabled />
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control type="text" name="dob" value={getCurrentStudent?.dob} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Class</Form.Label>
                            <Form.Control type="text" name="class" value={getCurrentStudent?.class} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Section</Form.Label>
                            <Form.Control type="text" name="section" value={getCurrentStudent?.section} disabled />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Challan Type</Form.Label>
                            <Form.Select aria-label="Default select example" name="challanType" onChange={formik.handleChange} value={formik.values.challanType}>
                                <option defaultValue>Choose...</option>
                                <option value="Monthly Tution Fees">Monthly Tution Fees</option>
                                <option value="Admission Fees">Admission Fees</option>
                            </Form.Select>
                            {formik.errors.challanType && formik.touched.challanType && <p className="error">{formik.errors.challanType}</p>}
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Amount Due</Form.Label>
                            <Form.Control type="text" name="amount" value={getCurrentStudent?.amount} onChange={formik.handleChange} />
                            {formik.errors.amount && formik.touched.amount && <p className="error">{formik.errors.amount}</p>}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Due Date</Form.Label>
                            <Form.Control type="date" name="ddate" value={getCurrentStudent?.ddate}  onChange={formik.handleChange} />
                            {formik.errors.ddate && formik.touched.ddate && <p className="error">{formik.errors.ddate}</p>}
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Valid Date</Form.Label>
                            <Form.Control type="date" name="vdate" value={getCurrentStudent?.vdate} onChange={formik.handleChange} />
                            {formik.errors.vdate && formik.touched.vdate && <p className="error">{formik.errors.vdate}</p>}
                        </Form.Group>
                    </Row>
                    <Button variant="success" type="submit">
                        <b>GENERATE MARKSHEET</b>
                    </Button>
                </Form>
                
            </Container>
        </div>
    )
}

export default StudentChallan
