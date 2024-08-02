import React, { useContext } from 'react'
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UserService from '../Services/UserService';

function AccountPage() {
    const navigate = useNavigate();
    const {setIsAuthenticated, setToken} = useContext(AuthContext);
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        UserService.logout();
        navigate('/login');
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
