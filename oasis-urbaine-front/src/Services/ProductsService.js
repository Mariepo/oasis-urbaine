import axios from 'axios';

class ProductsService {
    static fetchProducts() {
        return axios.get('http://127.0.0.1:3001/products');
    }

    static fetchProductsByCategory(id) {
        return axios.get(`http://127.0.0.1:3001/categories/${id}/products`);
    }
}

export default ProductsService;
