import React, { useEffect, useState } from 'react';
import ProductsService from '../../Services/ProductsService';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col} from 'react-bootstrap';
import ProductCard from '../../Components/ProductCard';
import { toast } from 'react-toastify';
import HeaderManagement from '../../Components/HeaderManagement';
import DeleteProductModal from '../../Components/DeleteProductModal';

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
    useEffect(() => {
        document.body.classList.add('background-body-grey');
        return () => {
            document.body.classList.remove('background-body-grey');
        };
    }, []);


    return <>
        <Container className='py-5 products-management-container'>
            <HeaderManagement lg={12} textH1={"Gestion des produits"} textButton={"Ajouter un produit"} onClick={()=>{navigate('/add-product')}} 
            className={"col-12 col-md-4 col-lg-3 col-xl-2"} />
            <Row className="g-4 py-4">
                {products.map((product) => (
                    <Col xs={12} sm={6} md={6} lg={3} className='mb-5' key={product.id} >
                        <ProductCard product={product} handleShowModal={handleShowModal}/>
                    </Col> 
                ))}
            </Row>
        </Container>

        <DeleteProductModal show={show} handleCloseModal={handleCloseModal} onClick={deleteProduct} />

    </>
    }

export default ProductsManagementPage
