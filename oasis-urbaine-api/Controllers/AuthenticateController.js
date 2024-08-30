const jwt = require('jsonwebtoken');
const config = require('../Config/config.json');

class AuthenticateController {

    generateToken(user) {
        const userPayload = {
            id : user.id,
            email : user.email,
            user : user.firstname + " " + user.name,
            is_admin : user.is_admin
        }
        return jwt.sign(userPayload, config.SECRET, {expiresIn : "4H"});
    }
    
    authenticateToken(request, result, next){
        const authHeader = request.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            result.status(401); 
            return result.json({error : "Vous n'avez pas accès à cette fonctionnalité"});
        }
        jwt.verify(token, config.SECRET, (error, user) => {
            if (error) {
                result.status(401); 
                return result.json({error : "Vous token n'est pas valide"});                
            }
        request.user = user;
        next();
        })
    }

    authenticateAdmin(request, result, next) {
        if (request.user && request.user.is_admin) {
            next();
        } else {
            result.status(401); 
            return result.json({error : "Vous n'avez pas accès à cette fonctionnalité"});
        }
    }

}

module.exports = new AuthenticateController();