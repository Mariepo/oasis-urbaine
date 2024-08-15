import axios from 'axios';

class ProductsService {
    static fetchProducts() {
        return axios.get('http://127.0.0.1:3001/products');
    }

    static fetchProductsById(id) {
        return axios.get('http://127.0.0.1:3001/products/'+id);
    }

    static fetchProductsByCategory(id) {
        return axios.get(`http://127.0.0.1:3001/categories/${id}/products`);
    }

    static addProduct(product) {
        return axios.post('http://127.0.0.1:3001/products/', product)
    }

    static deleteProduct(id) {
        return axios.delete(`http://127.0.0.1:3001/products/${id}`)
    }

    static editProduct(id, product) {
        return axios.patch(`http://127.0.0.1:3001/products/${id}`, product)
    }
}

export default ProductsService;
