
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Authverify from "../Component/Authverify";
import { ToastContainer } from "react-toastify";
import { successMessage, errorMessage } from "../Component/ToastMessage";
import { refreshNavbarCart } from "../Component/Navbar"; // Import directly from Navbar

export default function ProductCard() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const verifyUser = async () => {
            const userData = await Authverify();
            if (!userData) {
                navigate("/"); 
            }
        };

        verifyUser();
    }, [navigate]);

    const getProducts = async () => {
    try{
      const url ="http://localhost:8000/product";
      const responce = await fetch(url,{
        method: "GET",
        headers:{
          "Content-Type": "Application/json"
        }
        
      });
      const jsonData = await responce.json();
      const {success,message, error} = jsonData;
      if(!success){
        errorMessage(message);
      }else if(error){
        errorMessage(message);
      }else{
        setProducts(jsonData.products);
      }

    }catch(error){
      errorMessage("No Product Found");
    }
  };
  
  useEffect(() => {
    getProducts(); 
  }, []);

const addToCart = async (product) => {
  const userData = await Authverify();
  if (!userData) {
      navigate("/login");
      return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
      errorMessage("User not authenticated. Please log in.");
      navigate("/login");
      return;
  }

  setLoading(true); // Show loading state

  try {
       const response = await fetch("http://localhost:8000/cart", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
              productId: product.productId,
              productName: product.productName,
              productPrice: product.productPrice,  
              productImage: product.productImage,
          }),
      });
      
      if (response.ok) {
          successMessage("Product added to cart!");
          
          // Call the imported refresh function directly
          await refreshNavbarCart();
          
          setLoading(false);
      } else {
          errorMessage("Failed to add product to cart.");
          setLoading(false);
      }

  } catch (error) {
      console.error("Error adding product to cart:", error);
      errorMessage("Failed to add product to cart.");
      setLoading(false);
  }
};

    return (
        <div className="container">
            {loading && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
                     style={{ backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1050 }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            <h2 className="text-center my-4">Our Products</h2>
            <div className="row">
                {products.map((product) => (
                    <div key={product.productId} className="col-md-4 col-sm-6 col-lg-3 mb-4">
                        <div className="card shadow-sm border-0">
                            <img
                                src={`http://localhost:8000/uploads/${product.productImage}`}
                                className="card-img-top p-3"
                                alt={product.productName || "No title"}
                                style={{ height: "250px", objectFit: "contain" }}
                            />
                            <div className="card-body text-center">
                                <h6 className="card-title"
                                    onClick={() => navigate(`/product/${product.productId}`)}
                                    style={{ cursor: "pointer" }}>{product.productName || "Untitled Product"}
                                </h6>
                                <p className="text-muted">
                                    {product.productDescription.substring(0, 50) || "No description"}...
                                </p>
                                <h5 className="text-danger">₹{product.productPrice || "N/A"}</h5>

                                <div className="mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <FaStar key={i} color={i < (product.productRating || 0) ? "gold" : "lightgray"} />
                                    ))}
                                </div>

                                <div className="d-flex justify-content-center gap-2">
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => addToCart(product)}>
                                        <FaShoppingCart /> Add to Cart
                                    </button>
                                    <button className="btn btn-success btn-sm">Buy Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <ToastContainer />
        </div>
    );
}