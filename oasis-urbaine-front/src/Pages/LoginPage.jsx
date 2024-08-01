import React, { useState } from 'react';
import UserService from '../Services/UserService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [user, setUser] = useState({});

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
                console.log("Vous êtes bien connectés");
                navigate('/');
            } else {
                console.log("Identifiants incorrects");
            }
        } catch (error) {
            console.log(error);
        }
    }


    return <>
        <form onSubmit={loginUser}>
            <h1>Login</h1>
            <input type="text" name="email" id="email" placeholder='Votre email' onChange={handleChange} value={user.email} />
            <input type="password" name="password" id="password" placeholder='Votre mot de passe' onChange={handleChange} value={user.password} />
            <button type="submit">Valider</button>
        </form>
    </>
}

export default LoginPage
