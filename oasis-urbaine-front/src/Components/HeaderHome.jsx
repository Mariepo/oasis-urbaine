import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function HeaderHome() {
    const navigate = useNavigate();
    const navigateTo = (route) => {
      navigate(route);
    }

  return (
    <header className='header-home'>
        <Container fluid className='pe-0 ps-0'>
            <Row className='d-flex flex-column flex-md-row align-items-center ms-md-5'>
                <Col className='col-12 col-md-6 order-2 order-md-1'>
                    <h1>Une oasis de verdure et de sérénité</h1>
                    <p>Nos arbres fruitiers vous permettent de profiter de récoltes savoureuses tout en respectant l'environnement. </p>
                    <Button variant="primary" onClick={() => {navigateTo('/products')}}>Voir tous les arbres fruitiers</Button>
                </Col>
                <Col className='col-12 col-md-6 order-1 order-md-2'>
                    <div className='header-image-container'>
                        <img src="/assets/images/header-homepage.png" alt="oranger miniature" />
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
    )
}

export default HeaderHome
