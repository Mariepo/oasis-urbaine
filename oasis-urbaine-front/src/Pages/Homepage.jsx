import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductsService from '../Services/ProductsService';
import HeaderHome from '../Components/HeaderHome';
import ProductCard from '../Components/ProductCard';
import ValueCard from '../Components/ValueCard';


function HomePage() {
  const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await ProductsService.fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const navigate = useNavigate();
    const navigateTo = (route) => {
        navigate(route);
        window.scrollTo(0, 0);
    }

    const featuredProducts = products.slice(0, 8);


    return <>
    <HeaderHome></HeaderHome>
    <Container className='mt-5 mb-3'>
        <div className='d-flex justify-content-between mb-3'>
        <h2>Nos produits phares</h2>
        <Button variant="link" onClick={() => {navigateTo('/products')}}>Tout voir <i className="bi bi-arrow-right"></i></Button>
        </div>

    <Row className="g-4">
        {featuredProducts.map((product) => (
            <Col xs={12} sm={6} md={6} lg={3} key={product.id} className='py-3'>
                <ProductCard product={product}/>
            </Col>
        ))}
    </Row>
    </Container>

    <Container className='mt-5 mb-3'>
        <div className='d-flex justify-content-between mb-3'>
            <h2 className='mt-5'>Des fruits toutes l’année</h2>
            <Button variant="link" onClick={() => {navigateTo('/categories/5/products/')}}>Tout voir <i className="bi bi-arrow-right"></i></Button>
        </div>
    <Row className="g-4">
        {featuredProducts.map((product) => (
            <Col xs={12} sm={6} md={6} lg={3} key={product.id} className='py-3' >
                <ProductCard product={product}/>
            </Col>
        ))}
    </Row>
    </Container>
    <Container fluid className='promotional-banner d-flex justify-content-center align-items-center gap-4 py-3 my-5'>
        <img src='assets/images/gifted-product-homepage.png' alt='illustration de plante' className='promotional-image-container'/>
        <p className='text-center mb-0 py-2'>Un produit offert avec chaque commande</p>
    </Container>
    <Container className='company-values mb-5'>
        <Row className='d-flex justify-content-between mb-5'>
            <h2 className='mt-5 text-center'>Des plantes en bonne santé</h2>
        </Row>
        <Row className="g-4">
            <Col xs={12} sm={6} md={4} lg={4}>
                <ValueCard videoSource="assets/videos/value-natural.mp4" title="Plantes Éco-Responsables" description="Nous offrons des arbres cultivés sans pesticides ni produits chimiques nocifs, pour  des arbres naturellement en bonne santé et le respect de l’environnement."></ValueCard>
            </Col>
            <Col xs={12} sm={6} md={4} lg={4}>
                <ValueCard videoSource="assets/videos/value-delivery.mp4" title="Livraison aux petits soins" description="Notre emballage triple cannelure renforcée assure que vos plantes arrivent en  parfait état. Le feuillage est protégé et l'arbre reste bien droit."></ValueCard>
            </Col> 
            <Col xs={12} sm={6} md={4} lg={4}>
                <ValueCard videoSource="assets/videos/value-healthy-plant.mp4" title="Des variétés résistantes" description="Nous choisissons rigoureusement nos variétés pour assurer que chaque plante soit durable. Nous assurons des apports en minéraux et vitamines pour les plantes aient un système racinaire solide."></ValueCard>
            </Col>
        </Row>
    </Container>

    </>
}

export default HomePage
