import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import ProductCard from '../Components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';


function ProductsPage() {
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
        <Container>
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

export default ProductsPage
