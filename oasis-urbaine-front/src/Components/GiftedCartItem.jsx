import React, { useContext } from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";

function GiftedCartItem() {

    return (
        <Row className="mx-0 px-0 my-4 cart-item gifted-cart-item">
            <Col className="col-2 col-md-2 px-0">
                <div className="cart-image-container m-2">
                    <img src="/assets/images/gifted-product.png" alt="Produit offert" />
                </div>
            </Col>
            <Col className="col-8 col-md-5 ps-0 d-flex flex-column justify-content-center gap-1">
                <p className='m-0 item-title'>🎁 Engrais naturel</p>
                <p className='m-0 item-price'>Produit offert</p>
            </Col>
            <Col className='col-2 col-md-5 d-flex flex-column justify-content-center'>
                <p className='text-end m-0 item-subtotal'>Gratuit</p>
            </Col>
        </Row>
    )
}

export default GiftedCartItem
