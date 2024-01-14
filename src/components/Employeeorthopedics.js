import React from 'react';
import { Row, Col } from 'antd';

import EmployeeDepartmentCard from './EmployeeDepartmentCard';
const departments = [
    {
        title: 'Orthopedics',
        icon: '🦴',
        image: 'https://media.istockphoto.com/id/653355740/photo/male-feeling-the-neck-pain.jpg?s=2048x2048&w=is&k=20&c=GzunPigMMQd0RVRUhfyLzUm-0NrPCDuXjjtTMNXI7GE=',
        details: 'Orthopedics department focuses on the musculoskeletal system and related conditions.',
      },   
]
function Employeeorthopedics() {
  return (
    <div>
       <br/><br/>
      <Row gutter={[16, 16]}>
      {departments.map((department, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <EmployeeDepartmentCard  {...department} />
        </Col>
      ))}
    </Row>
    </div>
  )
}

export default Employeeorthopedics
