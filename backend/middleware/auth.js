const jwt  = require("jsonwebtoken");
const User = require("../model/usermodel");

const ErrorResponse = require("../util/erroresponse");


exports.isAuthenticated=async function(req,res,next){
   
    let {token}=req.cookies;
    if(!token){
        return next(new ErrorResponse("Not Authenticated",300));
    }
    try {
        //verify token
        let decoded=jwt.verify(token,process.env.JSONWEBTOKEN);
        req.user= await User.findById(decoded.id);
        next();
    } catch (error) {
        console.log(error)
    }
}

//check the user is admin or not 
exports.isAdmin = function(req,res,next){
   
    if(req.user.role==0){
        return next(new ErrorResponse("The user is not admin. So the user can't make the thing that the admin can do",403))
    };
    next();
}