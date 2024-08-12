import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import AuthContext from '../Context/AuthContext';
import CartContext from '../Context/CartContext';

function NavbarComponent() {
  const {isAuthenticated} = useContext(AuthContext);
  const {cartItems} = useContext(CartContext);
  const cartItemsQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  console.log(cartItemsQuantity);

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
                {isAuthenticated ? 
                <>
                  <Nav.Link onClick={() => {navigateTo('/account')}}>
                    <i className="bi bi-person-circle"></i>
                    <p>mon compte</p>
                  </Nav.Link>
                </> : 
                <>
                  <Nav.Link onClick={() => {navigateTo('/login')}}>
                    <i className="bi bi-person-circle"></i>
                  </Nav.Link>
                </>}
                <Nav.Link onClick={() => {navigateTo('/cart')}}>
                  <i className="bi bi-basket"></i> 
                  <span className='ms-2'>{cartItemsQuantity}</span>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        </>
}

export default NavbarComponent
