import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class UsersService {

    static loginUser(user){
        return axios.post('http://127.0.0.1:3001/users/login', user);
    }

    static signupUser(user){
        return axios.post(`http://127.0.0.1:3001/users/signup`, user)
    }
    
    static getUserId() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            try {
                const tokenData = jwtDecode(token);
                return tokenData.id; 
            } catch (error) {
                console.error("Erreur lors du décodage du token", error);
                return null;
            }
        }
        return null;
    }

    static getUserById(id){
        return axios.get(`http://127.0.0.1:3001/users/${id}`)
    }

    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    static checkToken() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const {exp: expiration} = jwtDecode(token);
            if(expiration * 1000 > new Date().getTime()) {
                UsersService.setAxiosToken(token);
            } else {
                UsersService.logout();
            }
        } else {
            UsersService.logout();
        }
    }  

    static isAuthenticated() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const {exp: expiration} = jwtDecode(token);
            if(expiration * 1000 > new Date().getTime()) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    static logout() {
        window.localStorage.removeItem("authToken");
        delete axios.defaults.headers["Authorization"];
    }
    
}



export default UsersService
