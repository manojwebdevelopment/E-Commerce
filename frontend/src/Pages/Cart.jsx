import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Authverify from "../Component/Authverify";
import { successMessage, errorMessage } from "../Component/ToastMessage";
import { ToastContainer } from "react-toastify";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartData = async () => {
            const userData = await Authverify();
            if (!userData) {
                navigate("/login"); 
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    errorMessage("User not authenticated. Please log in.");
                    navigate("/login");
                    return;
                }

                const response = await fetch("http://localhost:8000/cart", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const result = await response.json();
                if (response.ok) {
                    setCart(result.cart);
                } else {
                    errorMessage(result.message);
                }
            } catch (error) {
                console.error("Error fetching cart data:", error);
                errorMessage("Failed to load cart.");
            }
        };

        fetchCartData();
    }, []); // Fetch cart on mount

    const removeFromCart = async (productId) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                errorMessage("User not authenticated.");
                return;
            }

            const response = await fetch(`http://localhost:8000/cart/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                setCart(cart.filter((item) => item.productId !== productId));
                successMessage("Product removed from cart!");
            } else {
                const result = await response.json();
                errorMessage(result.message);
            }
        } catch (error) {
            console.error("Error removing product:", error);
            errorMessage("Failed to remove product.");
        }
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.productPrice * item.productQuantity, 0);
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center my-4">Shopping Cart</h2>
            
            {cart.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
            ) : (
                <div className="row">
                    {/* Left Side - Cart Items */}
                    <div className="col-md-8">
                        <ul className="list-group">
                            {cart.map((item) => (
                                <li key={item.productId} className="list-group-item d-flex align-items-center justify-content-between">
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={`http://localhost:8000/uploads/${item.productImage}`}
                                            alt={item.productName}
                                            className="img-thumbnail me-3"
                                            style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                        />
                                        <div>
                                            <h6 className="mb-1">{item.productName}</h6>
                                            <p className="mb-0">Quantity: {item.productQuantity}</p>
                                            <p className="text-danger mb-0">₹{item.productPrice * item.productQuantity}</p>
                                        </div>
                                    </div>
                                    <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.productId)}>
                                        <FaTrash /> Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right Side - Total Price */}
                    <div className="col-md-4">
                        <div className="card p-3 shadow-sm">
                            <h4 className="text-center">Order Summary</h4>
                            <hr />
                            <p className="text-center fs-5"><strong>Total Price:</strong> ₹{getTotalPrice()}</p>
                            <button className="btn btn-primary btn-lg w-100">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}
