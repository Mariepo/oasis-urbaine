import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import SERVER_URL from './config';

class UsersService {

    static loginUser(user){
        return axios.post(`${SERVER_URL}/users/login`, user);
    }

    static signupUser(user){
        return axios.post(`${SERVER_URL}/users/signup`, user)
    }

    static editUser(id, user){
        return axios.patch(`${SERVER_URL}/users/${id}`, user)
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
        return axios.get(`${SERVER_URL}/users/${id}`)
    }

    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
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
    
    static checkToken() {
        if (UsersService.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            UsersService.setAxiosToken(token);
        } else {
            UsersService.logout();
        }
    }  

    static isAdmin(){
        if (UsersService.isAuthenticated()) {
            const token = window.localStorage.getItem("authToken");
            const { is_admin } = jwtDecode(token);
            return is_admin === 1;
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
