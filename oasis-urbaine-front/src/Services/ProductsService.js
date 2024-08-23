import axios from 'axios';
import URL from './config';

class ProductsService {
    static fetchProducts() {
        return axios.get(`${URL}/products`);
    }

    static fetchProductsById(id) {
        return axios.get(`${URL}/products/${id}`);
    }

    static fetchProductsByCategory(id) {
        return axios.get(`${URL}/categories/${id}/products`);
    }

    static addProduct(product) {
        return axios.post(`${URL}/products/`, product)
    }

    static deleteProduct(id) {
        return axios.delete(`${URL}/products/${id}`)
    }

    static editProduct(id, product) {
        return axios.patch(`${URL}/products/${id}`, product)
    }
}

export default ProductsService;
