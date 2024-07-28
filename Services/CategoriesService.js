const Categories = require("../Models/Categories");

class CategoriesService {
    async getAllCategories() {
        return await Categories.findAll();
    }

    async getCategoryById(id){
        return await Categories.findByPk(id);
    }
}

module.exports = new CategoriesService();