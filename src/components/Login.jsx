import React, { useState } from 'react';

import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3002/login', {
        email: values.email,
        password: values.password,
      });

      console.log(response);
      navigate('/home');
      if (response === "Login successful") {
        console.log("Login successful");
      }
    } catch (error) {
      console.error(error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
   <div>
    <h1>Login</h1>
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
       
      <Col xs={24} sm={16} md={12} lg={8}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Invalid email address!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Login
            </Button>
          </Form.Item>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}

          <Form.Item>
            <p>
              Create an Account <Link to="/register">Register</Link>
            </p>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </div>
  );
};

export default Login;
