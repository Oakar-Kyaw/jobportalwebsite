const User= require('../model/usermodel');

const ErrorResponse = require('../util/erroresponse');

//sign up
exports.signup= async (req,res,next)=>{
   const {email}=req.body;
   const isExisted= await User.findOne({email});
   if(isExisted){
      
      return next(new ErrorResponse('Email is already registered',400))
   }
   try{
    let user= await User.create(req.body);
    res.status(201).json({
        success:true,
        user
    }
    )

   }catch(error){
      next(error);
   }
}

//sign in

exports.signin= async function(req,res,next){
   const {email,password}=req.body;
   
   if(!email){
      return next(new ErrorResponse('Please add a email',400));
   }
   if(!password){
      return next(new ErrorResponse('Please add a password',400))
   }

   //find user using email
   let user= await User.findOne({email});
   if(!user){
      return next(new ErrorResponse("User doesn't exist ",400));
   }

   //password is matched or not
   let isMatch= await user.comparePassword(password);
   if(!isMatch){
      return next(new ErrorResponse("Password doesn't Match",400))
   }
  let usernotpassword= await User.findOne({email}).select("-password");
  sendJsonWebToken(usernotpassword,204,res);
   
}

const sendJsonWebToken=async function(user,statusCode,res){
   let token= await user.getjsontoken();
  
   res
   .cookie('token',token,{maxAge:4*60*60*1000, httpOnly: true,secure:true,sameSite:"strict"})
   .json({success:true,token,user});
   console.log("this is console")
}

//logout
exports.logout= function(req,res,next){
   res.clearCookie('token');
   res
   .json({
      success:true,
      message:"Successfully logout"
   })
}

//user profile
exports.userprofile= async function(req,res){
   //findbyuserid
   let user= await User.findById(req.user.id).select("-password");
   let count= user.jobhistory.length;
   return res
   .status(200)
   .json({
      success:true,
      user,
      count:count
   });
}

