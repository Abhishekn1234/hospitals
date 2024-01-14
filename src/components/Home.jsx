import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Image, Button, Row, Col, Typography, Space } from 'antd';
import {
  UnorderedListOutlined,
  TeamOutlined,
  ContactsOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const logout = () => {
    navigate('/login');
  };

  return (
    <Layout>
      <Header className="header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="https://www.freepnglogos.com/uploads/plus-icon/practice-index-plus-practice-management-blog-29.png"
            alt="s"
            preview={false}
            width={30}
            onClick={goToDashboard}
            style={{ marginRight: '20px' }}
          />

          <Link to="/departments" style={{ margin: '0 20px' }}>
            <UnorderedListOutlined />
            Department
          </Link>

          <Link to="/employeelist" style={{ margin: '0 20px' }}>
            <TeamOutlined />
            Employees
          </Link>

          <Link to="/departmentheadlist" style={{ margin: '0 20px' }}>
            <TeamOutlined />
            Department Head
          </Link>

          <Link to="/contact" style={{ margin: '0 20px' }}>
            <ContactsOutlined />
            Contact Us
          </Link>
          <Button onClick={logout} icon={<LogoutOutlined />} style={{ marginLeft: 'auto' }}>
          Log out
        </Button>
        </div>
        
      </Header>

      <Content style={{ padding: '24px', minHeight: '80vh' }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2}>Welcome to Hospital Manager</Title>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Paragraph>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod mauris vitae
              rhoncus dapibus. Proin tincidunt tristique mi eu efficitur. Suspendisse nec sodales
              massa. Duis et justo vel orci bibendum malesuada. Sed auctor, libero vel auctor
              sollicitudin, nunc tortor aliquam mi, ut tincidunt mauris nisl vel lectus.
            </Paragraph>
            <Paragraph>
              Integer vel volutpat quam. Aliquam ac justo nec nisl tincidunt auctor. Fusce vel
              interdum quam. Phasellus at justo a purus aliquam ullamcorper. Nunc ut dictum elit.
              Sed vestibulum aliquam ipsum, nec cursus erat consectetur vel.
            </Paragraph>
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Title level={3}>Important Information</Title>
            <Paragraph>
              Quisque eu metus sit amet tortor venenatis fermentum. Sed vel est vel orci sodales
              fermentum. Integer nec elit a orci ultrices bibendum. Integer vulputate hendrerit
              bibendum. Ut vitae sem ut lectus volutpat tristique vitae a massa. Nunc euismod
              cursus est, non tristique ex rhoncus a. Sed id orci et metus luctus ullamcorper.
            </Paragraph>
          </Col>
          <Col span={12}>
            <Title level={3}>Upcoming Events</Title>
            <Space direction="vertical">
              <Paragraph>Event 1 - Lorem ipsum dolor sit amet</Paragraph>
              <Paragraph>Event 2 - Consectetur adipiscing elit</Paragraph>
              <Paragraph>Event 3 - Sed euismod mauris vitae rhoncus dapibus</Paragraph>
            </Space>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Home;
