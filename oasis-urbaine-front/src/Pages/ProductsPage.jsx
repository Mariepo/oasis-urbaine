import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import CategoriesService from '../Services/CategoriesService';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import { Container, Row, Col, Stack, Alert } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import CategoryBadge from '../Components/CategoryBadge';
import HeaderProducts from '../Components/HeaderProducts';

function ProductsPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);
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
            fetchCategories(productsData);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCategories = async (productsData = []) => {
        try {
            const response = await CategoriesService.fetchCategories();
            const allCategories = response.data;
            const categoryIdsWithProducts = new Set(productsData.flatMap(product => product.categories.map(category => category.id)));
            const filteredCategories = allCategories.filter(category => categoryIdsWithProducts.has(category.id));
            setCategoriesWithProducts(filteredCategories);
            setCategories(allCategories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, [id]);

    function displaySelectedCategoryBadge(event) {
        document.querySelector('.category-badge-active')?.classList.remove('category-badge-active');
        event.currentTarget.classList.add('category-badge-active');
    }

    return (
        <>
            <HeaderProducts />
            <Container>
                <Stack direction="horizontal" gap={2} className='my-5 flex-wrap'>
                    <CategoryBadge 
                        name={"Tous"} 
                        onClick={(event) => {navigate('/products'); displaySelectedCategoryBadge(event);}} 
                        className={'category-badge' + (!id ? ' category-badge-active' : '')} 
                    />
                    {categoriesWithProducts.map((category) => (
                        <CategoryBadge 
                            id={category.id} 
                            name={category.name} 
                            onClick={(event) => {navigateTo('/categories/'+category.id+'/products/'); displaySelectedCategoryBadge(event);}} 
                            key={category.id} 
                            className={'category-badge' + (id === category.id.toString() ? ' category-badge-active' : '')} 
                        />
                    ))}
                </Stack>
                <Row className="g-4 mb-5">
                    {products.length === 0 ? (
                        <Col xs={12}>
                            <Alert variant="info">Aucun produit trouvé pour cette catégorie.</Alert>
                        </Col>
                    ) : (
                        products.map((product) => (
                            <Col xs={12} sm={6} md={6} lg={3} key={product.id}>
                                <ProductCard product={product} />
                            </Col>
                        ))
                    )}
                </Row>
            </Container>
        </>
    );
}

export default ProductsPage;
