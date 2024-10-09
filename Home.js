// frontend/src/components/Home.js

import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center">
      <h1>مرحبا بك في FinanceApp</h1>
      <p>حقق أهدافك المالية وتعلم كيفية إدارة ميزانيتك بفعالية.</p>
      <Button variant="primary" as={Link} to="/register">ابدأ الآن</Button>
    </div>
  );
}

export default Home;
