import axios from "axios";
import { Job_Type_Load_Success, Job_Type_Load_Fail, Job_Type_Load_Request, Job_Type_Add_Request, Job_Type_Add_Success, Job_Type_Add_Fail, Job_Type_Single_Request, Job_Type_Edit_Success, Job_Type_Single_Success, Job_Type_Single_Fail, Job_Type_Edit_Request, Job_Type_Edit_Fail, Job_Type_Delete_Request, Job_Type_Delete_Success, Job_Type_Delete_Fail } from "../constant/constant"
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

//to add job type using axios post
export const JobTypeAddAction=(value)=>async (dispatch)=>{
   dispatch({type:Job_Type_Add_Request});
   try {
      let datas= await axios.post('/api/type/create',value);
      
      dispatch({
          type:Job_Type_Add_Success,
          payload:datas.data
      });
      toast.success("Successfully Created Job Type")
   } catch (error) {
      dispatch({type:Job_Type_Add_Fail,payload:error})
      toast.error("Error Creating Job Type")
   }
}

//to get all of the job type
export const JobTypeLoadAction=(pageNumber,pageSize)=>async (dispatch)=>{
     dispatch({type:Job_Type_Load_Request});
     try {
        let data= await axios.get(`/api/type/jobs?pageNumber=${pageNumber}&pageSize=${pageSize}`);
        
        dispatch({
            type:Job_Type_Load_Success,
            payload:data.data
        })
     } catch (error) {
        dispatch({type:Job_Type_Load_Fail,payload:error})
     }
}

//to get single job type using axios get
export const JobTypeSingleAction=(id)=>async (dispatch)=>{
   dispatch({type:Job_Type_Single_Request});
   try {
      let datas= await axios.get(`/api/type/${id}`);
      
      dispatch({
          type:Job_Type_Single_Success,
          payload:datas.data
      });
      
   } catch (error) {
      dispatch({type:Job_Type_Single_Fail,payload:error})
      
   }
}

//to edit single job type using axios put
export const EditJobTypeAction=(values,id)=>async (dispatch)=>{
   
   dispatch({type:Job_Type_Edit_Request});
   try {
      let datas= await axios.put(`/api/type/edit/${id}`,values);
      
      dispatch({
          type:Job_Type_Edit_Success,
          payload:datas.data
      });
      toast.success("Category is successfully Edited")
      window.location.reload();
      
   } catch (error) {
      dispatch({type:Job_Type_Edit_Fail,payload:error})
      toast.error("Error Editing Category")
   }
}

//to edit single job type using axios put
export const DeleteJobTypeAction=(id)=>async (dispatch)=>{
   
   dispatch({type:Job_Type_Delete_Request});
   try {
      let datas= await axios.delete(`/api/type/delete/${id}`);
      
      dispatch({
          type:Job_Type_Delete_Success,
          payload:datas.data
      });
      toast.success("Category is successfully Deleted")
      window.location.reload();
      
   } catch (error) {
      dispatch({type:Job_Type_Delete_Fail,payload:error})
      toast.error("Error in Deleting Category")
   }
}

