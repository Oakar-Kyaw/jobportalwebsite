const mongoose =require('mongoose');
const {ObjectId} = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    email :{
        type:String,
        required:true

    }
})
const jobSchema= new mongoose.Schema({
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
    availiable:{
        type:Boolean,
        default:true,
    },
    jobtype:{
        type:ObjectId,
        ref:"JobType",
        required:true,
    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true,
    },
    AppliedUsers:[UserSchema]

},{timestamps:true})


module.exports= mongoose.model('Job',jobSchema);