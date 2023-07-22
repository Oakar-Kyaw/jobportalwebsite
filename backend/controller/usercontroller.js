const User = require('../model/usermodel');
const ErrorResponse = require('../util/erroresponse');

//get all users
exports.allusers=async function(req,res){
   
    let pageSize= 5;
    
     let pageNumber= Number(req.query.pageNumber) || 1;
    let usertotal= await User.find().countDocuments();
    
   
    let users= await User.find()
    .select('-password')
    .skip((pageNumber-1)*pageSize)
    .limit(pageSize);
    return res
    .status(200)
    .json(
        {success:true,
            users,
            
            currentPage:pageNumber,
            pageTotal:Math.ceil(usertotal/pageSize),
            totaluser:usertotal,
         
            
            
        });
};

//get single user

exports.singleuser =async function(req,res,next){
    try {
    //find user by using id
    let user= await User.findById(req.params.id).select("-password");
    res
    .status(200)
    .json({
        success:true,
        user
    });
    next();
    } catch (error) {
        console.log(error);
    }


}

//edit user
exports.edituser = async function (req,res,next){
    try {
        let edituser = await User.findById(req.params.id);
        if(req.body.password !=null){
          req.body.password=  await edituser.encryptpassword(req.body.password); 
        }
        
        let user= await User.findByIdAndUpdate(req.params.id,req.body,
            {new:true});
        res
        .status(200)
        .json({
            success:true,
            user
        });
        next();
    } catch (error) {
        return next(new ErrorResponse("Edit error",300))
        
    }
}

//delete user
exports.deleteuser= async function(req,res,next){
    try {
       let user = await User.findByIdAndDelete(req.params.id);
       res
       .status(200)
       .json({
        success:true,
        message:"Successfully deleted"
       });
       next();
    } catch (error) {
        next(new ErrorResponse("User can't delete"))
    }
}