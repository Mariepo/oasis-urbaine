import axios from "axios";

class CategoriesService {
    static fetchCategories() {
        return axios.get('http://127.0.0.1:3001/categories');
    }

    static addCategorie(categorie) {
        return axios.post('http://127.0.0.1:3001/categories', categorie)
    }

    static editCategorie(id, categorie) {
        return axios.patch(`http://127.0.0.1:3001/categories${id}`, categorie)
    }

    static deleteCategorie(id){
        return axios.delete(`http://127.0.0.1:3001/categories${id}`)
    }
}

export default CategoriesService;