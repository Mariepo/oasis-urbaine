import React from 'react'
import { Container, Row, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function OrderConfirmationPage() {
    const navigate = useNavigate();

    return (
    <Container>
        <Row className='order-summary-container my-5 py-5'>
            <div className='d-flex flex-column justify-content-center align-items-center my-5 py-5'>
                <img src='/assets/images/icon-check.svg' alt="icône de succès" className='img-fluid' />
                <h1 className='my-2 py-2'>Merci pour votre commande</h1>
                <p className='my-2 py-2'>Votre commande a été acceptée et sera traitée sous peu.</p>
                <Button variant='primary' onClick={() =>{navigate('/')}}  className='my-2 py-2'>Retour à la boutique</Button>
            </div>
        </Row>
    </Container>
    )
}

export default OrderConfirmationPage
