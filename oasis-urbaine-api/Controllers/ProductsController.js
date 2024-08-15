const ProductCategoryService = require('../Services/ProductCategoryService');
const ProductsService = require('../Services/ProductsService')

class ProductsController {

    async getAllProducts(request, result)  {
        try {
            const products = await ProductsService.getAllProducts();
            result.json(products);

        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération des produits"});
        }
    }

    async getProductById(request, result) {
        try {
            const product = await ProductsService.getProductById(request.params.id);
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération du produit"});
        }
    }

    // Commentaire : on ajoute les catégorie dans le corps de la requête
    async addProduct(request, result){
        try {
            const product = await ProductsService.addProduct(request.body);
            const productCategories = request.body.categories || [];
            for (let category of productCategories) {
                await ProductCategoryService.addProductCategory(product.id, category.id_category);
            }
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de l'ajout du produit"});            
        }
    }


    async updateProduct(request, result) {
        try {
            const product = await ProductsService.updateProduct(request.params.id, request.body);
            const productCategories = request.body.categories || [];
            for (let category of productCategories) {
                await ProductCategoryService.addProductCategory(request.params.id, category.id_category);
            }
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la modification du produit"});              
        }
    }

    async deleteProduct(request, result) {
        try {
            const product = await ProductsService.deleteProduct(request.params.id);
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la suppression du produit"});                 
        }
    }
}

module.exports = new ProductsController();