import React from 'react';
import { Container, Row, Col, Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <Container fluid >
      <Row className='error-page-container'>
        <Col className='col-12 col-sm-7 col-lg-6 error-image-container order-sm-1 order-2'></Col>
        <Col className='col-12 col-sm-5 col-lg-6 d-flex flex-column align-items-center justify-content-center p-5 order-sm-2 order-1'>
          <div className='d-flex flex-column align-items-start'>
            <h1>Oops, cette page n’existe pas !</h1>
            <Button variant='primary' onClick={() =>{navigate('/')}}>Retour à l'acceuil</Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorPage
