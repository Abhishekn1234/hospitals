import React from 'react';
import { Row, Col } from 'antd';

import EmployeeDepartmentCard from './EmployeeDepartmentCard';
const departments = [
    {
        title: 'Homeopathy',
        icon: '🌿',
        image: 'https://media.istockphoto.com/id/466628811/photo/alternative-medicine.webp?b=1&s=612x612&w=0&k=20&c=EWmuOFcy09N7iLoEz0Ddhko2BXLwpRT2Z0Ub89Kl8v8=',
        details: 'Homeopathy department uses natural remedies to stimulate the body\'s healing processes.',
      },
]
function EmployeeHomeo() {
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

export default EmployeeHomeo
