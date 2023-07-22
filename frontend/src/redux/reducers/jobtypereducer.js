import { Job_Type_Add_Fail, Job_Type_Add_Request, Job_Type_Add_Success, Job_Type_Delete_Fail, Job_Type_Delete_Request, Job_Type_Delete_Success, Job_Type_Edit_Fail, Job_Type_Edit_Request, Job_Type_Edit_Success, Job_Type_Load_Fail, Job_Type_Load_Request, Job_Type_Load_Success, Job_Type_Single_Fail, Job_Type_Single_Request, Job_Type_Single_Success } from "../constant/constant";

//get all job type
export const loadJobTypeReducers= (state={jobtype:[]},action) =>{
    switch(action.type){
        //job type load request
        case Job_Type_Load_Request:
            return {
                    loading:true
                };
        
        //job type load success
        case Job_Type_Load_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    totaljobtype:action.payload.totaljobtype,
                    jobtypes:action.payload.allJobsType,
                    count:action.payload.count
                };

        //job type load fail
        case Job_Type_Load_Fail:
            return {
                     loading:false,
                     error:'error'
                    };

        default:
           return state;
    }
}

// add job type
export const AddJobTypeReducers= (state={jobtype:[]},action) =>{
    switch(action.type){
        //job type load request
        case Job_Type_Add_Request:
            return {
                    loading:true
                };
        
        //job type load success
        case Job_Type_Add_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    addjobtype:action.payload.createJobType
                };

        //job type load fail
        case Job_Type_Add_Fail:
            return {
                     loading:false,
                     error:'error'
                    };

        default:
           return state;
    }
}

// single job type
export const JobTypeSingleReducers= (state={jobtype:[]},action) =>{
    switch(action.type){
        //single job type load request
        case Job_Type_Single_Request:
            return {
                    loading:true
                };
        
        //single job type load success
        case Job_Type_Single_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    singlejobtype:action.payload.singleJobsType
                };

        //single job type load fail
        case Job_Type_Single_Fail:
            return {
                     loading:false,
                     error:action.payload.error
                    };

        default:
           return state;
    }
}

// edit job type
export const EditJobTypeReducers= (state={jobtype:[]},action) =>{
    switch(action.type){
        //edit job type load request
        case Job_Type_Edit_Request:
            return {
                    loading:true
                };
        
        //edit job type load success
        case Job_Type_Edit_Success:
                return {
                    loading:false,
                    success:action.payload.success,
                    editjobtype:action.payload.editJobType
                };

        //edit job type load fail
        case Job_Type_Edit_Fail:
            return {
                     loading:false,
                     error:action.payload.error
                    };

        default:
           return state;
    }
}

// delete job type
export const DeleteJobTypeReducers= (state={jobtype:[]},action) =>{
    switch(action.type){
        //delete job type load request
        case Job_Type_Delete_Request:
            return {
                    loading:true
                };
        
        //delete job type load success
        case Job_Type_Delete_Success:
                return {
                    loading:false,
                    message:action.payload.message
                };

        //edit job type load fail
        case Job_Type_Delete_Fail:
            return {
                     loading:false,
                     error:action.payload.error
                    };

        default:
           return state;
    }
}