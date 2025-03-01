const joi = require("joi");


const signupValidation = (req,res,next)=>{
    const Schema = joi.object({
        name: joi.string().min(3).max(20).required(),
        email:joi.string().min(6).max(50),
        password:joi.string().min(4).max(20)
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Validation Error" , success:false});
    }
    next();
}
const loginValidation = (req,res,next)=>{
    const Schema = joi.object({
        email:joi.string().min(6).max(50),
        password:joi.string().min(4).max(20)
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Validation Error" , success:false});
    }
    next();
}

const productValidation = (req,res,next)=>{
    const Schema = joi.object({
        productId:joi.string().min(3).max(20).required(),
        productName:joi.string().min(3).max(20).required(),
        productPrice:joi.number().required(),
        productDescription:joi.string().min(3).max(500).required(),
        productCategory:joi.string().min(3).max(20).required(),
        productImage:joi.string().min(3).max(100).required(),
        productRating:joi.number().required()
    });
    const {error} = Schema.validate(req.body);
    if(error){
        return res.status(400).json({message:"Validation Error" , success:false});
    }
    next();
}

module.exports= {signupValidation, loginValidation, productValidation};