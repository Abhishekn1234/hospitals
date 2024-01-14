
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Department from './Department';
import { useNavigate } from 'react-router-dom';
import { Card, Table, Button, Space, Spin, Modal, message } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import moment from"moment";
const { confirm } = Modal;

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3002/api/departments')
      .then(response => {
        setDepartments(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching departments. Please try again.');
        setLoading(false);
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleAdd = () => {
    setEditingDepartment({
      name: '',
      description: '',
      image: '',
      date: '',
    });
    navigate('/department');
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure you want to delete this department?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3002/api/departments/${id}`)
      .then(() => {
        setDepartments(departments.filter(department => department._id !== id));
      })
      .catch(error => {
        setError('Error deleting department. Please try again.');
        console.error('Error deleting department:', error);
      });
  };

  const handleFormSubmit = (formData, departmentId) => {
    if (editingDepartment) {
      axios.put(`http://localhost:3002/api/departments/${departmentId}`, formData)
        .then(response => {
          setDepartments(departments.map(department => (department._id === response.data._id ? response.data : department)));
          setEditingDepartment(null);
        })
        .catch(error => {
          setError('Error updating department. Please try again.');
          console.error('Error updating department:', error);
        });
    } else {
      axios.post('http://localhost:3002/api/departments', formData)
        .then(response => setDepartments([...departments, response.data]))
        .catch(error => {
          setError('Error adding department. Please try again.');
          console.error('Error adding department:', error);
        });
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Year Founded',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>, 
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text, record) => (
        record.image && (
          <img
            src={`http://localhost:3002/uploads/${record.image}`}
            alt={record.name}
            style={{ maxWidth: '100px',borderRadius:'50%' }}
          />
        )
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Link to={`/profiledepartment/${record._id}`}>
            <Button
              type="default"
              icon={<EyeOutlined />}
            >
              View Profile
            </Button>
          </Link>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => showDeleteConfirm(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card title="Department Management" style={{ backgroundColor: '#f0f2f5', padding: '20px' }}>
      <Spin spinning={loading}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd} style={{ marginBottom: '16px' }}>
          Add Department
        </Button>
        <Table dataSource={departments} columns={columns} rowKey="_id" />
      </Spin>
     
      {editingDepartment && (
        <Department
          onSubmit={(formData) => handleFormSubmit(formData, editingDepartment._id)}
          onCancel={() => setEditingDepartment(null)}
          initialData={editingDepartment}
        />
      )}
    </Card>
  );
};

export default Departments;
