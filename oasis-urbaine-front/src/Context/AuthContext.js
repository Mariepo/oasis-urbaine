import { createContext } from "react";

// Création du contexte
const AuthContext = createContext({
    isAuthenticated : false,
    setIsAuthenticated : () => {},
    token : null,
    setToken : () => {}, 
})

export default AuthContext;

