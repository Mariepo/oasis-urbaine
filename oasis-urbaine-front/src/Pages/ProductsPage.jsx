import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import CategoriesService from '../Services/CategoriesService';

// Components
import { Container, Row, Col, Stack } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import CategorieBadge from '../Components/CategorieBadge';
import HeaderProducts from '../Components/HeaderProducts';


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
        <HeaderProducts></HeaderProducts>
        <Container className='pt-3'>
            <Stack direction="horizontal" gap={2} className='pb-3'>
                {categories.map((category) => (
                    <CategorieBadge id={category.id} name={category.name} key={category.id}></CategorieBadge>
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
