import React, { createContext, useState, useEffect } from "react";
import AuthService from '../services/authService';

export const AuthContext = createContext();

export default ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showOnFeed, setShowOnFeed] = useState(null);

    useEffect(() => {
        AuthService.isAuthenticated().then(data => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        })
    }, []);

    return (
        <div>
            {!isLoaded ? <h1>Loading</h1> : 
            <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, showOnFeed, setShowOnFeed}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )

}
