const mongoose =require('mongoose');
const {ObjectId} = mongoose.Schema;
const jobTypeSchema= new mongoose.Schema({
    jobcategories:{
        type:String,
        trim:true,
        maxlength:70,
        required:[true,'Job Categories is required']
    },
    user:{
        type:ObjectId,
        ref:"User",
        required:true,
    }

},{timestamps:true})


module.exports= mongoose.model('JobType',jobTypeSchema);