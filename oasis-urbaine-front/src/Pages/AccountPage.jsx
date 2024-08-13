import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../Context/AuthContext';
import UsersService from '../Services/UsersService';
import OrdersService from '../Services/OrdersService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';

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
        document.body.classList.add('body-account-page');
    }, []);

    const formatPrice = (price) => {
        const roundedPrice = Number(price).toFixed(2);
        return roundedPrice.endsWith(".00") ? Math.round(price) : roundedPrice;
    }

    return <>
        <Container className='mt-5 mb-5'>
            <Row>
                <h1>Bonjour {user.firstname} ! 👋</h1>
                <div>
                    <Button variant="link ps-0" onClick={logout}>Deconnexion</Button>
                </div>
            </Row>
            <Row className='mt-5 mb-5'>
                <Col className='col-12 col-lg-8'>
                    <h2>Historique de commande</h2>
                    {orders.length === 0 ? (
                        <p>Aucune commande disponible.</p>
                    ) : (
                        <Table bordered>
                            <thead>
                                <tr>
                                    {/* <th>Numéro<br/>de commande</th> */}
                                    <th>Date</th>
                                    <th>Statut</th>
                                    <th>Articles</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                <tr key={order.id}>
                                    {/* <td>#{order.id}</td> */}
                                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                    <td>{order.status}</td>
                                    <td>
                                        {order.order_items.map((item) => (
                                            <div key={item.id}>
                                                {`${item.product.title} (x${item.quantity})`}
                                            </div>
                                        ))}
                                    </td>
                                    <td>{formatPrice(order.total_amount)}€</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
                <Col className='col-12 col-lg-4'>
                    <h2>Coordonnées</h2>
                    <Card>
                        <Card.Body>
                            <ul>
                                <li>{user.firstname} {user.name}</li>
                                <li>{user.address}</li>
                                <li>{user.postal_code} {user.city}</li>
                            </ul>
                            <ul>
                                <li>{user.phone}</li>
                                <li>{user.email}</li>
                            </ul>
                            <Button variant="link ps-0" onClick={()=>{navigate('/edit-address')}}>Modifier</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    </>

}

export default AccountPage
