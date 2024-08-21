import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';
import ProductsService from "../Services/ProductsService";
import { Button, Col, Container, Row } from "react-bootstrap";
import CartContext from "../Context/CartContext";
import {formatDecimalNumber} from "../utils/formatters"

function ProductDetailsPage(){
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { addToCart } = useContext(CartContext);

  async function fetchProductsById () {
    try {
      const response = await ProductsService.fetchProductsById(id);
      setProduct(response.data);
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

  return <>
    <Container className="product-details">
      <Row className="py-5 justify-content-center">
        <Col className="col-12 col-lg-6">
          <div className="image-container mb-3 pe-4">
            <img src={product.image_large} alt={product.title}></img>
          </div>
        </Col>
        <Col className="col-12 col-lg-5 col-md-px-5">
          <h1>{product.title}</h1>
          <div className="product-price my-2">{formattedPrice}€</div>
          <ul className="categorie-list">
              <li as="li" >Taille : {formattedHeight} cm</li>
          </ul>
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
  </>

}

export default ProductDetailsPage