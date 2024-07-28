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
            const product = await ProductsService.getProductById(request.params.productId);
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération du produit"});
        }
    }

    async addProduct(request, result){
        try {
            const product = await ProductsService.addProduct(request.body);
            result.json(product);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de l'ajout du produit"});            
        }
    }
}

module.exports = new ProductsController();