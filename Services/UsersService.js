const Users = require("../Models/Users");

class UsersService {
    
    async getAllUsers() {
        return await Users.findAll();
    }
    
    async getUserById(id) {
        return await Users.findByPk(id);
    }

    async addUser(user){
        return await Users.create(user);
    }
}

module.exports = new UsersService();