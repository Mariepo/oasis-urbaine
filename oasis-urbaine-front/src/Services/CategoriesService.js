import axios from "axios";
import URL from "./config";

class CategoriesService {
    static fetchCategories() {
        return axios.get(`${URL}/categories`);
    }

    static addCategory(category) {
        return axios.post(`${URL}/categories`, category)
    }

    static editCategory(id, category) {
        return axios.patch(`${URL}/categories/${id}`, category)
    }

    static deleteCategory(id){
        return axios.delete(`${URL}/categories/${id}`)
    }
}

export default CategoriesService;