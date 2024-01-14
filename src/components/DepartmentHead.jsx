import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, TextareaAutosize, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const DepartmentHeads = () => {
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    employeeNumber: '',
    age: '',
    profileImage: null,
    profileDescription: '',
    department: 'cardiology', // Default value
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentHeads();
  }, []); // Empty dependency array to run only once on component mount

  const fetchDepartmentHeads = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/department_heads');
      setDepartmentHeads(response.data);
    } catch (error) {
      console.error('Error fetching department heads:', error);
    }
  };

  const handleInputChange = (e) => {
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

  const handleAddHeadSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const formDataForSubmission = new FormData();

      for (const key in formData) {
        formDataForSubmission.append(key, formData[key]);
      }

      const response = await axios.post('http://localhost:3002/api/add_department_head', formDataForSubmission);

      console.log('Added successfully');
      fetchDepartmentHeads();
      navigate('/departmentheadlist'); // Navigate to DepartmentHeadList after adding
    } catch (error) {
      console.error('Error adding department head:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Add/Update Department Head</h2>

      <form onSubmit={handleAddHeadSubmit} encType="multipart/form-data">
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Name:</InputLabel>
          <TextField
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Employee Number:</InputLabel>
          <TextField
            type="text"
            name="employeeNumber"
            value={formData.employeeNumber}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Age:</InputLabel>
          <TextField
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Profile Image:</InputLabel>
          <input type="file" name="profileImage" onChange={handleInputChange} accept="image/*" />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Profile Description:</InputLabel>
          <TextareaAutosize
            name="profileDescription"
            value={formData.profileDescription}
            onChange={handleInputChange}
            minRows={3}
            variant="outlined"
            required
          />
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Department:</InputLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            variant="outlined"
            required
          >
            <MenuItem value="cardiology">Cardiology</MenuItem>
            <MenuItem value="psychology">Psychology</MenuItem>
            <MenuItem value="dentistry">Dentistry</MenuItem>
          </Select>
        </FormControl>

        <Button type="submit" disabled={submitting} variant="contained" color="primary">
          {submitting ? 'Updating...' : 'Add/Update Department Head'}
          
        </Button>
      </form>
    </div>
  );
};

export default DepartmentHeads;
