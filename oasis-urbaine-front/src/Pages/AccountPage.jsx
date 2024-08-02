import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AccountPage() {
    const navigate = useNavigate();
    const {setIsAuthenticated, setToken} = useContext(AuthContext);
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        axios.defaults.headers.common['Authorization'] = null;
        navigate('/');
        toast.success("Vous êtes déconnecté")
    }

    return (
    <div>
        <h1>mon compte</h1>
        <button onClick={logout}>Deconnexion</button>
    </div>
    )
}

export default AccountPage
