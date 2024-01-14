import React from 'react';
import { Row, Col } from 'antd';

import EmployeeDepartmentCard from './EmployeeDepartmentCard';
const departments = [
    {
      title: 'Cardiology',
      icon: '❤️',
      image: 'https://media.istockphoto.com/id/1355047107/photo/human-heart-on-science-background-3d-illustration.webp?b=1&s=612x612&w=0&k=20&c=AgY_z78La_AoEorFwYxcd_vdcx0HdRW5PfFzls4MKDE=',
      details: 'Cardiology department deals with the study and treatment of heart disorders.',
    },
]
function Employeecardiology() {
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

export default Employeecardiology
