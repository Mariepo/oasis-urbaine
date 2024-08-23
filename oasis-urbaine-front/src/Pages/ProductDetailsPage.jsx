import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import ProductsService from "../Services/ProductsService";
import { Button, Col, Container, Row } from "react-bootstrap";
import CartContext from "../Context/CartContext";
import {formatDecimalNumber} from "../utils/formatters";
import AuthContext from "../Context/AuthContext";
import DeleteProductModal from "../Components/DeleteProductModal";
import { toast } from "react-toastify";

function ProductDetailsPage(){
  const {isAdmin} = useContext(AuthContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }

  async function fetchProductsById () {
    try {
      const response = await ProductsService.fetchProductsById(id);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  } 

  // Modal de suppression
  const [show, setShow] = useState(false);
  const handleCloseModal = () => setShow(false);
  const handleShowModal = (id_product) => {
      setShow(true);
  }

  const deleteProduct = async (event) => {
      try {
          event.preventDefault();
          await ProductsService.deleteProduct(product.id);
          toast.success('Produit supprimé avec succès !');
          handleCloseModal();
          navigateTo('/products-management');
      } catch (error) {
          console.log(error);
      }
  }

  useEffect(() => {
    fetchProductsById();
    document.body.classList.add('background-body-orange');
    return () => {
      document.body.classList.remove('background-body-orange');
    };

  }, []);

    const formattedPrice = formatDecimalNumber(product.price);
    const formattedHeight = formatDecimalNumber(product.dimension);
    const imageSrc = `${process.env.PUBLIC_URL}/${product.image_large}`;

  return <>
    <Container className="product-details">
      <Row className="py-5 justify-content-center">
        <Col className="col-12 col-lg-6">
          <div className="image-container mb-3 pe-lg-4">
            <img src={imageSrc} alt={product.title}></img>
          </div>
        </Col>
        <Col className="col-12 col-lg-5 col-md-px-5">
          <h1>{product.title}</h1>
          <div className="product-price my-2">{formattedPrice}€</div>
          {!isNaN(formattedHeight) && formattedHeight > 0 && (
            <ul className="categorie-list">
                <li as="li" >Taille : {formattedHeight} cm</li>
            </ul>
          ) }
          {product.categories && product.categories.length > 0 && (
            <ul className="categorie-list">
                {product.categories.map((categorie) => <>
                    <li as="li" key={categorie.id}>
                        {categorie.name}
                    </li>
                </>)}
              </ul>
            )}
            <p className="product-delivery">Livraison calculée à la prochaine étape</p>
          <div className="d-grid gap-2 my-4">
            <Button variant="primary" onClick={() => addToCart(product, true)}>Ajouter au panier</Button>
          </div>
            {isAdmin && (
              <div className='d-flex justify-content-between flex-wrap gap-2 px-2'>
                <Button variant="outline-primary"  className='flex-fill product-actions-button' onClick={()=> {navigateTo(`/edit-product/${product.id}`)}}>Modifier</Button>
                <Button variant="outline-danger" className='flex-fill product-actions-button' onClick={()=>{handleShowModal(product.id)}}>Supprimer</Button>
              </div>
            )}
          <hr className="mt-5" />
          <div className="pt-4">
            <h3 className="mb-3 product-care-title">Description</h3>
            <p>{product.description}</p>
          </div>
          <div className="mt-5">
            <h3 className="mb-3 product-care-title">Conseils d'entretien</h3>
            <div className="mb-4">
              <h4 className="product-care-subtitle">Exposition</h4>
              <p>{product.care_exposure}</p>
            </div>
            <div className="mb-4">
              <h4 className="product-care-subtitle">Arrosage</h4>
              <p>{product.care_watering}</p>
            </div>
            <div className="mb-4">
              <h4 className="product-care-subtitle">Température</h4>
              <p>{product.care_temperature}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>

    <DeleteProductModal show={show} handleCloseModal={handleCloseModal} onClick={deleteProduct} />
  </>

}

export default ProductDetailsPage