const Products = require('../Models/Products');

class ProductsService {

        async getAllProducts(){
            return await Products.findAll({include: ['categories']});
        }

        async getProductById(id){
            return await Products.findByPk(id);
        }

        async addProduct(product) {
            return await Products.create(product);
        }

        async updateProduct(id, product) {
            return await Products.update(product, {
                where : {
                    id : id
                }
            })
        }

        async deleteProduct(id) {
            return await Products.destroy({
                where : {
                    id : id
                }
            })
        }

}

module.exports = new ProductsService();