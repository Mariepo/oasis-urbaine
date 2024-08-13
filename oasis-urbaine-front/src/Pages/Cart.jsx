import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import DeliveryMethodsService from "../Services/DeliveryMethodsService";
import PaymentMethodsService from "../Services/PaymentMethodsService";

function Cart() {
  const { cartItems } = useContext(CartContext);
  // Méthodes de livraison
  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(1);
  const selectedDeliveryMethod = deliveryMethods.find(deliveryMethod => deliveryMethod.id === selectedDeliveryMethodId);

  // Méthodes de paiement
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(1);

  // Total
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
  const fetchPaymentMethods = async () => {
    try {
      const response = await PaymentMethodsService.fetchPaymentMethods();
      setPaymentMethods(response.data);
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

  const handleDeliveryChange = (event) => {
    // Passer l'id d'un string à un nombre
    setSelectedDeliveryMethodId(Number(event.target.value));
    // const deliveryMethodId = event.target.value;
    // const price2 = deliveryIdToPrice(deliveryMethodId);
    // setSelectedDeliveryPrice(price)
    // setSelectedDeliveryMethod({id:deliveryMethodId, price:price2});
  }

  const handlePaymentChange = (event) => {
    setSelectedPaymentMethodId(Number(event.target.value));
  }


  useEffect( () => {
    fetchDeliveryMethods();
    fetchPaymentMethods();
  }, []);

  const formatPrice = (price) => {
    const roundedPrice = Number(price).toFixed(2);
    return roundedPrice.endsWith(".00") ? Math.round(price) : roundedPrice;
  }

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
        {cartItems.length > 0 && (
          <>
            <section>
              <h2>Paiement</h2>
              {paymentMethods.map((paymentMethod) => (
                  <Form.Check type="radio" name="payment" id={`payment-${paymentMethod.id}`} key={paymentMethod.id} label={paymentMethod.name} value={paymentMethod.id} onChange={handlePaymentChange} checked={paymentMethod.id === selectedPaymentMethodId}
                  />
              ))}
            </section>
          </>
        )}
        {cartItems.length > 0 && (
          <>
            <section>
              <h2>Mode de livraison</h2>
              {deliveryMethods.map((deliveryMethod) => (
                  <Form.Check type="radio" name="delivery" id={`delivery-${deliveryMethod.id}`} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleDeliveryChange} checked={deliveryMethod.id === selectedDeliveryMethodId}
                  />
              ))}
            </section>
          </>
        )}
        {cartItems.length > 0 && (
          <>
            <section className="text-end">
              <hr />
              <p>Sous-total : {subtotal}€</p>
              <p>Livraison : {selectedDeliveryMethod ? `${formatPrice(selectedDeliveryMethod.price)}€` : 'Aucune'}</p>
              <p>Total : {total}€</p>
            </section>
          </>
        )}
      </main>
    </Container>
  );
}

export default Cart;
