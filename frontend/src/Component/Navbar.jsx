

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaShoppingCart } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "./ToastMessage";
import Authverify from "./Authverify";

// Define the refresh function outside the component so it can be exported
let refreshCartCountFunction = null;

export default function Navbar() {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Define the refresh function
    const refreshCartCount = async () => {
        const userData = await Authverify();
        if (!userData) {
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            return;
        }
        
        setIsLoading(true);
        
        try {
            const response = await fetch("http://localhost:8000/cart", {
                method: "GET",
                headers: {
                    "Content-Type": "Application/json",
                    Authorization: `Bearer ${token}`,
                }
            });
            const result = await response.json();

            if (response.ok) {
                const totalItems = result.cart.reduce((sum, item) => sum + item.productQuantity, 0);
                setCartCount(totalItems);
            }
        } catch (error) {
            console.error("Error fetching cart count:", error);
        } finally {
            setIsLoading(false);
        }
    };
  
    // Store the function in the outer variable so it can be exported
    useEffect(() => {
        refreshCartCountFunction = refreshCartCount;
        // Initial load
        refreshCartCount();
    }, []);

    useEffect(() => {
        const verifyUser = async () => {
            const userData = await Authverify();
            if (userData) {
                setUser(userData.user.name);
                setIsLoggedIn(true);
                refreshCartCount();
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("token");
            }
        };

        if (localStorage.getItem("token")) {
            verifyUser();
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        setCartCount(0);
        successMessage("Logged out successfully");
        navigate("/");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm fixed-top">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    🛒 MyStore
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/products">Products</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/contact">Contact</Link>
                        </li>

                        {isLoggedIn && user && (
                            <li className="nav-item">
                                <span className="nav-link text-danger">Welcome, {user} 😊</span>
                            </li>
                        )}
                    </ul>

                    <Link to="/cart" className="btn btn-outline-primary">
                        <FaShoppingCart /> Cart
                        {isLoggedIn ? (
                            <span className="badge bg-danger ms-2">
                                {isLoading ? (
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                ) : (
                                    cartCount
                                )}
                            </span>
                        ) : (
                            <span className="badge bg-danger ms-2"></span>
                        )}
                    </Link>

                    {isLoggedIn ? (
                        <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="btn btn-outline-primary ms-3">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

// Export the function to be used by other components
export const refreshNavbarCart = async () => {
    if (refreshCartCountFunction) {
        return await refreshCartCountFunction();
    }
};