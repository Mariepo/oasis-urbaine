import React, { useState, useContext } from 'react';
import UsersService from '../Services/UsersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../Context/AuthContext';
import {Container, Button, Form} from 'react-bootstrap';


const LoginPage = () => {
    const [user, setUser] = useState({ email: '', password: '' });   
    const {setIsAuthenticated, setToken} = useContext(AuthContext);
    const navigate = useNavigate();

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
                toast.success("Vous êtes bien connecté");
                navigate('/');
            } 
        } catch (error) {
            toast.error("Identifiants incorrects");
            console.log(error);
        }
    }


    return <>
        {/* <form>
            <input type="text" name="email" id="email" placeholder='Votre email' onChange={handleChange} value={user.email} />
            <input type="password" name="password" id="password" placeholder='Votre mot de passe' onChange={handleChange} value={user.password} />
            <button type="submit">Valider</button>
        </form>
        <a href='/signup'>Créer un compte</a> */}
        <Container fluid className='vh-100 d-flex align-items-center login-image-container'>
            <Form onSubmit={loginUser} method='post' className='col-4 mx-auto d-flex flex-column mb-5'>
                <h1 className='text-center'>Connexion</h1>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Votre email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="example@gmail.com" onChange={handleChange} value={user.email} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control type="password" name="password" placeholder='Votre mot de passe' onChange={handleChange} value={user.password}/>
                    <Button variant="link" className='ps-0' size="sm">Mot de passe oublié ?</Button>
                </Form.Group>
                <Button variant="primary" type="submit">Se connecter</Button>
                <Button variant="link" onClick={() => {navigate('/signup')}} className='py-3'>Créer un compte</Button>
            </Form>
        </Container>
    </>
}

export default LoginPage
