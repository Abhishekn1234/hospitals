import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';



function ProfileDepartment() {
    const [Department, setDepartment] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        fetchProfileDetails();
    }, [id]);
    const fetchProfileDetails=async()=>{
        try{
          const response=await axios.get(`http://localhost:3002/api/departments/${id}`)  
           setDepartment(response.data);
        }catch(error){
            console.error('Error fetching profile details:', error);
        }
      }
      const goBack = () => {
        navigate('/departments');
      };
  return (
    <div>
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
                {Department.date}
              </Typography>
              <Typography variant="h5" component="div">
                {Department.name}
              </Typography>
              <Typography variant="h5" component="div">
                {Department.description}
              </Typography>
              {Department.image && (
                <img
                  src={`http://localhost:3002/uploads/${Department.image}`}
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
    </div>
  );
}

export default ProfileDepartment;
