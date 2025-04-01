import { useEffect, useState } from "react";
import { verifyUser } from "./Api";
import { useNavigate } from "react-router-dom";

export default function AuthCheck({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkUser = async () => {
            const response = await verifyUser();
            if (response.success) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem("token"); // Remove invalid token
                navigate("/login"); // Redirect to login
            }
        };
        checkUser();
    }, [navigate]);

    return isAuthenticated ? children : null;
}
