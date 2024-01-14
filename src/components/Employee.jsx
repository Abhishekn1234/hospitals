import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const AddEmployee = () => {
  const [Employee, setemployee] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    employeeNumber: '',
    age: '',
    profileImage: null,
    profileDescription: '',
    department: 'cardiology',
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentHeads();
  }, []);

  const fetchDepartmentHeads = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/employee');
      setemployee(response.data);
    } catch (error) {
      console.error('Error fetching department heads:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImage: selectedFile,
        }));
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const formDataForSubmission = new FormData();

      for (const key in formData) {
        formDataForSubmission.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:3002/api/post_employee', formDataForSubmission);
      console.log(response);
      fetchDepartmentHeads();
      navigate('/employeelist');
      console.log('added successfully');
    } catch (error) {
      console.error('Error adding employee:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formEmployeeNumber">
          <Form.Label>Employee Number:</Form.Label>
          <Form.Control type="text" name="employeeNumber" value={formData.employeeNumber} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age:</Form.Label>
          <Form.Control type="text" name="age" value={formData.age} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formProfileDescription">
          <Form.Label>Profile Description:</Form.Label>
          <Form.Control as="textarea" name="profileDescription" value={formData.profileDescription} onChange={handleChange} />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department:</Form.Label>
          <Form.Control as="select" name="department" value={formData.department} onChange={handleChange}>
            <option value="cardiology">Cardiology</option>
            <option value="orthopedics">Orthopedics</option>
            <option value="dentistry">Dentistry</option>
            <option value="homeo">Homeo</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile Image:</Form.Label>
          <Form.Control type="file" name="profileImage" onChange={handleChange} />
        </Form.Group>

        <Button type="submit" disabled={submitting}>
          {submitting ? 'Updating...' : 'Add Employees'}
        </Button>
      </Form>
    </Container>
  );
};

export default AddEmployee;
