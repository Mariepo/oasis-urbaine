import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import logoOasisUrbaine from '../assets/images/logo-oasis-urbaine.svg'

function FooterComponent() {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='col-12 col-lg-3 d-flex justify-content-center justify-content-lg-start'>
                        <img src={logoOasisUrbaine} alt='logo Oasis Urbaine' className='img-fluid' />
                    </Col>
                    <Col className='col-12 col-lg-6 py-4 py-lg-0 d-flex justify-content-center flex-wrap'>
                        <a href="/help" className='text-decoration-none px-3'>Aide</a>
                        <a href="/legal-notice" className='text-decoration-none px-3'>Mentions légales</a>
                        <a href="/privacy-policy" className='text-decoration-none px-3'>Politique de confidentialité</a>
                    </Col>
                    <Col className='col-12 col-lg-3 d-flex justify-content-center justify-content-lg-end'>
                        <a href="https://facebook.com" aria-label="Facebook" className='px-3'>
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter" className='px-3'>
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram" className='px-3'>
                            <i className="bi bi-instagram"></i>
                        </a>
                    </Col>
                </Row>
            </Container>
            {/* <Container>
                <div className='d-flex flex-column flex-md-row justify-content-between align-items-center flex-wrap gap-3'>
                    <div>
                        <img src={logoOasisUrbaine} alt='logo Oasis Urbaine' className='img-fluid' />
                    </div>
                    <div className='d-flex gap-3'>
                        <a href="/help" className='text-decoration-none'>Aide</a>
                        <a href="/legal-notice" className='text-decoration-none'>Mentions légales</a>
                        <a href="/privacy-policy" className='text-decoration-none'>Politique de confidentialité</a>
                    </div>
                    <div className='d-flex gap-3'>
                        <a href="https://facebook.com" aria-label="Facebook">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="https://twitter.com" aria-label="Twitter">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="https://instagram.com" aria-label="Instagram">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                </div>
            </Container> */}
        </footer>
    );
}

export default FooterComponent;
