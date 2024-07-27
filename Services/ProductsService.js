const Products = require('../Models/Products');

class ProductsService {

        async getAllProducts(){
            return await Products.findAll();
        }
}

module.exports = new ProductsService();