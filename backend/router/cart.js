const express = require('express');
const Cart = require('../models/cart');
const authCheck = require('../middleware/authcheck'); // Ensure it's imported only once

const router = express.Router();

// Add product to cart or update quantity
router.post("/", authCheck, async (req, res) => {
    try {
        const { productId, productName, productPrice, productImage } = req.body;
        const userId = req.user.id; // Get user ID from auth middleware

        if (!productId || !productName || !productPrice) {
            return res.status(400).json({ message: "Missing product details!" });
        }

        const existingProduct = await Cart.findOne({ userId, productId });

        if (existingProduct) {
            // Increase quantity and update total price
            const newQuantity = existingProduct.productQuantity + 1;
            const newPrice = newQuantity * productPrice; // Update total price dynamically

            await Cart.updateOne(
                { userId, productId },
                { 
                    $set: { 
                        productQuantity: newQuantity,
                        productPrice: newPrice,  
                        productImage: existingProduct.productImage || productImage
                    }
                }
            );

            res.status(200).json({ message: "Product quantity updated in cart!" });// git
        } else {
            // Add new product to cart
            const newProduct = new Cart({
                userId: req.user.id, // Store user ID in the cart
                productId,
                productName,
                productQuantity: 1,
                productPrice,
                productImage,
            });
            await newProduct.save();
            res.status(201).json({ message: "Product added to cart!" });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

// Get all cart items for the logged-in user
router.get("/", authCheck, async (req, res) => {
    try {
        const userId = req.user.id; // Get user ID from auth middleware
        const cartItems = await Cart.find({ userId }); // Fetch cart items for the logged-in user

        res.status(200).json({ success: true, cart: cartItems });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch cart data", error });
    }
});

// Remove an item from the user's cart
router.delete("/:productId", authCheck, async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id; // Get user ID from auth middleware

        const deletedItem = await Cart.findOneAndDelete({ userId, productId });

        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Product not found in your cart!" });
        }

        res.status(200).json({ success: true, message: "Product removed from cart!" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ success: false, message: "Failed to delete product", error });
    }
});

module.exports = router;
