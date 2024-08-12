import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import DeliveryMethodsService from "../Services/DeliveryMethodsService";

function Cart() {
  const { cartItems } = useContext(CartContext);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  // const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState('');
  // const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState('');
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState({ id: '', price: '' });   
  const subtotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  const total = subtotal + 1;

  const fetchDeliveryMethods = async () => {
    try {
      const response = await DeliveryMethodsService.fetchDeliveryMethods();
      setDeliveryMethods(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const deliveryIdToPrice = (deliveryId) => {
    console.log(deliveryId)
    console.log(deliveryMethods)
    const deliveryMethod = deliveryMethods.find((method) => method.id === Number(deliveryId));
    console.log(deliveryMethod)
    return deliveryMethod.price;
  }

  const handleChange = (event) => {
    console.log("AAAAAA");
    // setSelectedDeliveryMethodId(event.target.value);
    const deliveryMethodId = event.target.value;
    const price2 = deliveryIdToPrice(deliveryMethodId);
    // setSelectedDeliveryPrice(price)

    setSelectedDeliveryMethod({id:deliveryMethodId, price:price2});
  }


  useEffect( () => {
    fetchDeliveryMethods();
  }, []);

  return (
    <Container>
      <main className="col-md-8 mx-auto">
        <section>
          <h1>Votre Panier</h1>
        </section>
        <section>
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
          <h2>Mode de livraison</h2>
          {
          deliveryMethods.map((deliveryMethod) => 
          
            deliveryMethod.id === 1 ? (
              <Form.Check type="radio" name="delivery" id={deliveryMethod.id} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleChange} checked />
            ) : (
              <Form.Check type="radio" name="delivery" id={deliveryMethod.id} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleChange} />
            )
          
          )}
          <p>methode sélectionnées : {selectedDeliveryMethod.id}</p>
        </section>
        <section className="text-end">
          <hr />
          <p>Sous-total : {subtotal}€</p>
          <p>Livraison : {selectedDeliveryMethod.price}€</p>
          <p>Total : {total}€</p>
        </section>
      </main>
    </Container>
  );
}

export default Cart;
