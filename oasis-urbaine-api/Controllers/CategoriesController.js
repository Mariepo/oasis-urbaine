const CategoriesService = require("../Services/CategoriesService");
const ProductCategoryService = require("../Services/ProductCategoryService");

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

    async addCategory(request, result){
        try {
            const categorie = await CategoriesService.addCategory(request.body);
            result.json(categorie);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de l'ajout de la catégorie"});
        }              
    }

    async updateCategory(request, result){
        try {
            const categorie = await CategoriesService.updateCategory(request.params.id, request.body);
            result.json(categorie);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la modification de la catégorie"});
        }              
    }

    async deleteCategory(request, result){
        try {
            const categorie = await CategoriesService.deleteCategory(request.params.id);
            result.json(categorie);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la suppression de la catégorie"});
        }              
    }

    async getProductsByCategoryId(request, result) {
        try {
            const products = await CategoriesService.getProductsByCategoryId(request.params.id);
            result.json(products);
        } catch (error) {
            result.status(500);
            result.json({ error: "Une erreur est survenue lors de la récupération des produits pour la catégorie" });
        }
    }

}

module.exports = new CategoriesController();