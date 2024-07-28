const Categories = require("../Models/Categories");

class CategoriesService {
    async getAllCategories() {
        return await Categories.findAll();
    }

    async getCategoryById(id){
        return await Categories.findByPk(id);
    }

    async addCategory(category){
        return await Categories.create(category);
    }

    async updateCategory(id, category){
        return await Categories.update(category, {
            where : {
                id : id
            }
        })
    }

    async deleteCategory(id){
        return await Categories.destroy({
            where : {
                id : id
            }
        })
    }

}

module.exports = new CategoriesService();