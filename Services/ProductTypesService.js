const ProductTypes = require('../Models/ProductTypes');

class ProductTypesService {

        async getAllProductTypes(){
            return await ProductTypes.findAll();
        }
}

module.exports = new ProductTypesService();