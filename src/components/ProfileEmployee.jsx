import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';


function ProfileEmployee() {
    const [employeeDetails, setEmployeeDetails] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchProfileDetails();
      }, [id]);
    const fetchProfileDetails = async () => {
    try {
        const response = await axios.get(`http://localhost:3002/api/employee/${id}`);
        setEmployeeDetails(response.data);
        } catch (error) {
          console.error('Error fetching profile details:', error);
        }
      };
    
      const goBack = () => {
        navigate('/employeelist');
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
            {employeeDetails.profileImage && (
                <img
                  src={`http://localhost:3002/uploads/${employeeDetails.profileImage}`}
                  alt="Profile"
                  style={{ maxWidth: '100px', maxHeight: '100px' }}
                />
              )}
              <Typography variant="h5" component="div">
                {employeeDetails.name}
              </Typography>
              <Typography color="text.secondary">Employee Number: {employeeDetails.employeeNumber}</Typography>
              <Typography color="text.secondary">Age: {employeeDetails.age}</Typography>
              <Typography color="text.secondary">Profile Description: {employeeDetails.profileDescription}</Typography>
              <Typography color="text.secondary">Department: {employeeDetails.department}</Typography>
              <br/>
              <Button variant="contained" color="secondary" onClick={goBack}>
            Back
          </Button>
            </CardContent>
          </Card>
          
        </Box>
      );
    };
    export default ProfileEmployee;