import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

class UserService {

    static loginUser(user){
        return axios.post(`http://127.0.0.1:3001/users/login`, user);
    }
    
    static setAxiosToken(token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token;
    }

    static checkToken() {
        const token = window.localStorage.getItem("authToken");
        if (token) {
            const {exp: expiration} = jwtDecode(token);
            if(expiration * 1000 > new Date().getTime()) {
                UserService.setAxiosToken(token);
            } else {
                UserService.logout();
            }
        } else {
            UserService.logout();
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



export default UserService
