import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Input, DatePicker, Upload, Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DepartmentForm = ({ onSubmit, onCancel, initialData }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFile(e.file);
  };

  const onFinish = async (values) => {
    try {
      setSubmitting(true);
  
      const formDataWithFile = new FormData();
      formDataWithFile.append('date', values.date.format('YYYY-MM-DD'));
      formDataWithFile.append('name', values.name);
      formDataWithFile.append('description', values.description);
  
      if (file) {
        formDataWithFile.append('image', file.originFileObj);
      }
  
      const response = await axios.post('http://localhost:3002/api/departments', formDataWithFile);
  
      console.log('Form submitted successfully:', response);
  
      form.resetFields();
      setFile(null);
  
      navigate('/departments');
      if (onSubmit) {
        onSubmit(response.data);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
  
      setError('Error submitting form. Please try again.');
  
      if (onSubmit) {
        onSubmit(null, error);
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  return (
    <Card title="Department Form">
      <Form
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item
          label="Year founded"
          name="date"
          rules={[{ required: true, message: 'Please select a date!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="Description Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: 'Please upload an image!' }]}
        >
          <Upload
            beforeUpload={beforeUpload}
            onChange={handleChange}
            showUploadList={false}
          >
            <Button icon={<PlusOutlined />} disabled={submitting}>Upload Image</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          label="Description Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            {submitting ? 'Submitting...' : 'Save'}
          </Button>
          <Button type="default" onClick={onCancel} disabled={submitting} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default DepartmentForm;
