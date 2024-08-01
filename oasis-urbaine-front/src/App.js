import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";

// Components and pages
import ProductsPage from "./Pages/ProductsPage";
import Homepage from "./Pages/Homepage";
import NavbarComponent from './Components/NavbarComponent';
import Headerbanner from './Components/Headerbanner';
import FooterComponent from './Components/FooterComponent';
import FilteredProductsPage from './Pages/FilteredProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Headerbanner></Headerbanner>
      <NavbarComponent></NavbarComponent>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/categories' element={<ProductsPage />} />
        <Route path='/categories/:id/products' element={<ProductsPage />} />
      </Routes>
      <FooterComponent></FooterComponent>
    </BrowserRouter>
  );
}

export default App;
