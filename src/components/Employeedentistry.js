import React from 'react';
import { Row, Col } from 'antd';

import EmployeeDepartmentCard from './EmployeeDepartmentCard';
const departments=[
{
    title: 'Dentistry',
    icon: '🦷',
    image: 'https://cdn.pixabay.com/photo/2016/09/14/20/50/tooth-1670434_1280.png',
    details: 'Dentistry department specializes in oral health and dental care.',
  },
]
function Employeedentistry() {
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

export default Employeedentistry
