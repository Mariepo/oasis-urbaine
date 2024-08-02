import React, { useState, useContext } from 'react';
import UsersService from '../Services/UsersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthContext from '../Context/AuthContext';


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
        <form onSubmit={loginUser} method='post'>
            <h1>Login</h1>
            <input type="text" name="email" id="email" placeholder='Votre email' onChange={handleChange} value={user.email} />
            <input type="password" name="password" id="password" placeholder='Votre mot de passe' onChange={handleChange} value={user.password} />
            <button type="submit">Valider</button>
        </form>
        <a href='/signup'>Créer un compte</a>
    </>
}

export default LoginPage
