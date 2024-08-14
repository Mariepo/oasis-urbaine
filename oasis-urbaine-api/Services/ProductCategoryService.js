const ProductCategory = require('../Models/ProductCategory');

class ProductCategoryService {
    async addProductCategory(productCategory) {
        return await ProductCategory.create(productCategory);
    }
}

module.exports = new ProductCategoryService();
