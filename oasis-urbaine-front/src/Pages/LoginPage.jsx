import React, { useState } from 'react';
import UserService from '../Services/UserService';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LoginPage () {
    const [user, setUser] = useState({ email: '', password: '' });    
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setUser({...user, [name] : value})
    }

    async function loginUser (e) {
        e.preventDefault();
        try {
            const token = await UserService.loginUser(user);
            if (token.data.token) {
                axios.defaults.headers.common['Authorization'] = "Bearer "+token.data.token;
                navigate('/');
                toast.success("Vous êtes bien connecté");
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
