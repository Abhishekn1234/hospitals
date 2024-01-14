import React from 'react';
import { Row, Col } from 'antd';

import DepartmentCard from './DepartmentCard';
const departments = [
    {
        title: 'Psychology',
        icon: '🧠',
        image: 'https://media.istockphoto.com/id/1394197496/photo/medically-accurate-illustration-of-a-painful-brain-man-with-a-headache-stoke-blood-clot-in.webp?b=1&s=612x612&w=0&k=20&c=W6m4eAhAaXlzgeI68uQ6FoO7nCql-S6pFl2dyK7y8rY=',
        details: 'Psychology department focuses on understanding and treating mental health issues.',
      },
]
function Departmentpsychology() {

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

export default Departmentpsychology;
