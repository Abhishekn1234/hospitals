
import React, { useState } from 'react';
import { Card, Button, Modal } from 'antd';

const { Meta } = Card;

function EmployeeDepartmentCard({ title, icon, image, details }) {
    const [showModal, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);
  return (
    <div>
      <Card
        hoverable
        style={{ width: '300px', marginBottom: '16px' }}
        cover={<img alt={title} src={image} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />}
      >
        <Meta
          title={
            <span>
              {title} {icon}
            </span>
          }
          description={details}
        />
        <Button type="primary" onClick={handleModalShow} style={{ marginTop: '8px' }}>
          Learn More
        </Button>

        <Modal title={`${title} Department`} visible={showModal} onCancel={handleModalClose} footer={null}>
          <img alt={title} src={image} style={{ width: '100%', height: '300px', objectFit: 'cover' }} />
          <p>{details}</p>
        </Modal>
      </Card>
    </div>
  )
}

export default EmployeeDepartmentCard
