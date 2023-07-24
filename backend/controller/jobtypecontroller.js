const JobType = require('../model/jobtype');
const ErrorResponse = require('../util/erroresponse');

//create and export job type
exports.createJobType =async function (req,res,next){
    try {
        //create job type
        let createJobType= await JobType.create({
            jobcategories:req.body.jobcategories,
            user:req.body.id,
        });
        res 
        .status(200)
        .json({
            success:true,
            createJobType
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error creating job categories',400))
    }
}

//get all job type
exports.jobTypes =async function (req,res,next){
    try {
        //get all job types
        let pageSize= req.query.pageSize ? req.query.pageSize : 5;
        let pageNumber= Number(req.query.pageNumber) || 1; 
        let totalJobType= await JobType.find().countDocuments();
        let allJobsType= await JobType.find()
                               .populate('user','email')
                               .skip(pageSize * (pageNumber-1))
                               .limit(pageSize);
        
        res 
        .status(200)
        .json({
            success:true,
            totaljobtype:totalJobType,
            allJobsType,
            count:Math.ceil(totalJobType/pageSize)
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error gettting job categories',400))
    }
}

//get one job type
exports.singlejobType =async function (req,res,next){
    try {
        //get one job type
        
        let singleJobsType= await JobType.findById(req.params.jobid);
        res 
        .status(200)
        .json({
            success:true,
            singleJobsType
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error gettting one job categories',400))
    }
}

//update job type by id
exports.updateJobType =async function (req,res,next){
    try {
        //update job types by id
        let editJobType= await JobType.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res 
        .status(200)
        .json({
            success:true,
            editJobType
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error updating job categories',400))
    }
}

//delete job type by id
exports.deleteJobType =async function (req,res,next){
    try {
        //delete job types by id
        let deleteJobType= await JobType.findByIdAndDelete(req.params.id,{new:true});
        res 
        .status(200)
        .json({
            success:true,
            message:"Successfully Deleted"
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error deleting job categories',400))
    }
}
