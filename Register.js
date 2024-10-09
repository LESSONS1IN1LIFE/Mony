// frontend/src/components/Register.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/users/', {
      username,
      email,
      password
    })
    .then(response => {
      navigate('/login');
    })
    .catch(error => {
      setError('فشل في إنشاء الحساب. حاول مرة أخرى.');
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>إنشاء حساب</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group controlId="formBasicUsername">
        <Form.Label>اسم المستخدم</Form.Label>
        <Form.Control type="text" placeholder="أدخل اسم المستخدم" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>البريد الإلكتروني</Form.Label>
        <Form.Control type="email" placeholder="أدخل البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>كلمة المرور</Form.Label>
        <Form.Control type="password" placeholder="أدخل كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3">
        تسجيل
      </Button>
    </Form>
  );
}

export default Register;
