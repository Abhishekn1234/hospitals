import React from 'react';
import { Row, Col } from 'antd';

import DepartmentCard from './DepartmentCard';

const departments = [
  {
    title: 'Cardiology',
    icon: '❤️',
    image: 'https://media.istockphoto.com/id/886541828/photo/human-heart.jpg?s=2048x2048&w=is&k=20&c=oMISOzfvuD-SoMK8-doAG26EyQK6vUJOnqs-38RD65Y=',
    details: 'Cardiology department deals with the study and treatment of heart disorders.',
  },
]

function Departmentcardiology() {
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
  )
}

export default Departmentcardiology
