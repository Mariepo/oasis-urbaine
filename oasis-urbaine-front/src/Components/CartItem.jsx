import React, { useContext } from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartContext from "../Context/CartContext";
import { formatDecimalNumber } from '../utils/formatters';

function CartItem({item, inStock, disableClickElement, redirectOnClick, cursor}) {
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

    return <>
        <Row className={`my-4 cart-item ${inStock}`}>
            <div className='d-flex align-items-start align-items-md-center justify-content-start justify-content-md-between gap-3 gap-md-5'>
                <div className='d-flex align-items-start align-items-md-center flex-fill'>
                    <div className={`cart-image-container me-2 me-md-4 ${cursor}`} onClick={redirectOnClick}>
                        <img src={item.image_thumbnail} alt={item.title} />
                    </div>
                    <div className='d-flex flex-column flex-md-row flex-fill gap-md-5'>
                        <div className={`ps-0 d-flex flex-column justify-content-center flex-md-fill ${cursor}`}  onClick={redirectOnClick}>
                            <p className='m-0 item-title'>{item.title}</p>
                            <p className='ms-0  item-price'>{formattedPrice}€</p>
                        </div>
                        <div className='d-flex align-items-center'>
                            <Button variant="light" onClick={decreaseProductQuantity} className='quantity-button'>-</Button>
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
                    </div>
                </div>
                <p className='text-end m-0 item-subtotal'>{item.quantity * item.price}€</p>
            </div>
        </Row>
        {/* <Row className={`my-4 cart-item mx-1 ${inStock}`}>
            <Col className="col-4 col-md-2 px-0 cursor-pointer" onClick={redirectOnClick}>
                <div className="cart-image-container">
                    <img src={item.image_thumbnail} alt={item.title} />
                </div>
            </Col>
            <Col className='col-8 col-md-10d-flex justify-content-between gap-md-5 align-items-start align-items-md-center'>
                <div className='d-flex flex-column flex-md-row justify-content-between gap-md-5 flex-fill'>
                    <div className="ps-0 d-flex flex-column justify-content-center gap-1 cursor-pointer flex-fill"  onClick={redirectOnClick}>
                        <p className='m-0 item-title'>test{item.title}</p>
                        <p className='m-0 item-price'>{formattedPrice}€</p>
                    </div>
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
                </div>
                <div className=' d-flex flex-column justify-content-center'>
                    <p className='text-end m-0 item-subtotal'>{item.quantity * item.price}€</p>
                </div>
            </Col>
        </Row> */}

        {/* <Row className={`my-4 cart-item mx-1 ${inStock}`}>
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
        </Row> */}
    </>
}

export default CartItem
