import { createContext, useState, useEffect } from 'react';
import { verifyUser } from '../Utils/Api';

// Create a context to store authentication state
export const AuthContext = createContext(null);

export const AuthProvider = ({ child }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const checkUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (token) {
                    const response = await verifyUser();
                    if (response.success) {
                        setIsAuthenticated(true);
                        setUserName(response.user.name);
                    } else {
                        localStorage.removeItem("token");
                        setIsAuthenticated(false);
                    }
                }
            } catch (error) {
                console.error("Error verifying user:", error);
                localStorage.removeItem("token");
                setIsAuthenticated(false);
            }
        };

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}>
            {child}
        </AuthContext.Provider>
    );
};
