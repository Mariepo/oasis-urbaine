import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {Container, Nav, Navbar} from 'react-bootstrap';
import AuthContext from '../Context/AuthContext';
import CartContext from '../Context/CartContext';

function NavbarComponent() {
  const {isAuthenticated, isAdmin} = useContext(AuthContext);
  const {cartItems} = useContext(CartContext);
  const cartItemsQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }
  const isActive = (route) => location.pathname === route;

    return <>
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
          <Container>
            <Navbar.Brand onClick={() => {navigateTo('/')}} className='cursor-pointer'>
              <img src="assets/images/logo-oasis-urbaine.svg" alt="logo de la marque Oasis Urbaine" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className={`mt-2 px-lg-3 ${isActive('/') ? 'active' : ''}`} onClick={() => {navigateTo('/')}}>Accueil</Nav.Link>
                <Nav.Link className={`mt-2 px-lg-3 ${isActive('/products') ? 'active' : ''}`} onClick={() => {navigateTo('/products')}}>Boutique</Nav.Link>
                {isAdmin && 
                  <>
                    <Nav.Link className={`mt-2 px-3 ${isActive('/products-management') ? 'active' : ''}`} onClick={() => {navigateTo('/products-management')}}>Gestion des produits</Nav.Link>
                    <Nav.Link className={`mt-2 px-3 ${isActive('/categories-management') ? 'active' : ''}`} onClick={() => {navigateTo('/categories-management')}}>Gestion des categories</Nav.Link>
                  </>
                }
              </Nav>
              <Nav>
                {isAuthenticated ? 
                <>
                  <Nav.Link className={`px-lg-3 ${isActive('/account') ? 'active' : ''}`} onClick={() => {navigateTo('/account')}}>
                    <i className="bi bi-person-circle"></i>
                  </Nav.Link>
                </> : 
                <>
                  <Nav.Link className={`px-lg-3 ${isActive('/login') ? 'active' : ''}`} onClick={() => {navigateTo('/login')}}>
                    <i className="bi bi-person-circle"></i>
                  </Nav.Link>
                </>}
                <Nav.Link className={`${isActive('/cart') ? 'active' : ''}`} onClick={() => {navigateTo('/cart')}}>
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
