import { useState } from 'react';
import UsersService from './Services/UsersService';

// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Dom router
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Context
import AuthContext from './Context/AuthContext';
import {CartProvider} from './Context/CartContext';

// Components and pages
import ProductsPage from "./Pages/ProductsPage";
import Homepage from "./Pages/Homepage";
import NavbarComponent from './Components/NavbarComponent';
import Headerbanner from './Components/Headerbanner';
import FooterComponent from './Components/FooterComponent';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import LoginPage from './Pages/LoginPage';
import AccountPage from './Pages/AccountPage';
import ErrorPage from './Pages/ErrorPage';
import SignupPage from './Pages/SignupPage';
import Cart from './Pages/Cart';
import OrderConfirmationPage from './Pages/OrderConfirmationPage';
import EditUserForm from './Pages/EditUserForm';
import ProductsManagementPage from './Pages/Admin/ProductsManagementPage';
import CategoriesManagementPage from './Pages/Admin/CategoriesManagementPage';
import AddProductForm from './Pages/Admin/AddProductForm';
import EditProductForm from './Pages/Admin/EditProductForm';

function App() {
  UsersService.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(UsersService.isAuthenticated)
  const [isAdmin, setIsAdmin] = useState(UsersService.isAdmin);
  const [token, setToken] = useState(window.localStorage.getItem('authToken') ? window.localStorage.getItem('authToken') : null);
  return <>
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken, isAdmin, setIsAdmin}}>
      <CartProvider>
          <BrowserRouter> 
            <Headerbanner></Headerbanner>
            <NavbarComponent></NavbarComponent>
            <Routes>
              <Route path='/' element={<Homepage />} />
              <Route path='/products' element={<ProductsPage />} />
              <Route path='/products/:id' element={<ProductDetailsPage />} />
              <Route path='/categories' element={<ProductsPage />} />
              <Route path='/categories/:id/products' element={<ProductsPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<SignupPage />} />
              <Route path='/cart' element={<Cart/>} />
              <Route path='/*' element={<ErrorPage />} />
              {isAuthenticated && <>
                <Route path='/account' element={<AccountPage />} /> 
                <Route path='/order-confirmation' element={<OrderConfirmationPage/>} />
                <Route path='/edit-address' element={<EditUserForm/>} />
                {isAdmin && <>
                  <Route path='/products-management' element={<ProductsManagementPage />} /> 
                  <Route path='/add-product' element={<AddProductForm />} /> 
                  <Route path='/edit-product/:id' element={<EditProductForm />} /> 
                  <Route path='/categories-management' element={<CategoriesManagementPage/>} /> 
                </>}</>}
            </Routes>
            <FooterComponent></FooterComponent>
            <ToastContainer autoClose={5000} position="bottom-right" pauseOnHover={false}/>
          </BrowserRouter>
        </CartProvider>    
    </AuthContext.Provider>
  </>;
}

export default App;