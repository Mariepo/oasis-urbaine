import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductsPage from "./Pages/ProductsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/products' element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
