const Categories = require("../Models/Categories");
const Products = require("../Models/Products");

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
    
    async getProductsByCategoryId(id) {
        return await Categories.findByPk(id, {
            include: [{
                model: Products,
                as: 'products',
            }]
        });
    }

}

module.exports = new CategoriesService();