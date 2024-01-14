
import React from 'react';
import {  Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import {  MailOutlined, PhoneOutlined } from '@ant-design/icons';

import LocationPicker from './LocationPicker';

const { Header } = Layout;

const MyNavbar = () => {
 
  

  

  

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['10']}>
          <Menu.Item key="1">
            <Link to="/" style={{listStyleType:"none"}}>Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/department">Department</Link>
          </Menu.Item>
          
          <Menu.Item key="4">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/employee">Employees</Link>
          </Menu.Item>
         
          <Menu.Item key="5">
            <Link to="/departmenthead">Department Heads</Link>
          </Menu.Item>
          <Menu.Item key="6">
            <PhoneOutlined /> Call
            <Link to="tel:+123456789"></Link>
          </Menu.Item>
          <Menu.Item key="7">
            <MailOutlined /> Email
            <Link to="mailto:your-email@example.com"></Link>
          </Menu.Item>
          <Menu.Item key="8">
            <LocationPicker  />
          </Menu.Item>
         
        </Menu>
      </Header>
    </Layout>
  );
};

export default MyNavbar;
