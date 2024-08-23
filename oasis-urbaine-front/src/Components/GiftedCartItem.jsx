import React, { useContext } from 'react'
import { Row, Col, Button, Form } from "react-bootstrap";

function GiftedCartItem() {

    return (
        <div className="mx-0 p-2 pe-5 my-4 cart-item gifted-cart-item d-flex align-items-center justify-content-between">
            <div className='d-flex align-items-center gap-3' >
                <div className="cart-image-container">
                    <img src="/assets/images/gifted-product.png" alt="Produit offert" />
                </div>
                <div>
                    <p className='m-0 item-title'>🎁 Engrais naturel</p>
                    <p className='m-0 item-price'>Produit offert</p>
                    <p className='item-subtotal mb-0 d-md-none'>Gratuit</p>
                </div>
            </div>
            <p className='text-end item-subtotal mb-0 d-none d-md-block'>Gratuit</p>
        </div>
    )
}

export default GiftedCartItem
