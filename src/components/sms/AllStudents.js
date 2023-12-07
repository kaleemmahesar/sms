import React, { useState, useMemo, useRef } from 'react'
import { Col, Container, Row, Table, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { IoEye } from 'react-icons/io5'
import { CiEdit } from 'react-icons/ci'
import { BsPostcard } from 'react-icons/bs'
import { TbReportMoney } from 'react-icons/tb'
import { TbReportAnalytics } from 'react-icons/tb'
import { searchByStudentName , searchStudentsByClass} from '../../features/sms/smsSlice';


const AllStudents = () => {
    const { loading, error, students, studentsContainer } = useSelector((state) => state.sms)
    const fieldValue = useRef();
    const [filterText, setFilterText] = React.useState('');
	const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const [filterClass, setFilterClass] = React.useState('');
    const dispatch = useDispatch();
	const columns = [
        {
            name: 'Roll Number',
            selector: row => row.id,
        },
        {
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: "Father's Name",
            selector: row => row.fname,
        },
        {
            name: 'Caste',
            selector: row => row.caste,
        },
        {
            name: 'Class',
            selector: row => row.class,
        },
        {
            name: 'Section',
            selector: row => row.section,
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="sms-actions-button">
                    <Link to={`/sms/view-student/${row.id}`} className="btn btn-primary" title="View Student"><IoEye /></Link>
                    <Link to={`/sms/edit-student/${row.id}`} className="btn btn-primary" title="Update Student"><CiEdit /></Link>
                    <Link to={`/sms/generate-certificate/${row.id}`} className="btn btn-primary" title="Generate Certificate"><BsPostcard /></Link>
                    <Link to={`/sms/generate-fees/${row.id}`} className="btn btn-primary" title="Generate Fees Challan"><TbReportMoney /></Link>
                    <Link to={`/sms/generate-marksheet/${row.id}`} className="btn btn-primary" title="Generate Marksheet"><TbReportAnalytics /></Link>
                </div>
            ),
        }
    ];
    
    const focusSearchInput = (e) => {
        dispatch(searchByStudentName(e.target.value))
    };
    const showByClassName = (getClass) => {
        dispatch(searchStudentsByClass(getClass))
    }
    
    const subHeaderComponentMemo = React.useMemo(() => {
		const handleClear = () => {
			if (filterText) {
				setResetPaginationToggle(!resetPaginationToggle);
			}
		};

		return (
            <Row>
                <Col className="col-md-6">
                    <Form.Control onChange={focusSearchInput} ref={fieldValue} onClear={handleClear} placeholder="Search by Name..." />
                </Col>
                <Col className="col-md-6">
                    <Form.Select aria-label="Default select example" name="class" onChange={(e) => showByClassName(e.target.value)}>
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
            </Row>
		);
	}, [resetPaginationToggle]);

    return (
        <div className="add-student">
            <Container fluid>
                <Row>
                    <Col className="mt-5 d-flex justify-content-end" as={Col}>
                        <Link to="/sms/add-student" className="btn btn-info">Add New Student</Link>
                    </Col>
                </Row>
                <Row>
                    <Col as={Col}>
                        <DataTable
                            title="Students List"
                            columns={columns}
                            data={students}
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

export default AllStudents