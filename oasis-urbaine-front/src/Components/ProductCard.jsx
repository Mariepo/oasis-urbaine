import React from 'react';
import Card from 'react-bootstrap/Card';


function ProductCard({product}) {
    // Convertir le prix en nombre, puis en format avec 2 décimales
  const price = parseFloat(product.price).toFixed(2);

  // Si les centimes sont "00", ne les affichez pas
  const formattedPrice = price.endsWith('.00') || price.endsWith('.0')
    ? `${parseFloat(price).toFixed(0)}` 
    : `${price}`;

  return (
            <Card>
                <Card.Img variant="top" src={product.image_thumbnail}/>
                <Card.Body>
                    <Card.Title className='d-flex justify-content-between'>
                        <div>{product.title}</div>
                        <div>{formattedPrice}€</div>
                    </Card.Title>
                    <Card.Text>Taille : {product.dimension}</Card.Text>
                </Card.Body>
            </Card>
  )
}

export default ProductCard
