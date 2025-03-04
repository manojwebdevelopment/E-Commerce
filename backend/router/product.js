const authCheck = require('../middleware/authcheck');
const express = require('express');
const Product = require('../models/products');
const Cart = require('../models/cart');
const {productValidation} = require('../middleware/validation');
const upload = require('../middleware/multerConfig');

const router = express.Router();

router.post("/", productValidation, upload.single("productImage"), async (req, res) => {
    try {
        const { productId, productName, productPrice, productDescription, productCategory, productRating } = req.body;
        
        console.log("Request Body:", req.body);  // Debugging
        console.log("Uploaded File:", req.file); // Debugging

        if (!productId || !productName || !productPrice || !productDescription || !productCategory || !productRating) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        if (!req.file) {
            return res.status(400).json({ message: "Product image is required", success: false });
        }

        const product = new Product({
            productId,
            productName,
            productPrice,
            productDescription,
            productCategory,
            productImage: req.file.path, // Save image path
            productRating
        });

        await product.save();
        return res.status(201).json({ message: "Product added successfully", success: true });

    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});


router.get("/", async(req,res)=>{
    try{
        const products =await Product.find();
        return res.status(200).json({products, success:true});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error", success:false});
    }
})
router.get("/:productid", async (req, res) => {
    try {
        const productId = req.params.productid; 
        const product = await Product.findOne({ productId });

        if (!product) {
            return res.status(404).json({ message: "Product not found", success: false });
        }

        return res.status(200).json({ product, success: true });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});




module.exports = router;