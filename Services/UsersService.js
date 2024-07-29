const Users = require("../Models/Users");

class UsersService {
    
    async getAllUsers() {
        return await Users.findAll();
    }
}

module.exports = new UsersService();