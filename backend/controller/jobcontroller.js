const Job = require("../model/jobmodel");
const User= require("../model/usermodel");
const JobType = require("../model/jobtype");
const ErrorResponse = require("../util/erroresponse")



//create job
exports.createJob= async function(req,res,next){
    //create job
    try {
        let createjob= await Job.create({
            title:req.body.title,
            description:req.body.description,
            location:req.body.location,
            salary:req.body.salary,
            jobtype:req.body.jobtype,
            availiable:req.body.availiable,
            user:req.body.id
        });
        res 
        .status(200)
        .json({
            success:true,
            createjob
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error creating Job',403))
    }
}

//get all job
exports.getAllJob= async function(req,res,next){

    try {
        
        //to show total job in admin panel
        let totaljobs= await Job.find().countDocuments();
        //search by location
        let locations=[];
        let jobbylocation=await Job.find({},{location:1});
        jobbylocation.forEach((job)=>{
           locations.push(job);
        })
        let setUniqueLocation= [...new Set(locations)]
        let location= req.query.location ;
        //search by keyword
        
        let keyword=req.query.keyword ;
        
        let ids=[];
        let jobCategories= await JobType.find({},{_id:1});
        jobCategories.forEach((cat)=>{
            ids.push(cat._id);
        })


        //search by job type
        let cates= req.query.cates ;
       
        let pageSize=5;
        let pageNumber= Number(req.query.pageNumber) || 1;
       
        //get all job from database
        //using populate for their data at database interconnection
        
        let query = {};

        if (keyword) {
          query.title = {$regex:keyword,$options:"i"};
        }
        if (location) {
          query.location = location;
        }

        if (cates) {
           query.jobtype = cates;
         }

         let getAllJobs;
         let count;
         if (query.length === 0) {
           count= await Job.find().countDocuments();
           getAllJobs = await Job.find()
                        .populate('jobtype','jobcategories')
                        .populate('user','firstName'+' '+'lastName')
                        .skip(pageSize*(pageNumber-1))
                        .limit(pageSize);
         } else {
           count= await Job.find(query).countDocuments();
           getAllJobs = await Job.find(query)
                              .populate('jobtype','jobcategories')
                              .populate('user','firstName'+' '+'lastName')
                              .skip(pageSize*(pageNumber-1))
                              .limit(pageSize);
         }
      
        res
        .status(200)
        .json({
            success:true,
            getAllJobs,
            jobPageTotal:Math.ceil(count/pageSize),
            pageNumber:pageNumber,
            keyword:keyword,
            totaljobs:totaljobs,
            count:count,
            locations:locations,
            cate:cates,
            id:ids,
            location:setUniqueLocation
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error in getting all jobs',400))
    }
}

//get the job by post user id
exports.getJobByUserId= async function(req,res,next){
   let id = req.query.id;
   let pageNumber = req.query.pageNumber;
    try {
           let PageSize = 5;
           let PageNumber = Number(pageNumber) || 1;
           getAllJobs = await Job.find({user:id})
                              .skip(PageSize * (PageNumber - 1))
                              .populate("user","firstName"+" "+"lastName")
                              .populate('jobtype','jobcategories')
                              .limit(PageSize);
           let count = await Job.find({user:id}).countDocuments();
        res
        .status(200)
        .json({
            success:true,
            getAllJobs,
            countPaginaton: Math.ceil(count/PageSize)
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error in getting all jobs by id',400))
    }
}

//get one single job
exports.getSingleJob= async function(req,res,next){
    try {
        //get one job from database
        let getSingleJob= await Job.findById(req.params.id).populate('jobtype','jobcategories').populate('user','email').populate('user','firstName' +' '+'lastName');
        console.log("this is cookie "+ req.cookies.token);
        res
        .status(200)
        .json({
            success:true,
            getSingleJob
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error in getting one jobs',400))
    }
}

//update job by id
exports.updateJob= async function(req,res,next){
    try {

        //update job from database
        let updateJob= await Job.findByIdAndUpdate(req.params.id,
            req.body,
            {new:true})
        .populate('jobtype','jobcategories')
        .populate('user','email');
        
        res
        .status(200)
        .json({
            success:true,
            updateJob
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error in updating jobs',400))
    }
}

//delete job by id
exports.deleteJob= async function(req,res,next){
    try {
        //delete job from database
        let deleteJob= await Job.findByIdAndDelete(req.params.id,{new:true});
        res
        .status(200)
        .json({
            success:true,
            message:"delete Successfully"
        });
        next();
    } catch (error) {
        return next(new ErrorResponse('Error in deleting job',400))
    }
}

//create job history
exports.createJobHistory =async function (req,res,next){
    try { 
        //create job history
        
        let {id,jobid,title,description,salary,location,userid,postownername}=req.body;
        let current_user= await User.findOne({_id:id});
        
        if(!current_user){
            return next(new ErrorResponse("Please Login in First",400));
        }
        else {
            
            let addedHistory={
                
                title,
                description,
                salary,
                location,
                postownername:postownername
            };
           current_user.jobhistory.push(addedHistory);
    
          current_user.save(); 
        }
        
        res 
        .status(200)
        .json({
            success:true,
            message:"Created successfully"
          
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error creating job history',400))
    }
}

//create applied user
exports.createAppliedUser =async function (req,res,next){
    try { 
        //create applied user

        let {id,jobid}=req.body;
        let current_user= await User.findOne({_id:id});
        let current_job= await Job.findOne({_id:jobid});
        if(!current_user){
            return next(new ErrorResponse("Please Login in First",400));
        }
        else {
            let userId =id;
            let email= current_user.email;
            let addedUser ={
                userid:userId,
                email
            }
           
           
           current_job.AppliedUsers.push(addedUser);
          
           current_job.save();
       
         
        }
        
        res 
        .status(200)
        .json({
            success:true,
            message:"applied successfully"
        });
        next();
    } catch (error) {
       return next(new ErrorResponse('Error creating applied user ',400))
    }
}
