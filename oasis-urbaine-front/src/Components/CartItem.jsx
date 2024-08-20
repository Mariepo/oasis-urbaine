import React, { useContext } from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";

function CartItem({item}) {
    const navigate = useNavigate();
    // Convertir le prix en nombre, puis en format avec 2 décimales
    const price = parseFloat(item.price).toFixed(2);
    // Si les centimes sont "00", ne les affichez pas
    const formattedPrice = price.endsWith('.00') || price.endsWith('.0')
        ? `${parseFloat(price).toFixed(0)}`
        : `${price}`;
    
    const {addToCart, deleteFromCart, removeFromCart} = useContext(CartContext);
    const increaseProductQuantity = () => {
        addToCart(item, false);
    }
    const deleteProduct  = () => {
        deleteFromCart(item.id);
    }

    const decreaseProductQuantity = () => {
        removeFromCart(item.id);
    }

    return (
        <Row className="my-4 cart-item">
            <Col className="col-md-2"  onClick={() => navigate(`/products/${item.id}`)}>
                <div className="cart-image-container">
                    <img src={item.image_thumbnail} alt={item.title} />
                </div>
            </Col>
            <Col className="ps-0 d-flex flex-column justify-content-center gap-1"  onClick={() => navigate(`/products/${item.id}`)}>
                <p className='m-0 item-title'>{item.title}</p>
                <p className='m-0 item-price'>{formattedPrice}€</p>
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
                <div className='d-flex align-items-center'>
                    <Button variant="light" onClick={decreaseProductQuantity} className='quantity-button'>-</Button>
                    <Form.Control
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="mx-0 text-center"
                        style={{ width: '60px' }}
                    />
                    <Button variant="light" onClick={increaseProductQuantity} className='quantity-button'>+</Button>
                    <div className='p-3 cursor-pointer delete-button'  onClick={deleteProduct}>
                        <div className='icon-container'>
                            <i className="bi bi-trash3"></i>
                        </div>
                    </div>
                </div>

            </Col>
            <Col className=' d-flex flex-column justify-content-center'>
                <p className='text-end m-0 item-subtotal'>{item.quantity * item.price}€</p>
            </Col>
        </Row>
    )
}

export default CartItem
