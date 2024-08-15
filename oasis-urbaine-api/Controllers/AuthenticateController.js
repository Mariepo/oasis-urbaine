const jwt = require('jsonwebtoken');
const config = require('../Config/config.json');

class AuthenticateController {
    
    authenticateToken(request, result, next){
        // Exemple, authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
        const authHeader = request.headers['authorization'];
        // authHeader.split(' ') divise la chaîne en deux parties et récupère le JWT:
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

    generateToken(user) {
        const userPayload = {
            id : user.id,
            email : user.email,
            user : user.firstname + " " + user.name,
            is_admin : user.is_admin
        }
        return jwt.sign(userPayload, config.SECRET, {expiresIn : "1H"});
    }
}

module.exports = new AuthenticateController();