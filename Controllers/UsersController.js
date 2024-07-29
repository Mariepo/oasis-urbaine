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

    async getUserById(request, result) {
        try {
            const user = await UsersService.getUserById(request.params.id);
            result.json(user);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la récupération de l'utilisateur"});            
        }
    }

    async addUser(request, result) {
        try {
            const user = await UsersService.addUser(request.body);
            result.json(user);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la création de l'utilisateur"});               
        }
    }

}

module.exports = new UsersController();