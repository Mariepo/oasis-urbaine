import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form, Button, Card } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import DeliveryMethodsService from "../Services/DeliveryMethodsService";
import PaymentMethodsService from "../Services/PaymentMethodsService";
import OrdersService from "../Services/OrdersService";
import UsersService from "../Services/UsersService";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const id_user = UsersService.getUserId();

  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(1);
  const [user, setUser] = useState([]);

  const selectedDeliveryMethod = deliveryMethods.find(deliveryMethod => deliveryMethod.id === selectedDeliveryMethodId);
  const subtotal = cartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  const total = subtotal + (selectedDeliveryMethod ? Number(selectedDeliveryMethod.price) : 0);

  const fetchData = async () => {
      try {
          const [deliveryResponse, paymentResponse] = await Promise.all([
            DeliveryMethodsService.fetchDeliveryMethods(),
            PaymentMethodsService.fetchPaymentMethods(),
          ]);
          setDeliveryMethods(deliveryResponse.data);
          setPaymentMethods(paymentResponse.data);
          if (id_user) {
            const userResponse = await UsersService.getUserById(id_user);
            setUser(userResponse.data);
          }
      } catch (error) {
          console.log(error);
      }
  }
  useEffect( () => {
    fetchData();
  }, []);

  const addOrder = async () => {
    if(id_user === null) {
      navigate('/login', {state: {from: '/cart'}});
      return
    } else {
      try {
        const order = {
          id_user: id_user,
          id_delivery_method: selectedDeliveryMethodId,
          id_payment_method: selectedPaymentMethodId, 
          items: cartItems.map((item) => ({
            id_product: item.id,
            quantity: item.quantity
          })),      
        };
        await OrdersService.addOrder(order);
        clearCart();
        navigate ("/order-confirmation");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (setter) => (event) => {
    setter(Number(event.target.value));
  }

  // const handleDeliveryChange = (event) => {
  //   setSelectedDeliveryMethodId(Number(event.target.value));
  // }
  // const handlePaymentChange = (event) => {
  //   setSelectedPaymentMethodId(Number(event.target.value));
  // }

  const formatPrice = (price) => {
    const roundedPrice = Number(price).toFixed(2);
    return roundedPrice.endsWith(".00") ? Math.round(price) : roundedPrice;
  }

  if (cartItems.length === 0){
    return (
      <Container>
        <main className="col-md-8 mx-auto mt-5">
          <section>
            <h1>Votre Panier</h1>
            <p>Votre panier est vide</p>
          </section>
        </main>
      </Container>
    )
  }
  
  return (
    <Container>
      <main className="col-md-8 mx-auto my-5">
          <section className="my-5">
            <h1>Votre Panier</h1>
          </section>
        {cartItems.map(item => (
          <CartItem key={item.id} item={item}></CartItem>
        ))}
        <section className="my-5">
          <h2>Mode de livraison</h2>
          {deliveryMethods.map((deliveryMethod) => (
            <Form.Check type="radio" name="delivery" id={`delivery-${deliveryMethod.id}`} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleChange(setSelectedDeliveryMethodId)} checked={deliveryMethod.id === selectedDeliveryMethodId}
            />
          ))}
          {id_user !== null && (
            <Card className="mt-4">
              <Card.Body>
                <div>Adresse : {user.address}, {user.postal_code} {user.city} - {user.email} - {user.phone}</div>
                <Button variant="link ps-0" onClick={()=>{navigate('/edit-address', {state: {from: '/cart'}})}}>Modifier</Button>
              </Card.Body>
            </Card> 
          )} 
        </section>          
        <section className="my-5">
          <h2>Paiement</h2>
          {paymentMethods.map((paymentMethod) => (
            <Form.Check type="radio" name="payment" id={`payment-${paymentMethod.id}`} key={paymentMethod.id} label={paymentMethod.name} value={paymentMethod.id} onChange={handleChange(setSelectedPaymentMethodId)} checked={paymentMethod.id === selectedPaymentMethodId}
            />
          ))}
        </section>
        <section className="text-end">
          <hr />
          <p>Sous-total : {subtotal}€</p>
          <p>Livraison : {selectedDeliveryMethod ? `${formatPrice(selectedDeliveryMethod.price)}€` : 'Aucune'}</p>
          <p>Total : {total}€</p>
          <Button variant="primary" type="submit" onClick={addOrder}>Payer maintenant</Button>
        </section>
      </main>
    </Container>
  );
}

export default Cart;
