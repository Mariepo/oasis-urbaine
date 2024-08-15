import React, { useEffect, useState } from 'react';
import ProductsService from '../Services/ProductsService';
import { useParams, useNavigate } from 'react-router-dom';

// Components
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import ProductCard from '../Components/ProductCard';
import { toast } from 'react-toastify';


function ProductsManagementPage() {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState();
    const navigate = useNavigate();

    const fetchProducts = async () => {
        try {
            const response = id ? await ProductsService.fetchProductsByCategory(id) : await ProductsService.fetchProducts();
            const productsData = id ? response.data.products : response.data;
            setProducts(productsData);
        } catch (error) {
            console.log(error);
        }
    }

    // Modal de suppression
    const [show, setShow] = useState(false);
    const handleCloseModal = () => setShow(false);
    const handleShowModal = (id_product) => {
        setShow(true);
        setSelectedProductId(id_product);
    }

    const deleteProduct = async (event) => {
        try {
            event.preventDefault();
            await ProductsService.deleteProduct(selectedProductId);
            toast.success('Produit supprimé avec succès !');
            handleCloseModal();
            fetchProducts();
            navigate('/products-management');
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchProducts();
    }, [id]);


    return <>
        <Container className='pt-3'>
            <Row className='my-5 d-flex flex-row justify-content-center'>
            <h1>Gérer les produits</h1>
            <div>
                <Button variant='primary' onClick={()=>{navigate('/add-product')}}>Ajouter un produit</Button>
            </div>
            </Row>
            <Row className="g-4">
                {products.map((product) => (
                    <Col xs={12} sm={6} md={6} lg={3} className='mb-5' key={product.id} >
                        <ProductCard product={product} handleShowModal={handleShowModal}/>
                    </Col> 
                ))}
            </Row>
        </Container>

        <Modal show={show} onHide={handleCloseModal} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Supprimer le produit</Modal.Title>
            </Modal.Header>
            <Modal.Body>Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.</Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleCloseModal}> Annuler</Button>
                <Button variant="danger" onClick={deleteProduct}>Oui, je supprime le produit</Button>
            </Modal.Footer>
        </Modal>
    </>
    }

export default ProductsManagementPage
