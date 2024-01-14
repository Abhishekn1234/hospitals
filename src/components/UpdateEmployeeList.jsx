import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    employeeNumber: '',
    age: '',
    profileDescription: '',
    department: '',
    profileImage: null,
  });

  const fetchEmployee = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/employee/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchEmployee();
  }, [fetchEmployee]);

  const handleInputChange = (e) => {
    if (e.target.name === 'profileImage') {
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpdate = new FormData();
      for (const key in formData) {
        formDataForUpdate.append(key, formData[key]);
      }

      await axios.put(`http://localhost:3002/api/update_employee/${id}`, formDataForUpdate);
      console.log('Updated successfully');
      navigate('/employeelist');
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="formName">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formEmployeeNumber">
          <Form.Label>Employee Number:</Form.Label>
          <Form.Control type="text" name="employeeNumber" value={formData.employeeNumber} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formAge">
          <Form.Label>Age:</Form.Label>
          <Form.Control type="number" name="age" value={formData.age} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formProfileDescription">
          <Form.Label>Profile Description:</Form.Label>
          <Form.Control as="textarea" name="profileDescription" value={formData.profileDescription} onChange={handleInputChange} required />
        </Form.Group>

        <Form.Group controlId="formProfileImage">
          <Form.Label>Profile Image:</Form.Label>
          <Form.Control type="file" name="profileImage" onChange={handleInputChange} accept="image/*" />
        </Form.Group>

        <Form.Group controlId="formDepartment">
          <Form.Label>Department:</Form.Label>
          <Form.Control as="select" name="department" value={formData.department} onChange={handleInputChange} required>
            <option value="cardiology">Cardiology</option>
            <option value="psychology">Psychology</option>
            <option value="dentistry">Dentistry</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default UpdateEmployee;
