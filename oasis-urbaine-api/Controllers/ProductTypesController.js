const ProductTypesService = require('../Services/ProductTypesService');

class ProductTypesController {

    async getAllProductTypes(request, result)  {
        try {
            const productTypes = await ProductTypesService.getAllProductTypes();
            result.json(productTypes);

        } catch (error) {
            result.status(500);
            console.json({error : "Une erreur est survenue lors de la récupération des variétés dees produits"});
        }
    }
}

module.exports = new ProductTypesController();