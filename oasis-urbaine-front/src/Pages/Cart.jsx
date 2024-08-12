import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import DeliveryMethodsService from "../Services/DeliveryMethodsService";

function Cart() {
  const { cartItems } = useContext(CartContext);
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(1);
  const selectedDeliveryMethod = deliveryMethods.find(deliveryMethod => deliveryMethod.id === selectedDeliveryMethodId);
  // const [selectedDeliveryPrice, setSelectedDeliveryPrice] = useState('');
  // const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState({ id: '', price: '' });   
  const subtotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  const total = subtotal + (selectedDeliveryMethod ? Number(selectedDeliveryMethod.price) : 0);

  const fetchDeliveryMethods = async () => {
    try {
      const response = await DeliveryMethodsService.fetchDeliveryMethods();
      setDeliveryMethods(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // const deliveryIdToPrice = (deliveryId) => {
  //   console.log(deliveryId)
  //   console.log(deliveryMethods)
  //   const deliveryMethod = deliveryMethods.find((method) => method.id === Number(deliveryId));
  //   console.log(deliveryMethod)
  //   return deliveryMethod.price;
  // }

  const handleChange = (event) => {
    // Passer l'id d'un string à un nombre
    setSelectedDeliveryMethodId(Number(event.target.value));
    // const deliveryMethodId = event.target.value;
    // const price2 = deliveryIdToPrice(deliveryMethodId);
    // setSelectedDeliveryPrice(price)
    // setSelectedDeliveryMethod({id:deliveryMethodId, price:price2});
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
          {deliveryMethods.map((deliveryMethod) => (
              <Form.Check type="radio" name="delivery" id={deliveryMethod.id} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleChange} checked={deliveryMethod.id === selectedDeliveryMethodId}
              />
          ))}
        </section>
        <section className="text-end">
          <hr />
          <p>Sous-total : {subtotal}€</p>
          <p>Livraison : {selectedDeliveryMethod ? `${selectedDeliveryMethod.price}€` : 'Aucune'}</p>
          <p>Total : {total}€</p>
        </section>
      </main>
    </Container>
  );
}

export default Cart;
