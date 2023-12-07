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
import DatePicker from 'react-date-picker';
import { createStudent } from '../../features/sms/smsSlice';
import pdfMake from 'pdfmake/build/pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'
pdfMake.vfs = pdfFonts.pdfMake.vfs


const StudentMarksheet = () => {

    
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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { loading, error, students } = useSelector((state) => state.sms)
    

    const formRef = useRef();

    
    const getCurrentStudent = students?.find(item => item.id == id && item)
    
    const getNumber = 100 >= 60 ? "Pass" : "Fail"
    console.log(getNumber)
    const formik = useFormik({
        initialValues : {
            subjects : [
                { subjectName: '', obtainedMarks: '', totalMarks: '', passingMarks: '' }
            ]
        },
        onSubmit: async values => {
            // const allSubjects = values.subjects.map((subject, index) => {
            //     return { subject.subjectName } 
            // })
            // console.log(allSubjects)
            const totalObtainedMarks = values.subjects.reduce((accumulator, subject) => {
                return accumulator + Number(subject.obtainedMarks);
            }, 0);
            const totalSubjectsMarks = values.subjects.reduce((accumulator, subject) => {
                return accumulator + Number(subject.totalMarks);
            }, 0);
            console.log(totalObtainedMarks)
            console.log(totalSubjectsMarks)
            const percentageTaken =  (100 * totalObtainedMarks) / totalSubjectsMarks;
            const gradeTaken = (percentageTaken) => {
                if (percentageTaken > 80) {
                    return 'A'
                } else if (percentageTaken > 60) {
                    return 'B'
                } else if (percentageTaken > 50) {
                    return 'C'
                } else {
                    return 'Fail'
                }
            }
            // console.log(gradeTaken(percentageTaken))
            const allValues = {...values, totalObtainedMarks: totalObtainedMarks, totalSubjectsMarks, totalSubjectsMarks, studentGrade : percentageTaken}
            console.log(allValues)
            console.log(getCurrentStudent?.imageUrl)
            let docDefinition = {
                background: function (page) {
                    if (page !== 2) {
                        return [
                            {
                                image: 'bee',
                                width: 200,
                                alignment: 'center',
                                opacity: 0.15,
                                marginTop: 100
                            }
                        ];
                    }
                },
                content: [
                    {
                        columns: [
                            { 
                                marginBottom: 30,
                                text: 'Bright Model School Karachi', 
                                fontSize: 28,
                                bold: true,
                                alignment: 'center'
                                
                            },
                        ]
                    },
                    
                    {
                        columns: [
                            [
                                {
                                    columns: [
                                        { 
                                            marginTop: 10,
                                            marginBottom: 9,
                                            text: values.examType + ' Examination', 
                                            fontSize: 14,
                                            bold: true,
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        { 
                                            marginBottom: 2,
                                            width: 100, 
                                            text: 'Roll Number:', 
                                            noWrap: true,
                                            
                                        },
                                        { 
                                            marginBottom: 2,
                                            text: getCurrentStudent?.id, 
                                            italics: true, 
                                            color: '#666' ,
                                            bold: true
                                        },
                                    ]
                                    
                                },
                                {
                                    columns: [
                                        { 
                                            marginBottom: 3,
                                            width: 100, 
                                            text: 'Student Name:', 
                                            noWrap: true,
                                            
                                        },
                                        { 
                                            marginBottom: 3,
                                            text: getCurrentStudent?.name, 
                                            italics: true, 
                                            color: '#666' ,
                                            bold: true
                                        },
                                    ]
                                },
                                {
                                    columns: [
                                        { 
                                            marginBottom: 2,
                                            width: 100, 
                                            text: 'Father Name:', 
                                            noWrap: true,
                                            
                                        },
                                        { 
                                            marginBottom: 2,
                                            text: getCurrentStudent?.fname + ' ' + getCurrentStudent?.caste, 
                                            italics: true, 
                                            color: '#666' ,
                                            bold: true
                                        },
                                    ]
                                },
                                
                                {
                                    columns: [
                                        { 
                                            width: 100, 
                                            text: 'Date of Birth:', 
                                            noWrap: true,
                                            
                                        },
                                        { 
                                            text: getCurrentStudent?.dob, 
                                            italics: true, 
                                            color: '#666' ,
                                            bold: true
                                        },
                                    ]
                                }
                            ],
                            {
                                image: "data:image/png;base64,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",
                                width: 110,
                                height: 110,
                                alignment: 'right',
                                marginBottom: 25
                            },
                            
                        ]
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [80, 100, 100, 100, '*'],
                            // body: [
                                
                                // ['Subject', 'Obtained Marks', 'Passing Marks', 'Maximum Marks', 'Result'],
                                
                                // values.subjects.forEach((item) => {
                                //     [ 
                                //         { text: item.subjectName, italics: true, color: 'gray' }, 
                                //         { text: item.obtainedMarks, italics: true, color: 'gray' }, 
                                //         { text: item.passingMarks, italics: true, color: 'gray' },
                                //         { text: item.totalMarks, italics: true, color: 'gray' }, 
                                //         { text: item.obtainedMarks >= item.passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                //     ]
                                // })
                                // [ 
                                //     { text: values.subjects[1].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[1].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[1].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[1].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[1].obtainedMarks >= values.subjects[1].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                // ],
                                // [ 
                                //     { text: values.subjects[2].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[2].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[2].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[2].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[2].obtainedMarks >= values.subjects[2].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                // ],
                                // [ 
                                //     { text: values.subjects[3].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[3].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[3].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[3].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[3].obtainedMarks >= values.subjects[3].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                // ],
                                // [ 
                                //     { text: values.subjects[4].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[4].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[4].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[4].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[4].obtainedMarks >= values.subjects[4].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                // ],
                                // [ 
                                //     { text: values.subjects[5].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[5].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[5].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[5].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[5].obtainedMarks >= values.subjects[5].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' }
                                // ],
                                // [ 
                                //     { text: values.subjects[6].subjectName, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[6].obtainedMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[6].passingMarks, italics: true, color: 'gray' },
                                //     { text: values.subjects[6].totalMarks, italics: true, color: 'gray' }, 
                                //     { text: values.subjects[6].obtainedMarks >= values.subjects[6].passingMarks ? "Pass" : "Fail", italics: true, color: 'gray' },
                                    
                                // ],
                                
                            // ]
                            body: [[ 'Subject', 'Obtained Marks', 'Passing Marks', 'Maximum Marks', 'Result' ]]
                            .concat(values.subjects.map((el, i) => [
                                el.subjectName, el.obtainedMarks,el.passingMarks, el.totalMarks, el.obtainedMarks >= el.passingMarks ? "Pass" : "Fail"
                            ]))
                            
                        }
                    },
                    {
                        style: 'tableExample',
                        table: {
                            widths: [407, '*'],
                            body: [
                                [
                                    { colSpan: 1, rowSpan: 1, text: `Grand Total: ${totalObtainedMarks} / ${totalSubjectsMarks}\n--------------------------------------\nPercentage Taken: ${Math.trunc(percentageTaken)}%` },
                                    
                                    { text: `Final Result: ${gradeTaken(percentageTaken)}` },
                                ],
					
                                
                            ]
                        }
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true
                    },
                    bigger: {
                        fontSize: 15,
                        italics: true
                    }
                },
                images: {
                    bee: 'data:image/png;base64,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'
                }
            };
            console.log(docDefinition)
            
            createPdf(docDefinition);
            // printContent()
            
           
            
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
            // let errors = {};

            // if (!values.subjects) {
            //     errors.subjects = 'Required'
            // }

            // return errors
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
                    <h3 className="text-center mt-5 mb-5"> {getCurrentStudent?.name} Marksheet</h3>
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
                            <Form.Label>Examination Type</Form.Label>
                            <Form.Select aria-label="Default select example" name="examType" onChange={formik.handleChange} value={formik.values.examType}>
                                <option defaultValue>Choose...</option>
                                <option value="1st Semester">1st Semester</option>
                                <option value="2nd Semester">2nd Semester</option>
                                <option value="3rd Semester">3rd Semester</option>
                                <option value="Annual">Annual Examination</option>
                            </Form.Select>
                            {formik.errors.examType && formik.touched.examType && <p className="error">{formik.errors.examType}</p>}
                        </Form.Group>
                    </Row>
                    <FormikProvider value={formik}>
                        <FieldArray name="subjects">
                            {({ insert, remove, push }) => (
                            <div>
                                {formik.values.subjects.length > 0 &&
                                formik.values.subjects.map((subject, index) => (
                                    <Row className="mb-3" key={index}>
                                            <Form.Group as={Col}>
                                                <Form.Label>Subject</Form.Label>
                                                <Form.Select aria-label="Default select example" name={`subjects.${index}.subjectName`} onChange={formik.handleChange} value={formik.values.subjects[index].subjectName}>
                                                <option defaultValue>Choose...</option>
                                                    <option value="english">English</option>
                                                    <option value="sindhi">Sindhi</option>
                                                    <option value="urdu">Urdu</option>
                                                    <option value="maths">Mathematics</option>
                                                    <option value="social">Social Studies</option>
                                                    <option value="science">Science</option>
                                                    <option value="islamiat">Islamiat</option>
                                                    <option value="physics">Physics</option>
                                                    <option value="chemistry">Chemistry</option>
                                                    <option value="biology">Biology</option>
                                                    <option value="attendence">Attendence</option>
                                                </Form.Select>
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Obtained Marks</Form.Label>
                                                <input type="text" name={`subjects.${index}.obtainedMarks`} className="form-control" onChange={formik.handleChange} value={formik.values.subjects[index].obtainedMarks} />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Total Marks</Form.Label>
                                                <input type="text" name={`subjects.${index}.totalMarks`} className="form-control" onChange={formik.handleChange} value={formik.values.subjects[index].totalMarks}  />
                                            </Form.Group>
                                            <Form.Group as={Col}>
                                                <Form.Label>Passing Marks</Form.Label>
                                                <input type="text" name={`subjects.${index}.passingMarks`} className="form-control" onChange={formik.handleChange} value={formik.values.subjects[index].passingMarks}  />
                                            </Form.Group>
                                            <Form.Group className="d-flex align-items-end justify-content-end" as={Col}>
                                                {
                                                    index ? 
                                                        <button type="button"  className="btn btn-danger" onClick={() => remove(index)}>Remove Subject</button> 
                                                    : <button className="btn btn-primary add" type="button" onClick={() => push({ subjectName: '', obtainedMarks: '', totalMarks: '', passingMarks: '' })}>Add Another Subject</button>
                                                }
                                            </Form.Group>
                                        </Row>
                                ))}
                                
                            </div>
                            )}
                        </FieldArray>
                    </FormikProvider>
                    <Button variant="success" type="submit">
                        <b>GENERATE MARKSHEET</b>
                    </Button>
                </Form>
                
            </Container>
        </div>
    )
}

export default StudentMarksheet
