const UsersService = require("../Services/UsersService");

class UsersController {

    async getAllUser(request, result){
        try {
            const users = await UsersService.getAllUsers();
            result.json(users);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération des utilisateurs"});
        }
    }

}

module.exports = new UsersController();