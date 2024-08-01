import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import CategoriesService from '../Services/CategoriesService';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import { Container, Row, Col, Stack } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import CategoryBadge from '../Components/CategoryBadge';
import HeaderProducts from '../Components/HeaderProducts';


function ProductsPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const navigateTo = (route) => {
        navigate(route);
        if (!route.includes('/categories/')) {
            window.scrollTo(0, 0);
        }
    }

    const fetchProducts = async () => {
        try {
            const response = id ? await ProductsService.fetchProductsByCategory(id) : await ProductsService.fetchProducts();
            const productsData = id ? response.data.products : response.data;
            setProducts(productsData);
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
    }, [id]);

    function displaySelectedComponent(event){
        const target = event.currentTarget;
        document.querySelectorAll('.selected-badge').forEach(element => {
            if (element !== target) {
                element.classList.remove('selected-badge');
            }
        });
        target.classList.toggle('selected-badge');
    }
    

    return <>
        <HeaderProducts></HeaderProducts>
        <Container className='pt-3'>
            <Stack direction="horizontal" gap={2} className='pb-3 flex-wrap'>
                <CategoryBadge name={"Tous"} onClick={(event) => {navigate('/products'); displaySelectedComponent(event);}} />
                {categories.map((category) => (
                    <CategoryBadge id={category.id} name={category.name} onClick={(event) => {navigateTo('/categories/'+category.id+'/products/'); displaySelectedComponent(event);}} key={category.id}/>
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
