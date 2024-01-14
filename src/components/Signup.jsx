import React, { useState } from 'react';

import { Form, Input, Button, Row, Col, Alert } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async (values) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3002/register", {
        username: values.username,
        email: values.email,
        password: values.password,
      });

      console.log(response.data);
      navigate('/login');
      if (response.data.user === "Successfully registered") {
        console.log("Registration successful");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('User with the same email or username already exists. Please use a different email or username.');
      } else {
        console.error(error);
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
       <h1>Sign Up</h1>
    
    <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
     
      <Col xs={24} sm={16} md={12} lg={8}>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={handleSignup}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please enter your username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Invalid email address!' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          </Form.Item>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: '16px' }} />}

          <Form.Item>
            <p>
              Already a user? <Link to="/login">Login</Link>
            </p>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    </div>
  );
};

export default Signup;
