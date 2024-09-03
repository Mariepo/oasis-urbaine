import React, { useState, useContext } from 'react';
import UsersService from '../Services/UsersService';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../Context/AuthContext';
import {Container, Button, Form} from 'react-bootstrap';


const LoginPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });   
    const {setIsAuthenticated, setToken, setIsAdmin} = useContext(AuthContext);
    const navigate = useNavigate();
    const navigateTo = (route) => {
        navigate(route);
        window.scrollTo(0,0);
    }
    const location = useLocation();

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setUser({...user, [name] : value})
    }

    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const token = await UsersService.loginUser(user);
            if (token.data.token) {
                UsersService.setAxiosToken(token.data.token);
                window.localStorage.setItem('authToken', token.data.token);
                setIsAuthenticated(true);
                setToken(token.data.token);
                setIsAdmin(UsersService.isAdmin()); 
                toast.success("Vous êtes bien connecté");
                const redirectTo = location.state?.from || '/';
                navigateTo(redirectTo);
            } 
        } catch (error) {
            toast.error("Identifiants incorrects");
            console.log(error);
        }
    }
    return <>
        <Container fluid className='vh-100  login-image-container'>
            <div className=' d-flex align-items-center my-5'>
                <Form onSubmit={loginUser} method='post' className='col-12 col-md-8 col-lg-4 mx-auto d-flex flex-column login-form'>
                    <h1 className='text-center my-4'>Connexion</h1>
                    <Form.Group className="mb-4" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} value={user.email} required />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Mot de passe</Form.Label>
                        <Form.Control type="password" name="password" onChange={handleChange} value={user.password} required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Se connecter</Button>
                    <Button variant="link" onClick={() => {navigateTo('/signup')}} className='py-4 text-decoration-underline'>Créer un compte</Button>
                </Form>
            </div>
        </Container>
    </>
}

export default LoginPage
