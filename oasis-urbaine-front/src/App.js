// CSS
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';

// Dom router
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Components and pages
import { ToastContainer } from 'react-toastify';
import ProductsPage from "./Pages/ProductsPage";
import Homepage from "./Pages/Homepage";
import NavbarComponent from './Components/NavbarComponent';
import Headerbanner from './Components/Headerbanner';
import FooterComponent from './Components/FooterComponent';
import ProductDetailsPage from './Pages/ProductDetailsPage';
import LoginPage from './Pages/LoginPage';
import AuthContext from './Context/AuthContext';
import { useState } from 'react';
import AccountPage from './Pages/AccountPage';
import ErrorPage from './Pages/ErrorPage';
import UserService from './Services/UserService';
import SignupPage from './Pages/SignupPage';

function App() {
  UserService.checkToken();
  const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated)
  const [token, setToken] = useState(window.localStorage.getItem('authToken') ? window.localStorage.getItem('authToken') : null);
  return <>
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated, token, setToken}}>
    <BrowserRouter> 
      <Headerbanner></Headerbanner>
      <NavbarComponent></NavbarComponent>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<ProductDetailsPage />} />
        <Route path='/categories' element={<ProductsPage />} />
        <Route path='/categories/:id/products' element={<ProductsPage />} />
        {isAuthenticated && <Route path='/account' element={<AccountPage />} />}
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/*' element={<ErrorPage />} />
      </Routes>
      <FooterComponent></FooterComponent>
      <ToastContainer autoClose={10000} />
    </BrowserRouter>
    </AuthContext.Provider>
  </>;
}

export default App;
