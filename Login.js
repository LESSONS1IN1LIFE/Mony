// frontend/src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/token/', {
      username,
      password
    })
    .then(response => {
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      navigate('/budget');
    })
    .catch(error => {
      setError('فشل في تسجيل الدخول. تحقق من البيانات.');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>تسجيل الدخول</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicUsername">
        <Form.Label>اسم المستخدم</Form.Label>
        <Form.Control type="text" placeholder="أدخل اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>كلمة المرور</Form.Label>
        <Form.Control type="password" placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        دخول
      </Button>
    </Form>
  );
}

export default Login;
