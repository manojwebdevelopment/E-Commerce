const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/authDB"); 
const jwt = require("jsonwebtoken");
const { signupValidation ,loginValidation} = require("../middleware/validation");

const router = express.Router();

router.post("/signup", signupValidation, async (req, res) => {
    try {
        const { name, email, password } = req.body;

       
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists", success: false });
        }

     
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });

        
        await newUser.save();

        return res.status(201).json({ message: "Signup successful", success: true });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});

router.post("/login",loginValidation,async(req,res)=>{

    try{
        const {email,password}= req.body;

        if(!email || !password){
            return res.status(400).json({message:"User Email or Password are required", success:false});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(403).json({message:"This Email id not fetch my database oops!", success:false});
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if(!ismatch){
            return res.status(403).json({
                message:"Authentication failed. Username or password is incorrect",
                success: false
            });
        }

        const jwtToken = jwt.sign(
            {name:user.name,id:user._id},
            process.env.JWT_SECRET,
            {expiresIn: "24h"}
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            email: user.email,
            name: user.name,
            token: jwtToken,
          });

    }
    catch(error){
        return res.status(500).json({message:"Internal Server Problem", success:false});
    }
});

router.post("/userverify", async (req, res) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        if (!token) {
            return res.status(400).json({ message: "Token not found", success: false });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ message: "Invalid token", success: false });
        }

        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }

        return res.status(200).json({ message: "User verified", success: true, user });
    } catch (error) {
        console.error("User verify error:", error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
});

module.exports = router;
