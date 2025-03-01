const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:"User", required:true},
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    productQuantity: { type: Number, required: true },
    productPrice: { type: Number, required: true },
    productImage: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);