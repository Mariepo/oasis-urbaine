import React, { useState, useContext } from 'react'
import UsersService from '../Services/UsersService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';
import {Container, Button, Form, Row, Col} from 'react-bootstrap';


function SignupPage() {
  const [user, setUser] = useState({
    name: '',           
    firstname: '',     
    email: '',          
    password: '',       
    phone: '',          
    address: '',       
    postal_code: '',   
    city: ''            
  });  
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const {setIsAuthenticated, setToken, setIsAdmin} = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }

  const handleChange = (event) => {
    const {name, value} = event.currentTarget;
    setUser({...user, [name] : value});
  }
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const signup = async (event) => {
    event.preventDefault();

    // Taille minimum du mot de passe
    if (user.password.length < 6) {
      toast.error('Le mot de passe doit comporter au moins 6 caractères');
      return; 
    }

    // Vérifier que les mots de passe concordent
    if (user.password !== confirmPassword) {
      toast.error('Les mots de passe ne correspondent pas');
      return; 
    }

    try {
      await UsersService.signupUser(user);
      const token = await UsersService.loginUser(user);
      toast.success(`Compte créé avec succès ! Bienvenue ${user.firstname} 🌿`);
      window.localStorage.setItem('authToken', token.data.token);
      setIsAuthenticated(true);
      setToken(token.data.token);
      setIsAdmin(UsersService.isAdmin()); 
      navigateTo('/');
    } catch (error) {
      toast.error('Erreur lors de la création du compte')
      console.log(error);
    }
  }

  return <>
    <Container fluid className='login-image-container'>
      <div className=' d-flex align-items-center my-5'>
        <Form onSubmit={signup} method='post' className='col-12 col-md-10 col-lg-6 mx-auto d-flex flex-column my-5 signup-form'>
            <h1 className='text-center mb-5'>Inscription</h1>
            <fieldset>
              <p className='form-title'>Coordonnées</p>
              <Row>
                <Col className='col-12 col-md-6'>
                    <Form.Group className="mb-4" controlId="firstname">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control type="text" name="firstname" placeholder="Prénom" onChange={handleChange} value={user.firstname} required />
                    </Form.Group>            
                </Col>
                <Col className='col-12 col-md-6'>
                    <Form.Group className="mb-4" controlId="name">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control type="text" name="name" placeholder="Nom" onChange={handleChange} value={user.name} required />
                    </Form.Group>            
                </Col>
              </Row>
              <Row>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} value={user.email} required />
                  </Form.Group>
                </Col>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="phone">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control type="phone" name="phone" placeholder="Téléphone" onChange={handleChange} value={user.phone} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} value={user.password} required />
                    <Form.Text className="text-muted">
                      Minimum 6 caractères
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="confirm_password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" name="confirm_password" onChange={handleConfirmPasswordChange} value={confirmPassword} required />
                  </Form.Group>
                </Col>
              </Row>
            </fieldset>
            <fieldset className='mt-5 mb-2'>
              <p className='form-title'>Adresse de livraison</p>
              <Form.Group className="mb-4" controlId="address">
                  <Form.Label>Adresse</Form.Label>
                  <Form.Control type="text" name="address" placeholder="Adresse" onChange={handleChange} value={user.address} required />
              </Form.Group>
              <Row>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="postal_code">
                      <Form.Label>Code postal</Form.Label>
                      <Form.Control type="text" name="postal_code" placeholder="Code postal" onChange={handleChange} value={user.postal_code} required />
                  </Form.Group>            
                </Col>
                <Col className='col-12 col-md-6'>
                  <Form.Group className="mb-4" controlId="city">
                      <Form.Label>Ville</Form.Label>
                      <Form.Control type="text" name="city" placeholder="Ville" onChange={handleChange} value={user.city} required />
                  </Form.Group>            
                </Col>
              </Row>
            </fieldset>
            <Button variant="primary" type="submit">Créer un compte</Button>
            <Button variant="link" onClick={() => {navigateTo('/login')}} className='py-4 text-decoration-underline'>Se connecter</Button>
        </Form>
        </div>
    </Container>
  </>
  
}

export default SignupPage
