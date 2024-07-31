import React from 'react';
import { Container } from 'react-bootstrap';
// import { Container, Row, Col, Button } from 'react-bootstrap';


function HeaderProducts() {
    return (
        <header className='header-products mb-5'>
            <Container>
                <p>🔥 Un produit offert avec chaque commande</p>
                <h1 className='pb-4'>Arbres fruitiers d’intérieur 🍊</h1>
            </Container>
        </header>
    )
}

export default HeaderProducts
