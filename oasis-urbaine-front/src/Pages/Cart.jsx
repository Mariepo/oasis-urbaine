import React, { useContext, useEffect, useState } from "react";
import CartContext from "../Context/CartContext";
import { Container, Form, Button, Card } from "react-bootstrap";
import CartItem from "../Components/CartItem";
import DeliveryMethodsService from "../Services/DeliveryMethodsService";
import PaymentMethodsService from "../Services/PaymentMethodsService";
import OrdersService from "../Services/OrdersService";
import UsersService from "../Services/UsersService";
import ProductsService from "../Services/ProductsService";
import { useNavigate } from "react-router-dom";
import GiftedCartItem from "../Components/GiftedCartItem";
import { toast } from "react-toastify";
import { formatDecimalNumber } from "../utils/formatters";

function Cart() {
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route, { state: { from: '/cart' } });
    window.scrollTo(0, 0);
  }
  const id_user = UsersService.getUserId();

  const [deliveryMethods, setDeliveryMethods] = useState([]);
  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(1);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(1);
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);

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

  const fetchProducts = async () => {
    try {
        const response = await ProductsService.fetchProducts();
        setProducts(response.data);
    } catch (error) {
        console.log(error);
    }
}
  useEffect( () => {
    fetchData();
    fetchProducts();
  }, []);

  const validCartItems = cartItems.filter(item => {
    const productInStock = products.find(product => product.id === item.id);
    return productInStock !== undefined;
  });

  const selectedDeliveryMethod = deliveryMethods.find(deliveryMethod => deliveryMethod.id === selectedDeliveryMethodId);
  const subtotal = validCartItems.reduce((total, item) => total + (item.quantity * item.price), 0);
  const total = subtotal + (selectedDeliveryMethod ? Number(selectedDeliveryMethod.price) : 0);

  const addOrder = async () => {
    if (validCartItems.length === 0) {
      toast.error('Impossible de passer la commande')
      return;
    }
    if(id_user === null) {
      navigateTo('/login');
      return
    } else {
      try {
        const order = {
          id_user: id_user,
          id_delivery_method: selectedDeliveryMethodId,
          id_payment_method: selectedPaymentMethodId, 
          items: validCartItems.map((item) => ({
                id_product: item.id,
                quantity: item.quantity
          }))
        };
        await OrdersService.addOrder(order);
        clearCart();
        navigateTo("/order-confirmation");
      } catch (error) {
        console.log(error);
      }
    }
  }

  const handleChange = (setter) => (event) => {
    setter(Number(event.target.value));
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
  
  return <>
    <Container>
      <main className="col-12 col-lg-8 mx-auto my-5">
          <section className="my-5">
            <h1>Mon panier</h1>
          </section>
        {cartItems.map(item => {
          const productInStock = products.find(product => product.id === item.id);
          return (
            <>
              {!productInStock ? <>
                <CartItem key={item.id} item={item} inStock={'not-in-stock mb-1'} disableClickElement={true} ></CartItem>
                <span className="text-danger">Cet article n'existe plus</span>
                </> : <>
                    <CartItem key={item.id} item={item} redirectOnClick={() => navigate(`/products/${item.id}`)}></CartItem>
                    {cartItems.length > 1 && (<hr />)}
                </>
              }
            </>
          );
        })}
        {cartItems.length >= 1 && (
          <GiftedCartItem/>
        )}
        <section className="my-5">
          <h2 className="cart-title">Mode de livraison</h2>
          {deliveryMethods.map((deliveryMethod) => (
            <Form.Check type="radio" name="delivery" id={`delivery-${deliveryMethod.id}`} key={deliveryMethod.id} label={`${deliveryMethod.name} ${deliveryMethod.description} - ${deliveryMethod.price}€`} value={deliveryMethod.id} onChange={handleChange(setSelectedDeliveryMethodId)} checked={deliveryMethod.id === selectedDeliveryMethodId} className="py-2 py-md-0"
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
          <h2 className="cart-title">Paiement</h2>
          {paymentMethods.map((paymentMethod) => (
            <Form.Check type="radio" name="payment" id={`payment-${paymentMethod.id}`} key={paymentMethod.id} label={paymentMethod.name} value={paymentMethod.id} onChange={handleChange(setSelectedPaymentMethodId)} checked={paymentMethod.id === selectedPaymentMethodId} className="py-2 py-md-0"
            />
          ))}
        </section>
        <section className="text-end">
          <hr className="my-4"/>
          <p>Sous-total : {formatDecimalNumber(subtotal)}€</p>
          <p>Livraison : {selectedDeliveryMethod ? `${formatDecimalNumber(selectedDeliveryMethod.price)}€` : 'Aucune'}</p>
          <p className="cart-total">Total : {formatDecimalNumber(total)}€</p>
          <Button variant="primary" className="my-2 px-5 d-block d-md-inline-block" type="submit" onClick={addOrder} disabled={validCartItems.length === 0} >Payer maintenant</Button>
        </section>
      </main>
    </Container>
    </>;
}

export default Cart;
