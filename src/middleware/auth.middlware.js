const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config/config");


async function authMiddleware(req, res, next){

    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({
            message: "Unauthorized access. Token is missing"
        });
    }

    try{
        const decoded = jwt.verify(token, config.JWT_KEY);
        
        const user = await userModel.findById(decoded.userId);

        req.user = user;

        return next();
        
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized access. Invalid token."
        });  
    }
}

module.exports = authMiddleware;