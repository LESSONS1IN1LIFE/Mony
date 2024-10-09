// frontend/src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const isAuthenticated = localStorage.getItem('access_token');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">FinanceApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {isAuthenticated && <Nav.Link as={Link} to="/budget">ميزانيتي</Nav.Link>}
          </Nav>
          <Nav>
            {!isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/login">تسجيل الدخول</Nav.Link>
                <Nav.Link as={Link} to="/register">إنشاء حساب</Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={handleLogout}>تسجيل الخروج</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;

