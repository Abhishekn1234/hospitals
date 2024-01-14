import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Card, Button, Table } from 'react-bootstrap';
import { EyeOutlined } from '@ant-design/icons';
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3002/api/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/api/delete_employee/${id}`);
      setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee._id !== id));
      fetchData();
      console.log("deleted successfully");
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const navi = () => {
    navigate('/employee');
  };
   const depart=()=>{
    navigate('/departmentCard')
   }
  const handleUpdate = (id) => {
    try {
      navigate(`/update_employee/${id}`);
    } catch (error) {
      console.error('Error in updating', error);
    }
  };
  const department=(id)=>{
    navigate(`/profileemployee/${id}`)
  }
  return (
    <div style={{ backgroundColor: 'red', color: 'white' }}>
      <br />
      <br />
      <h2>Employee List</h2>
      <Card>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Employee Number</th>
              <th>Age</th>
              <th>Department</th>
              <th>Profile Image</th>
              <th>Profile Description</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.employeeNumber}</td>
                <td>{employee.age}</td>
                <td onClick={depart}>{employee.department}</td>
                <td>
                  {employee.profileImage && (
                    <img
                      src={`http://localhost:3002/uploads/${employee.profileImage}`}
                      alt="Profile"
                      style={{ maxWidth: '50px', maxHeight: '50px',borderRadius:'50%' }}
                    />
                  )}
                </td>
                <td>{employee.profileDescription}</td>
                <td>
                  <Button variant="info" onClick={() => handleUpdate(employee._id)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(employee._id)}>
                    Delete
                  </Button>
                  <Button>
                  <EyeOutlined style={{ fontSize: '24px', color: '#1890ff' }} onClick={()=>department(employee._id)}/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button variant="primary" onClick={navi}>
          Back
        </Button>
      </Card>
    </div>
  );
};

export default EmployeeList;
