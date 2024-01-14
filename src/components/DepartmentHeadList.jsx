import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import { EyeOutlined } from '@ant-design/icons';

const DepartmentHeadList = () => {
  const [departmentHeads, setDepartmentHeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartmentHeads();
  }, []);

  const fetchDepartmentHeads = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/department_heads`);
      setDepartmentHeads(response.data);
    } catch (error) {
      console.error('Error fetching department heads:', error);
    }
  };

  const handleUpdateHead = (id) => {
    navigate(`/updateform/${id}`);
  };

  const add = () => {
    navigate('/departmenthead');
  };
  const department =(id)=>{
    navigate(`/profilehead/${id}`);
  }
  const dep=()=>{
    navigate('/departmentpage');
  }
  const handleDeleteHead = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/delete_department_head/${id}`);
      console.log('Deleted successfully');
      fetchDepartmentHeads();
    } catch (error) {
      console.error('Error deleting department head:', error);
    }
  };

  return (
    <div>
      <h2>Department Head List</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Employee Number</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Profile Description</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Profile Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departmentHeads.map((head) => (
              <TableRow key={head._id}>
                <TableCell >{head.name}</TableCell>
                <TableCell>{head.employeeNumber}</TableCell>
                <TableCell>{head.age}</TableCell>
                <TableCell>{head.profileDescription}</TableCell>
                <TableCell onClick={dep}>{head.department}</TableCell>
                <TableCell>
                  {head.profileImage && (
                    <img
                      src={`http://localhost:3002/uploads/${head.profileImage}`}
                      alt="Profile"
                      style={{ maxWidth: '50px', maxHeight: '50px',borderRadius:'50%'}}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleUpdateHead(head._id)} startIcon={<UpdateIcon />} variant="contained">
                    Update
                  </Button>
                  <Button onClick={() => handleDeleteHead(head._id)} startIcon={<DeleteIcon />} variant="contained">
                    Delete
                  </Button>
                  <Button>
                  <EyeOutlined style={{ fontSize: '24px', color: '#1890ff' }} onClick={() => department(head._id)}/></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" color="secondary" onClick={add}>
        Back
      </Button>
    </div>
  );
};

export default DepartmentHeadList;
