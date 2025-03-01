import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import products from "./ProductList"; // Ensure this file exports an array
import { useCart } from "./CartContext";

export default function ProductDetails() {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const { addToCart } = useCart(); // Use Cart Context
  const product = products.find((p) => p.id === parseInt(id)); // Convert id to number

  // console.log("Product ID:", id);
//   console.log("Product List:", products);
  // console.log("Found Product:", product);

  if (!product) {
    return <h2 className="text-center mt-5 text-danger">Product not found</h2>;
  }

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        Back
      </button>

      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image || "https://via.placeholder.com/400"}
            alt={product.title}
            className="img-fluid"
          />
        </div>
        <div className="col-md-6">
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h4 className="text-danger">₹{product.price}</h4>

          <div className="mb-2">
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} style={{ color: i < product.rating ? "gold" : "lightgray" }}>
                ★
              </span>
            ))}
          </div>

          <button className="btn btn-outline-primary" onClick={() => addToCart(product)}>
            <FaShoppingCart /> Add to Cart
          </button>
          <button className="btn btn-success ms-2">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
