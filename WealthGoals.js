// frontend/src/components/WealthGoals.js

import React, { useState, useEffect } from 'react';
import { Form, Button, ListGroup, Modal } from 'react-bootstrap';

function WealthGoals() {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('wealth_goals')) || [];
    set
