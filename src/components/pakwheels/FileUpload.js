import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const FileUpload = () => {
    const [file, setFile] = useState()
    const preset_key = "react-pakwheels"
    const cloud_name = "dbrgkbhcm"
    

    function handleUpload() {
        console.log(file)
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', preset_key)
        formData.append('cloud_name', 'dbrgkbhcm')
        console.log(formData)
        fetch(
            `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
            {
                method: "POST",
                body: formData
            }
        ).then((response) => response.json()).then(
            (result) => {
                console.log('success', result)
            }
        ).catch(error => {
            console.error("Error:", error)
        })
    }

    return (
        <Form>
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])   } />
            </Form.Group>
            <Button variant="primary" onClick={handleUpload}>Upload Car</Button>
        </Form>
    )
}

export default FileUpload
