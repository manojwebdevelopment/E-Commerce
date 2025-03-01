const jwt = require("jsonwebtoken");

const authCheck =(req, res, next) =>{
    const authHeader = req.headers['authorization'];
    // console.log("Auth Header:", authHeader);
    
    if(!authHeader){
        return res.status(403).json({message:"Authorization fails", success:false});
    }

    const token = authHeader.replace("Bearer ", "");

    if(!token){
        return res.status(403).json({message: "Token not found", success:false});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(403).json({message:"Invalid token", success:false});
        }
        req.user = decoded;
        next();
    }catch(error){
        return res.status(500).json({message: "Internal Server Problem", success:false});
    }
}

module.exports = authCheck;