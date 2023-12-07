import React, { useState, useMemo, useRef, useEffect } from 'react'
import { Col, Container, Row, Table, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { BsPostcard } from 'react-icons/bs'
import { TbReportMoney } from 'react-icons/tb'
import { TbReportAnalytics } from 'react-icons/tb'
import { searchChallansByClass, updateChallans, searchByChallanName, searchChallansByMonth } from '../../features/sms/smsSlice';


const AllChallans = () => {
    const { loading, error, challans, challansContainer } = useSelector((state) => state.sms)
    const fieldValue = useRef();
    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const dispatch = useDispatch();
    const totalPaidChallans = challans?.filter((challan) => challan.paymentStatus === true);
    const totalUnPaidChallans = challans?.filter((challan) => challan.paymentStatus === false);
    const [showClassSection, setShowClassSection] = useState(false)

    const monthName = useRef();
    const className = useRef();
    const sectionName = useRef();

    const sumofUnPaid = totalUnPaidChallans.reduce((accumulator, object) => {
        return accumulator + Number(object.amount);
    }, 0);

    const sumofPaid = totalPaidChallans.reduce((accumulator, object) => {
        return accumulator + Number(object.amount);
    }, 0);

    // console.log(sumofUnPaid)
    // console.log(sumofPaid)
    const date = new Date(2009, 10, 10);  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    const payNow = (id) => {
        const getCurrentChallan = challans?.find((challan) => challan.id === id)
        const updatedChallan = {...getCurrentChallan, paymentStatus: !getCurrentChallan.paymentStatus}
        dispatch(updateChallans(updatedChallan))
    }
	const columns = [
        {
            name: 'Challan Id',
            selector: row => row.id,
        },
        {
            name: 'Challan Month',
            selector: row => new Date(row.challanDate).toLocaleString('en-us',{month:'short', year:'numeric'}),
        },
        {
            name: "Student Id",
            selector: row => row.studentId,
        },
        {
            name: 'Student Name',
            selector: row => row.studentName,
        },
        {
            name: 'Challan Amount',
            selector: row => row.amount,
        },
        {
            name: 'Student Class',
            selector: row => row.studentClass,
        },
        {
            name: 'Payment Status',
            selector: row => row.paymentStatus ? <Button className="small-btn" variant="success" title="Fees Pending">Paid</Button> : <Button className="small-btn" variant="danger" title="Fees Pending">Pending</Button>,
        },
        
        {
            name: "Actions",
            cell: (row) => (
                <div className="sms-actions-button">
                    <Button variant="warning" className="small-btn" title="Paid By Student" onClick={() => payNow(row.id)}>Update</Button>
                </div>
            ),
        }
    ];
    // useEffect(() => {
    //     console.log(monthName)
    //     // Whatever else we want to do after the state has been updated.
    // }, [eventCategory])
    const focusSearchInput = (e) => {
        dispatch(searchByChallanName(e.target.value))
    };
    const showByClassName = (getClass) => {
        // setShowClassSection((oldState) => {
        //     return oldState = !oldState
        // })
        className.current = getClass
        var monthNameNumber;
        if (typeof monthName.current === 'string') { 
            monthNameNumber = monthName.current
        } else {
            console.log('object')
        }
        dispatch(searchChallansByClass({getClass, monthNameNumber}))
    }
    const showByMonthName = (getMonth) => {
        monthName.current = getMonth
        var classNameNumber;
        if (typeof className.current === 'string') { 
            classNameNumber = className.current
        } else {
            console.log('object')
        }
        dispatch(searchChallansByMonth({getMonth, classNameNumber}))
    }

    const showBySectionName = (getSection) => {
        console.log(getSection)
        // monthName.current = getMonth
        // var classNameNumber;
        // if (typeof className.current === 'string') { 
        //     classNameNumber = className.current
        // } else {
        //     console.log('object')
        // }
        // dispatch(searchChallansByMonth({getMonth, classNameNumber}))
    }
    
    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
				setFilterText('');
			}
		};

		return (
			<Row>
                <Col className="col-md-4">
                    <Form.Control onChange={focusSearchInput} ref={fieldValue} onClear={handleClear} placeholder="Search by Name..." />
                </Col>
                <Col className="col-md-4">
                    <Form.Select aria-label="Default select example" ref={className} name="class" onChange={(e) => showByClassName(e.target.value)}>
                        <option value="all">All Classes</option>
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
                </Col>
                {/* <Col className="col-md-3">
                    <Form.Select aria-label="Default select example" ref={sectionName} name="section" onChange={(e) => showBySectionName(e.target.value)}>
                        <option value="all">All Sections</option>
                        <option value="a">A</option>
                        <option value="b">B</option>
                        <option value="c">C</option>
                        <option value="d">D</option>
                        <option value="e">E</option>
                    </Form.Select>
                </Col> */}
                <Col className="col-md-4">
                    <Form.Select aria-label="Default select example" ref={monthName} name="class" onChange={(e) => showByMonthName(e.target.value)}>
                        <option value="all">All Months</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </Form.Select>
                </Col>
                
            </Row>
		);
	}, [filterText, resetPaginationToggle]);

    return (
        <div className="add-student">
            <Container fluid>
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
                                        <h5>Total Paid Challans</h5>  
                                        <b className="ml-auto">{totalPaidChallans?.length}</b>  
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <div className="d-flex">
                                        <p className="m-0">Total Paid Amount</p>  
                                        <b className="ml-auto">{sumofPaid}</b>  
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
                                        <h5>Total UnPaid Challans</h5>  
                                        <b className="ml-auto">{totalUnPaidChallans?.length}</b>  
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <div className="d-flex">
                                        <p className="m-0">Total UnPaid Amount</p>  
                                        <b className="ml-auto">{sumofUnPaid}</b>  
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col as={Col}>
                        <DataTable
                            title="Challans List"
                            columns={columns}
                            data={challans}
                            pagination
                            paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                            subHeader
                            subHeaderComponent={subHeaderComponentMemo}
                            selectableRows
                            persistTableHead
                        />
                    </Col>
                </Row>
                
            </Container>
        </div>
        
    )
}

export default AllChallans