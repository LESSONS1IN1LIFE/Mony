// frontend/src/components/FinancialAdvice.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Alert } from 'react-bootstrap';

function FinancialAdvice() {
  const [budget, setBudget] = useState(null);
  const [advice, setAdvice] = useState('');

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    axios.get('http://localhost:8000/api/budgets/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (response.data.length > 0) {
        const latestBudget = response.data[response.data.length - 1];
        setBudget(latestBudget);
        generateAdvice(latestBudget);
      }
    })
    .catch(error => console.error(error));
  }, [token]);

  const generateAdvice = (budget) => {
    const { income, expenses, savings } = budget;
    let adviceText = '';

    if (expenses > income) {
      adviceText += 'المصاريف تتجاوز الدخل. حاول تقليل المصاريف أو زيادة الدخل.\n';
    } else {
      adviceText += 'أنت تدخر جزءًا جيدًا من دخلك. استمر على هذا المنوال.\n';
    }

    if (savings < income * 0.2) {
      adviceText += 'حاول زيادة المدخرات إلى 20% على الأقل من دخلك.\n';
    }

    setAdvice(adviceText);
  };

  return (
    <div className="mt-5">
      <h3>نصائح مالية</h3>
      {advice ? (
        <Card>
          <Card.Body>
            {advice.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="info">لم يتم العثور على بيانات ميزانية لتحليلها.</Alert>
      )}
    </div>
  );
}

export default FinancialAdvice;
