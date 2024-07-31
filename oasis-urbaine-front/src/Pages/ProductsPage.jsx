import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import ProductCard from '../Components/ProductCard';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import CategoriesService from '../Services/CategoriesService';
import CategorieBadge from '../Components/CategorieBadge';



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
            <Stack direction="horizontal" gap={2}>
                {categories.map((categorie) => (
                    <CategorieBadge name={categorie.name}></CategorieBadge>
                ))}
            </Stack>
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
