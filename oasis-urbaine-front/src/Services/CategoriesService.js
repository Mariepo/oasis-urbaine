import axios from "axios";
import SERVER_URL from "./config";

class CategoriesService {
    static fetchCategories() {
        return axios.get(`${SERVER_URL}/categories`);
    }

    static addCategory(category) {
        return axios.post(`${SERVER_URL}/categories`, category)
    }

    static editCategory(id, category) {
        return axios.patch(`${SERVER_URL}/categories/${id}`, category)
    }

    static deleteCategory(id){
        return axios.delete(`${SERVER_URL}/categories/${id}`)
    }
}

export default CategoriesService;