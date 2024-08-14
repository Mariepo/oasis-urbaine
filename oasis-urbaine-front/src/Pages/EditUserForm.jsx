import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import UsersService from '../Services/UsersService';
import { toast } from 'react-toastify';

function EditUserForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const id = UsersService.getUserId();
    const [user, setUser] = useState([]);

    const fetchUser = async () => {
        try {
            const response = await UsersService.getUserById(id);
            setUser(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    } 

    const editUser = async (event) => {
        event.preventDefault();
        try {
            await UsersService.editUser(id, user);
            toast.success('Modifications enregistrées');
            const redirectTo = location.state?.from || '/account';
            navigate(redirectTo)
        } catch (error) {
            toast.error('Erreur lors de la modification du compte')
            console.log(error);
        }
    }

    useEffect(()=> {
        fetchUser();
    }, [])

    return <>
        <Container fluid className='login-image-container py-5'>
            <Form onSubmit={editUser} method='post' className='col-10 col-md-6 mx-auto d-flex flex-column my-4'>
                <h1 className='text-center mb-4'>Modification</h1>
                <fieldset>
                    <Row>
                        <Col className='col-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" onChange={handleChange} value={user.email} />
                            </Form.Group>
                        </Col>
                        <Col className='col-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Téléphone</Form.Label>
                                <Form.Control type="phone" name="phone" onChange={handleChange} value={user.phone} />
                            </Form.Group>
                        </Col>
                    </Row>
                </fieldset>
                <fieldset className='mt-3 mb-2'>
                    <p className='signup-form-title'>Adresse de livraison</p>
                    <Form.Group className="mb-3" controlId="address">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control type="text" name="address" onChange={handleChange} value={user.address}/>
                    </Form.Group>
                    <Row>
                        <Col className='col-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="postal_code">
                                <Form.Label>Code postal</Form.Label>
                                <Form.Control type="text" name="postal_code" onChange={handleChange} value={user.postal_code} />
                            </Form.Group>            
                        </Col>
                        <Col className='col-12 col-md-6'>
                            <Form.Group className="mb-3" controlId="city">
                                <Form.Label>Ville</Form.Label>
                                <Form.Control type="text" name="city" onChange={handleChange} value={user.city} />
                            </Form.Group>            
                        </Col>
                    </Row>
                </fieldset>
                <Button variant="primary" type="submit">Valider les modifications</Button>
                <Button variant="link"  className='py-3' onClick={()=>{navigate('/account')}}>Annuler</Button>
            </Form>
        </Container>
    </>
}

export default EditUserForm