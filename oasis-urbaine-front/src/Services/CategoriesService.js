import axios from "axios";

class CategoriesService {
    static fetchCategories() {
        return axios.get('http://127.0.0.1:3001/categories');
    }

    static addCategory(category) {
        return axios.post('http://127.0.0.1:3001/categories', category)
    }

    static editCategory(id, category) {
        return axios.patch(`http://127.0.0.1:3001/categories/${id}`, category)
    }

    static deleteCategory(id){
        return axios.delete(`http://127.0.0.1:3001/categories/${id}`)
    }
}

export default CategoriesService;