import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';

const ProfileHead = () => {
  const [headDetails, setHeadDetails] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileDetails();
  }, [id]);

  const fetchProfileDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/department_heads/${id}`);
      setHeadDetails(response.data);
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const goBack = () => {
    navigate('/departmentheadlist');
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      backgroundColor="blue"
    >
      <Card style={{ width: '300px', height: '300px',backgroundColor:"red",color:"black" }}>
        <CardContent>
          <Typography variant="h5" component="div">
            {headDetails.name}
          </Typography>
          <Typography color="text.secondary">Employee Number: {headDetails.employeeNumber}</Typography>
          <Typography color="text.secondary">Age: {headDetails.age}</Typography>
          <Typography color="text.secondary">Profile Description: {headDetails.profileDescription}</Typography>
          <Typography color="text.secondary">Department: {headDetails.department}</Typography>
          {headDetails.profileImage && (
            <img
              src={`http://localhost:3002/uploads/${headDetails.profileImage}`}
              alt="Profile"
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          )}<br/>
          <Button variant="contained" color="secondary" onClick={goBack}>
        Back
      </Button>
        </CardContent>
      </Card>
      
    </Box>
  );
};

export default ProfileHead;
