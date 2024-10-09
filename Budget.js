// src/components/Budget.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [show, setShow] = useState(false);
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [savings, setSavings] = useState('');
  const [error, setError] = useState('');

  const fetchBudgets = () => {
    const token = localStorage.getItem('access_token');
    axios.get('http://localhost:8000/api/budgets/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => setBudgets(response.data))
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    axios.post('http://localhost:8000/api/budgets/', { income, expenses, savings }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        setBudgets([...budgets, response.data]);
        handleClose();
        setIncome('');
        setExpenses('');
        setSavings('');
      })
      .catch(error => {
        setError("حدث خطأ أثناء حفظ البيانات.");
        console.error(error);
      });
  };

  return (
    <div>
      <h2>ميزانيتك</h2>
      <Button variant="primary" onClick={handleShow} className="mb-3">إضافة ميزانية جديدة</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>التاريخ</th>
            <th>الدخل</th>
            <th>المصاريف</th>
            <th>المدخرات</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map(budget => (
            <tr key={budget.id}>
              <td>{budget.date}</td>
              <td>{budget.income}</td>
              <td>{budget.expenses}</td>
              <td>{budget.savings}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>إضافة ميزانية جديدة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formIncome" className="mb-3">
              <Form.Label>الدخل</Form.Label>
              <Form.Control type="number" placeholder="أدخل الدخل" value={income}
                onChange={(e) => setIncome(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formExpenses" className="mb-3">
              <Form.Label>المصاريف</Form.Label>
              <Form.Control type="number" placeholder="أدخل المصاريف" value={expenses}
                onChange={(e) => setExpenses(e.target.value)} required />
            </Form.Group>

            <Form.Group controlId="formSavings" className="mb-3">
              <Form.Label>المدخرات</Form.Label>
              <Form.Control type="number" placeholder="أدخل المدخرات" value={savings}
                onChange={(e) => setSavings(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit">
              حفظ
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Budget;
