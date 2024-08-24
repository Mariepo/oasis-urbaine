import axios from 'axios';
import SERVER_URL from './config';

class ProductsService {
    static fetchProducts() {
        return axios.get(`${SERVER_URL}/products`);
    }

    static fetchProductsById(id) {
        return axios.get(`${SERVER_URL}/products/${id}`);
    }

    static fetchProductsByCategory(id) {
        return axios.get(`${SERVER_URL}/categories/${id}/products`);
    }

    static addProduct(product) {
        return axios.post(`${SERVER_URL}/products/`, product)
    }

    static deleteProduct(id) {
        return axios.delete(`${SERVER_URL}/products/${id}`)
    }

    static editProduct(id, product) {
        return axios.patch(`${SERVER_URL}/products/${id}`, product)
    }
}

export default ProductsService;
