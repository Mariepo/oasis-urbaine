import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../Context/AuthContext';
import UsersService from '../Services/UsersService';
import OrdersService from '../Services/OrdersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row } from 'react-bootstrap';

function AccountPage() {
    const navigate = useNavigate();
    const {setIsAuthenticated, setToken} = useContext(AuthContext);
    const [user, setUser] = useState([]);
    const [orders, setOrders] = useState([]);
    const id = UsersService.getUserId();

    // Deconnexion
    const logout = () => {
        setIsAuthenticated(false);
        setToken(null);
        UsersService.logout();
        navigate('/login');
        toast.success("Vous êtes déconnecté")
    }

    // Récupérer les infos de l'utilisateur connecté
    const fetchUser = async () => {
        try {
            const response = await UsersService.getUserById(id);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchOrder = async () => {
        try {
            const response = await OrdersService.fetchOrdersById(id);
            setOrders(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
        fetchOrder();
    }, []);

    return <>
        <Container>
    <div>
        <Row>
            <h1>Bonjour {user.name}</h1>
            <p>Adresse :{user.address} {user.postal_code} {user.city} </p>
            <p>Adresse : {user.phone}</p>
            <p>Adresse : {user.email}</p>
        </Row>
        <button onClick={logout}>Deconnexion</button>
    </div>
    <h2>Historique de commande</h2>
            {orders.length === 0 ? (
                <p>Aucune commande disponible.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id}>
                        <p>Commande ID: {order.id}</p>
                        <p>Montant total: {order.total_amount}</p>
                        <p>Statut: {order.status}</p>
                        <p>Date de création: {new Date(order.created_at).toLocaleDateString()}</p>
                        <hr />
                    </div>
                ))
            )}
    
        </Container>
    </>

}

export default AccountPage
