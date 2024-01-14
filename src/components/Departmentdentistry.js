import React from 'react';
import { Row, Col } from 'antd';

import DepartmentCard from './DepartmentCard';

const departments = [
    {
        title: 'Dentistry',
        icon: '🦷', 
        image: 'https://cdn.pixabay.com/photo/2013/07/12/15/50/dentistry-150409_640.png',
        details: 'Dentistry department focuses on the basisof dental issues and tooth treatments',
      },
]

function Departmentdentistry() {
  return (
    <div>
      <br/><br/>
    <Row gutter={[16, 16]}>
      {departments.map((department, index) => (
        <Col key={index} xs={24} sm={12} md={8} lg={6}>
          <DepartmentCard {...department} />
        </Col>
      ))}
    </Row>
    </div>
  );
}

export default Departmentdentistry;
