import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

function AgriNavbar() {
  // This Navbar component provides navigation for the Farm Fresh Store,
  // including links to Shop, Orders, About, Contact, and Cart.
  // It uses Bootstrap for responsive design and accessibility.
  // If your application requires a navigation bar, this component is useful.
  // If you do not need navigation, you can remove this file.

  return (
    <Navbar bg="success" variant="dark" expand="lg" className="mb-0">
      <Container>
        <Navbar.Brand href="/LandingPage">
          � Farm Fresh Store
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#products">🛒 Shop</Nav.Link>
            <Nav.Link href="#orders">📋 Orders</Nav.Link>
            <Nav.Link href="#about">ℹ️ About</Nav.Link>
            <Nav.Link href="#contact">📞 Contact</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#cart">🛍️ Cart (0)</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AgriNavbar;
