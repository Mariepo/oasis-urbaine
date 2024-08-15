const ProductCategoryService = require('../Services/ProductCategoryService');

class ProductsCategoryController {

    async addProductCategory(request, result){
        try {
            const { id_product, id_category } = request.body;
            const productCategory = await ProductCategoryService.addProductCategory(id_product, id_category);
            result.json(productCategory);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de l'ajout de la catégorie au produit"});            
        }
    }

    async deleteProductCategoryByProductId(request, result){
        try {
            const productCategory = await ProductCategoryService.deleteProductCategoryByProductId(request.params.id);
            result.json(productCategory);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la suppression de la catégorie associée au produit"});            
        }
    }

}

module.exports = new ProductsCategoryController();