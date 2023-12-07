import React, { useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllStudents from './AllStudents';
import AddStudent from './AddStudent';
import StudentMarksheet from './StudentMarksheet';
import StudentChallan from './StudentChallan';
import AllChallans from './AllChallans';
import Login from './Login';
import SmsDashboard from './SmsDashboard';


const SmsApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/sms" element={<Login />} />
                <Route path="/sms/sms-dashboard" element={<SmsDashboard />} />
                <Route path="/sms/all-students" element={<AllStudents />} />
                <Route path="/sms/add-student" element={<AddStudent />} />
                <Route path="/sms/view-student/:id" element={<AddStudent />} />
                <Route path="/sms/edit-student/:id" element={<AddStudent />} />
                <Route path="/sms/generate-certificate/:id" element={<AddStudent />} />
                <Route path="/sms/generate-fees/:id" element={<StudentChallan />} />
                <Route path="/sms/generate-marksheet/:id" element={<StudentMarksheet />} />
                <Route path="/sms/allchallans" element={<AllChallans />} />
            </Routes>
        </BrowserRouter>
    )
}

export default SmsApp
