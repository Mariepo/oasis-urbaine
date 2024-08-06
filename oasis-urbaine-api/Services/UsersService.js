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

    async updateUser(id, user){
        return await Users.update(user, {
            where : {
                id : id
            },
            individualHooks : true
        })
    }

    async deleteUser(id) {
        return await Users.destroy({
            where : {
                id : id
            }
        })
    }

    async loginUser(email, password) {
        const user = await Users.findOne({where : { email : email}})
        if (!user || !await user.validatePassword(password)){
            throw new Error("Email ou mot de passe incorrect");
        }
        return user;
    }
}

module.exports = new UsersService();
