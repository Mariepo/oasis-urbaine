const Products = require('../Models/Products');

class ProductsService {

        async getAllProducts(){
            return await Products.findAll();
        }

        async getProductById(productId){
            return await Products.findByPk(productId);
        }
}

module.exports = new ProductsService();