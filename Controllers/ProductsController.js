const ProductsService = require('../Services/ProductsService')

class ProductsController {

    async getAllProducts(request, result)  {
        try {
            const products = await ProductsService.getAllProducts();
            result.json(products);

        } catch (error) {
            result.status(500);
            console.json({error : "Une erreur est survenue lors de la récupération des produits"});
        }
    }
}

module.exports = new ProductsController();