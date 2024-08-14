const Products = require('../Models/Products');
const Categories = require('../Models/Categories');

class ProductsService {

    async getAllProducts() {
        return await Products.findAll({ include: ['categories'], order: [['created_at', 'DESC']] });
    }

    async getProductById(id) {
        return await Products.findByPk(id, {
            include: [{
                model: Categories,
                as: 'categories',
            }]
        });
    }

    async addProduct(product) {
        return await Products.create(product);
    }

    async updateProduct(id, product) {
        return await Products.update(product, {
            where: {
                id: id
            }
        });
    }

    async deleteProduct(id) {
        return await Products.destroy({
            where: {
                id: id
            }
        });
    }
}

module.exports = new ProductsService();
