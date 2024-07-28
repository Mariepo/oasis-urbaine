const Products = require('../Models/Products');

class ProductsService {

        async getAllProducts(){
            return await Products.findAll();
        }

        async getProductById(productId){
            return await Products.findByPk(productId);
        }

        async addProduct(product) {
            return await Products.create(product);
        }

}

module.exports = new ProductsService();