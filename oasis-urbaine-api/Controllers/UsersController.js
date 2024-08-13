const UsersService = require("../Services/UsersService");
const AuthenticateController = require("./AuthenticateController");

class UsersController {

    async getAllUsers(request, result){
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

    async updateUser(request, result) {
        try {
            const user = await UsersService.updateUser(request.params.id, request.body);
            result.json(user);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la modification de l'utilisateur"});
        }
    }

    async deleteUser(request, result){
        try {
            const user = await UsersService.deleteUser(request.params.id);
            result.json(user);
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la suppression de l'utilisateur"});
        }
    }

    async loginUser(request, result) {
        try {
            const {email, password} = request.body;
            const user = await UsersService.loginUser(email, password);
            // Générer le token à la connexion
            result.json({token : AuthenticateController.generateToken(user)});
            // const newToken = AuthenticateController.generateToken(user)
            // result.json({token : newToken});

            // const toto = await UsersService.updateUser(user.id, {"token": newToken});
        } catch (error) {
            result.status(500);
            result.json({error : "Une erreur est survenue lors de la connexion"});            
        }
    }

}

module.exports = new UsersController();