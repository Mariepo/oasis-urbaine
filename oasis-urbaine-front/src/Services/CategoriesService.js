import axios from "axios";

class CategoriesService {
    static fetchCategories() {
        return axios.get('http://127.0.0.1:3001/categories');
    }
}

export default CategoriesService;