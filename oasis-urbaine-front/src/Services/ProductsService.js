import axios from 'axios';

class ProductsService {
    static fetchProducts(){
        return axios.get('http://127.0.0.1:3001/products');
    }


    // static fetchProductsById(){
    //     return axios.get('http://127.0.0.1:3001/products'+id);
    // }

}

export default ProductsService;