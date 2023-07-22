import { toast } from "react-toastify";
import { Job_Load_Request,Job_Load_Success,Job_Load_Fail,Job_Load_Reset, Job_Add_Request, Job_Add_Success, Job_Add_Fail, Job_Add_Reset, Job_Edit_Request, Job_Edit_Success, Job_Edit_Fail, Job_Edit_Reset, Job_Single_Request, Job_Single_Success, Job_Single_Fail, Job_Single_Reset, Job_Delete_Request, Job_Delete_Success, Job_Delete_Fail, Job_Delete_Reset, Applied_Job_Request, Applied_Job_Success, Applied_Job_Fail, Applied_Job_Reset, Job_Load_By_Id_Request, Job_Load_By_Id_Success, Job_Load_By_Id_Fail, Job_Load_By_Id_Reset } from "../constant/constant";

export const loadJobReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading job request
        case Job_Load_Request:
            return {loading:true};

        //success job loading
        case Job_Load_Success:
            return {
                loading:false,
                success:action.payload.success,
                pageNumber:action.payload.pageNumber,
                count:action.payload.jobPageTotal,
                SetUniqueLocation:action.payload.locations,
                totaljobs:action.payload.totaljobs,
                jobs:action.payload.getAllJobs
            
            };
        
        //fail job loading
        case Job_Load_Fail:
            return {
                loading:false,
                error:action.payload           
            }
        
        //Reset job request
        case Job_Load_Reset:
            return {};

        default:
            return state;
    }
}

//get job by post user id
export const JobByUserIdReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading job by post user request
        case Job_Load_By_Id_Request:
            return {loading:true};

        //success job by post user id
        case Job_Load_By_Id_Success:
            return {
                loading:false,
                success:action.payload.success,
                jobbypostuserid:action.payload.getAllJobs,
                countPagination:action.payload.countPaginaton
            };
        
        //fail job by post user id 
        case Job_Load_By_Id_Fail:
            return {
                loading:false,
                error:action.payload.error         
            }
        
        //Reset job by post user id
        case Job_Load_By_Id_Reset:
            return {};

        default:
            return state;
    }
}


//add job
export const AddJobReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading add job request
        case Job_Add_Request:
            return {loading:true};

        //success adding job
        case Job_Add_Success:
            return {
                loading:false,
                success:action.payload.success,
                createjob:action.payload.createjob
            };
       
        //fail adding job
        case Job_Add_Fail:
            return {
                loading:false,
                error:action.payload           
            }
        
        //Reset job request
        case Job_Add_Reset:
            return {};

        default:
            return state;
    }
}

//edit job
export const EditJobReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading edit job request
        case Job_Edit_Request:
            return {loading:true};

        //success editing job
        case Job_Edit_Success:
            return {
                loading:false,
                success:action.payload.success,
                updatejob:action.payload.updateJob
            };
       
        //fail editing job
        case Job_Edit_Fail:
            return {
                loading:false,
                error:action.payload.error          
            }
        
        //Reset job edit request
        case Job_Edit_Reset:
            return {};

        default:
            return state;
    }
}

//get one single job
export const JobSingleReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading single job request
        case Job_Single_Request:
            return {loading:true};

        //success getting single job
        case Job_Single_Success:
            return {
                loading:false,
                success:action.payload.success,
                getsinglejob:action.payload.getSingleJob
            };
       
        //fail single job
        case Job_Single_Fail:
            return {
                loading:false,
                error:action.payload.error           
            }
        
        //Reset single job request
        case Job_Single_Reset:
            return {};

        default:
            return state;
    }
}

//delete job
export const DeleteJobReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading delete job request
        case Job_Delete_Request:
            return {loading:true};

        //success deleting job
        case Job_Delete_Success:
            return {
                loading:false,
                success:action.payload.success,
                message:action.payload.message
            };
       
        //fail deleting job
        case Job_Delete_Fail:
            return {
                loading:false,
                error:action.payload.error          
            }
        
        //Reset delete job request
        case Job_Delete_Reset:
            return {};

        default:
            return state;
    }
}

//applied job
export const AppliedJobReducers= (state={job:[]},action)=>{
    switch(action.type){
        //loading applied job request
        case Applied_Job_Request:
            return {loading:true};

        //success applying job
        case Applied_Job_Success:
            return {
                loading:false,
                success:action.payload.success,
                message:action.payload.message
            };
       
        //fail applying job
        case Applied_Job_Fail:
            return {
                loading:false,
                error:action.payload.error           
            }
        
        //Reset job request
        case Applied_Job_Reset:
            return {};

        default:
            return state;
    }
}
