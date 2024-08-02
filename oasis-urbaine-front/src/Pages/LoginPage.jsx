import React, { useState, useContext } from 'react';
import UserService from '../Services/UserService';
import axios from 'axios';
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

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const token = await UserService.loginUser(user);
            if (token.data.token) {
                axios.defaults.headers.common['Authorization'] = "Bearer "+token.data.token;
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
        <form onSubmit={loginUser} method='get'>
            <h1>Login</h1>
            <input type="text" name="email" id="email" placeholder='Votre email' onChange={handleChange} value={user.email} />
            <input type="password" name="password" id="password" placeholder='Votre mot de passe' onChange={handleChange} value={user.password} />
            <button type="submit">Valider</button>
        </form>
    </>
}

export default LoginPage
