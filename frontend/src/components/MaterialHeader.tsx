import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";

const MaterialHeader = () => {
  const handleLogout = (event: React.MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("NIK");
    window.location.href = "/";
  }
    return (
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/materials">Materials Page</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  };
  
  export default MaterialHeader;