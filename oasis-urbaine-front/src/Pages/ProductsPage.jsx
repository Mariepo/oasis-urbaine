import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import ProductCard from '../Components/ProductCard';
import { Container, Row, Col } from 'react-bootstrap';
import CategoriesService from '../Services/CategoriesService';


function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await ProductsService.fetchProducts();
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async () => {
        try {
            const response = await CategoriesService.fetchCategories();
            setCategories(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
        fetchCategories();
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
            <Row>
                {categories.map((categorie) => (
                    <p>{categorie.name}</p>
                ))}
            </Row>
        </Container>
    </>
}

export default ProductsPage
