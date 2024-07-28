const CategoriesService = require("../Services/CategoriesService");

class CategoriesController {
    async getAllCategories(request, result) {
        try {
            const categories = await CategoriesService.getAllCategories();
            result.json(categories);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération des catégories"});            
        }
    }

    async getCategoryById(request, result){
        try {
            const categorie = await CategoriesService.getCategoryById(request.params.id);
            result.json(categorie);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération de la catégorie"});
        }              
    }
}

module.exports = new CategoriesController();