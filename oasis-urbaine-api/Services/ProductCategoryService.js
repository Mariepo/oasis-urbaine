// services/ProductCategoryService.js
const ProductCategory = require('../Models/ProductCategory');

class ProductCategoryService {
    async addProductCategory(id_product, id_category) {
        return await ProductCategory.create({ id_product, id_category });
    }

    async getCategoriesByProductId(id) {
        return await ProductCategory.findAll({
            where: { 
                id : id 
            }
        });
    }

    async deleteProductCategoryByProductId(id) {
        return await ProductCategory.destroy({
            where: { 
                id_product : id 
            }
        });
    }
}

module.exports = new ProductCategoryService();
