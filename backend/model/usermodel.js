const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const {ObjectId} =mongoose.Schema;
const jwt= require('jsonwebtoken');
const saltRounds=10;

const jobHistorySchema= new mongoose.Schema({

  title:{
      type:String,
      trim:true,
      maxlength:70,
      required:[true,'Title is required']
  },
  description:{
      type:String,
      trim:true,
      required:[true,'Description is required']
  },
  salary:{
      type:String,
      trim:true,
      required:[true,'Salary is required']
  },
  location:{
      type:String,
  },

  interviewdate:{
      type:Date,
  },
  applicationstatus:{
    type:String,
    enum:["pending","accepted"],
    default:"pending"
  },
 
  postownername:{
    type:String,
    trim:true,
    maxlength:70,
    required:[true,'Post Owner Name is required']
},

},{timestamps:true})

const userSchema=new mongoose.Schema({
  firstName:{
    type:String,
    trim:true,
    required:[true,"first name is required"],
    maxlength:32
  },
  lastName:{
    type:String,
    trim:true,
    required:[true,"last name is required"],
    maxlength:32
  },
  email:{
    type:String,
    trim:true,
    match: /.+\@.+\..+/,
    unique:true,
    required:[true,"email is required"],
    maxlength:32
  },
  password:{
    type:String,
    trim:true,
    required:[true,"password is required"],
    minlength:[6,'password must have at least 6 characters']
  },
  jobhistory:[jobHistorySchema],
  role:{
    type:Number,
    default:0
  } ,
  accounttype:{
    type:Number,
    required:[true,"account type is required"],
    default:0
  },

},{timestamps:true}
);

//encrypting password before saving
userSchema.pre('save',async function(next){
 
 this.password= await bcrypt.hash(this.password,saltRounds);
 
});

//encrypt password when the user edit
userSchema.methods.encryptpassword= async function(password){
 
  return await bcrypt.hash(password,saltRounds);
  
 };

//compare password
userSchema.methods.comparePassword=async function(enteredpassword){
  return await bcrypt.compare(enteredpassword,this.password);
}

//produce json token
userSchema.methods.getjsontoken= function(){
  return jwt.sign({id:this.id},process.env.JsonWebToken,{
    expiresIn:4*3600,
  });
}

module.exports = mongoose.model('User',userSchema)