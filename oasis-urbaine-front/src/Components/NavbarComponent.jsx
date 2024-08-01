import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';

function NavbarComponent() {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }
    return <>
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
          <Container>
            <Navbar.Brand onClick={() => {navigateTo('/')}}>
              <img src="assets/images/logo-oasis-urbaine.svg" alt="logo de la marque Oasis Urbaine" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ms-auto">
                <Nav.Link onClick={() => {navigateTo('/products')}}>Arbres fruitiers d’intérieur 🍊</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="">
                  <i className="bi bi-person-circle"></i>
                </Nav.Link>
                <Nav.Link href="">
                  <i className="bi bi-basket"></i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
}

export default NavbarComponent
