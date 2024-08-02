import axios from 'axios';

class UserService {

    static loginUser(user){
        return axios.post(`http://127.0.0.1:3001/users/login`, user);
    }
}

export default UserService
