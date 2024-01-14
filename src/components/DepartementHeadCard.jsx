import React from 'react';
import { Row, Col } from 'antd';

import EmployeeDepartmentCard from './EmployeeDepartmentCard';

function DepartementHeadCard() {
    const departments = [
        {
          title: 'Cardiology',
          icon: '❤️',
          image: '',
          details: 'Cardiology department deals with the study and treatment of heart disorders.',
        },
        {
          title: 'Orthopedics',
          icon: '🦴',
          image: '',
          details: 'Orthopedics department focuses on the musculoskeletal system and related conditions.',
        },
        {
          title: 'Dentistry',
          icon: '🦷',
          image: '',
          details: 'Dentistry department specializes in oral health and dental care.',
        },
        {
          title: 'Homeopathy',
          icon: '🌿',
          image: '',
          details: 'Homeopathy department uses natural remedies to stimulate the body\'s healing processes.',
        },
      ];
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

export default DepartementHeadCard
