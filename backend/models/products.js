const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String, required: true },
    productCategory: { type: String, required: true },
    productImage: { type: String, required: true },
    productRating: { type: Number, required: true },

}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);