import React, { useState, useEffect } from 'react';
import axios from 'axios';


const DepartmentP = () => {
 
  const [department, setDepartment] = useState(null);

  useEffect(() => {
    fetchDepartmentDetails();
  }, [department]);

  const fetchDepartmentDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3002/api/department_heads/${department}`);
      setDepartment(response.data);
    } catch (error) {
      console.error('Error fetching department details:', error);
    }
  };

  if (!department) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{department.name} Department</h2>
      {/* Display other department details */}
    </div>
  );
};

export default DepartmentP;
