import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, TextareaAutosize, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const UpdateForm = () => {
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

  useEffect(() => {
    fetchDepartmentHeadDetails();
  }, [id]);

  const fetchDepartmentHeadDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/department_heads/${id}`);
      setFormData(response.data); // Assuming the response data matches your form structure
    } catch (error) {
      console.error('Error fetching department head details:', error);
    }
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataForUpdate = new FormData();
      for (const key in formData) {
        formDataForUpdate.append(key, formData[key]);
      }

      // Make a PUT request to update the department head
      await axios.put(`http://localhost:3002/api/update_department_head/${id}`, formDataForUpdate);
      console.log('Updated successfully');

      // Navigate back to the department head list page
      navigate('/departmentheadlist');
    } catch (error) {
      console.error('Error updating department head:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'profileImage') {
      // If the input is for profileImage, update it using files
      setFormData({ ...formData, profileImage: e.target.files[0] });
    } else {
      // Otherwise, update the form data as usual
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <div>
      <h2>Update Department Head</h2>
      <form onSubmit={handleUpdateSubmit} encType="multipart/form-data">
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
          <InputLabel>Profile Image:</InputLabel>
          <input type="file" name="profileImage" onChange={handleInputChange} accept="image/*" />
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

        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateForm;
