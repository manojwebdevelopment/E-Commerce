const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

// Router 
const authRouter = require("./router/auth");
const productRouter = require("./router/product");
const cartRouter = require("./router/cart");

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 


mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Database is Connnected"))
.catch((err)=>console.log("Not Connected is database"));

app.use("/auth",authRouter);
app.use("/product",productRouter);
app.use("/cart", cartRouter);
app.use("/uploads", express.static("uploads")); // Serve uploaded images

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
    
})