import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductsService from "../Services/ProductsService";
import { Button, Col, Container, Row } from "react-bootstrap";

function ProductDetailsPage(){
  const { id } = useParams();
  const [product, setProduct] = useState({});

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
  }, []);

    // Convertir le prix en nombre, puis en format avec 2 décimales
    const price = parseFloat(product.price).toFixed(2);

    // Si les centimes sont "00", ne les affichez pas
    const formattedPrice = price.endsWith('.00') || price.endsWith('.0')
      ? `${parseFloat(price).toFixed(0)}` 
      : `${price}`;

  return <>
    <Container>
      <Row className="py-5">
        <Col className="col-12 col-lg-6">
          <div className="product-details-image-container mb-3">
            <img src={product.image_large} alt={product.title}></img>
          </div>
        </Col>
        <Col className="col-12 col-lg-6 col-md-px-5">
          <h1>{product.title}</h1>
          <span>{formattedPrice}€</span>
          <p>Livraison calculée à la prochaine étape</p>
          <div className="d-grid gap-2">
            <Button variant="primary">Ajouter au panier</Button>
          </div>
          <hr className="my-4" />
          <div className="pt-4">
            <h3 className="mb-3">Description</h3>
            <p>{product.description}</p>
          </div>
          <div className="mt-5">
            <h3 className="mb-3">Conseils d'entretien</h3>
            <div className="mb-5">
              <h4>Exposition</h4>
              <p>{product.care_exposure}</p>
            </div>
            <div className="mb-5">
              <h4>Arrosage</h4>
              <p>{product.care_watering}</p>
            </div>
            <div className="mb-5">
              <h4>Température</h4>
              <p>{product.care_temperature}</p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </>

}

export default ProductDetailsPage