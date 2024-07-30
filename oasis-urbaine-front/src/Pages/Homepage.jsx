import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import ProductsService from '../Services/ProductsService';
import HeaderHome from '../Components/HeaderHome';
import ProductCard from '../Components/ProductCard';


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

  
  return <>
    <HeaderHome></HeaderHome>
    <Container className='mt-5 mb-5'>
      <div className='d-flex justify-content-between mb-5'>
        <h2>Nos produits phares</h2>
        <Button variant="link">Tout voir <i className="bi bi-arrow-right"></i></Button>
      </div>

      <Row className="g-4">
          {products.map((product) => (
              <Col xs={12} sm={6} md={6} lg={3}  key={product.id} >
                  <ProductCard product={product}/>
              </Col>
          ))}
      </Row>
    </Container>
    </>
}

export default HomePage
