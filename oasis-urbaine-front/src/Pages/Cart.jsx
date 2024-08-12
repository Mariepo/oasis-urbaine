import React, { useContext } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form } from "react-bootstrap";
import CartItem from "../Components/CartItem";

function Cart() {
  const { cartItems } = useContext(CartContext);

  return (
    <Container>
      <section className="col-md-8 mx-auto">
        <h1>Votre Panier</h1>
      </section>
      <section className="col-md-8 mx-auto">
        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          cartItems.map((item) => {
            return (
              <CartItem key={item.id} item={item}></CartItem>
          )})
        )}
      </section>
      <section>
        <h2>Paiement</h2>

      </section>
    </Container>
  );
}

export default Cart;
