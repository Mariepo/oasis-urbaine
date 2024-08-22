import React, { useContext } from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";
import { formatDecimalNumber } from '../utils/formatters';

function CartItem({item, inStock, disableClickElement, redirectOnClick}) {
    const formattedPrice = formatDecimalNumber(item.price);
    
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
        <Row className={`my-4 cart-item mx-1 ${inStock}`}>
            <Col className="col-md-2 px-0" onClick={redirectOnClick}>
                <div className="cart-image-container">
                    <img src={item.image_thumbnail} alt={item.title} />
                </div>
            </Col>
            <Col className="ps-0 d-flex flex-column justify-content-center gap-1"  onClick={redirectOnClick}>
                <p className='m-0 item-title'>{item.title}</p>
                <p className='m-0 item-price'>{formattedPrice}€</p>
            </Col>
            <Col className='d-flex flex-column justify-content-center'>
                <div className='d-flex align-items-center'>
                    <Button variant="light" disabled={disableClickElement} onClick={decreaseProductQuantity} className='quantity-button'>-</Button>
                    <Form.Control
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="mx-0 text-center"
                        style={{ width: '60px' }}
                    />
                    <Button variant="light" disabled={disableClickElement} onClick={increaseProductQuantity} className='quantity-button'>+</Button>
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
