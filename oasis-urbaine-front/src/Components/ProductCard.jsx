import React, { useContext } from 'react';
import {Card, Button} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../Context/AuthContext';


function ProductCard({product, handleShowModal}) {
  const {isAdmin} = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }
  const location = useLocation();
  const isOnProductsManagementPage = location.pathname === '/products-management';

    // Convertir le prix en nombre, puis en format avec 2 décimales
  const price = parseFloat(product.price).toFixed(2);

  // Si les centimes sont "00", ne les affichez pas
  const formattedPrice = price.endsWith('.00') || price.endsWith('.0')
    ? `${parseFloat(price).toFixed(0)}` 
    : `${price}`;

  const navigateToProductDetails = () => {
    navigate('/products/'+product.id);
    window.scrollTo(0, 0);
  }


  return <>
        <Card>
            <Card.Img variant="top" src={product.image_thumbnail}  onClick={navigateToProductDetails}/>
            <Card.Body  onClick={navigateToProductDetails}>
                <Card.Title className='d-flex justify-content-between'>
                    <div>{product.title}</div>
                    <div>{formattedPrice}€</div>
                </Card.Title>
                <Card.Text>Taille : {product.dimension}</Card.Text>
            </Card.Body>
            {isAdmin && isOnProductsManagementPage &&
              <Card.Footer className='d-flex justify-content-between gap-3'>
                  <Button variant="outline-primary" className='flex-fill' onClick={()=> {navigateTo(`/edit-product/${product.id}`)}}>Modifier</Button>
                  <Button variant="outline-danger" className='flex-fill' onClick={()=>{handleShowModal(product.id)}}>Supprimer</Button>
              </Card.Footer>
            }
        </Card>        
    </>
}

export default ProductCard
