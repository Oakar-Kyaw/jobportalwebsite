import axios from 'axios';
import {Applied_Job_Fail, Applied_Job_Request, Applied_Job_Success, Job_Add_Fail, Job_Add_Request, Job_Add_Success, Job_Delete_Fail, Job_Delete_Request, Job_Delete_Success, Job_Edit_Fail, Job_Edit_Request, Job_Edit_Success, Job_Load_By_Id_Fail, Job_Load_By_Id_Request, Job_Load_By_Id_Success, Job_Load_Fail, Job_Load_Request,Job_Load_Success, Job_Single_Fail, Job_Single_Request, Job_Single_Success} from '../constant/constant';
import store from '../store';
import { toast } from 'react-toastify';
import  "react-toastify/dist/ReactToastify.css";

export const JobLoadAction=(pageNumber,keyword="",cate="", location="")=> async (dispatch)=>{
  dispatch({type:Job_Load_Request})
  try {
    let datas=await axios.get(`https://jobsearchwebsite.onrender.com/api/job/all?pageNumber=${pageNumber}&keyword=${keyword}&cates=${cate}&location=${location}`); 
    
    dispatch({
        type:Job_Load_Success,
        payload:datas.data
    })
   
  } catch (error) {
    dispatch({
        type:Job_Load_Fail,
        payload:error
    })
  }
    
}

export const JobByPostUserIdAction=(pageNumber,userid)=> async (dispatch)=>{
  dispatch({type:Job_Load_By_Id_Request})
  try {
    let datas=await axios.get(`https://jobsearchwebsite.onrender.com/api/job/apply/userid?pageNumber=${pageNumber}&id=${userid}`); 
    
    dispatch({
        type:Job_Load_By_Id_Success,
        payload:datas.data
    })
   
  } catch (error) {
    dispatch({
        type:Job_Load_By_Id_Fail,
        payload:error
    })
  }
    
}

//add job action
export const AddJobAction=(values)=> async (dispatch)=>{
  dispatch({type:Job_Add_Request})
  try {
    //post by axios
    let datas=await axios.post(`https://jobsearchwebsite.onrender.com/api/job/create`,values); 
    
    dispatch({
        type:Job_Add_Success,
        payload:datas.data
    })
    toast.success("Job is created")
   
  } catch (error) {
    dispatch({
        type:Job_Add_Fail,
        payload:error
    })
    toast.error("Error creating job")
  }
    
}

//edit job action
export const EditJobAction=(values,id)=> async (dispatch)=>{
  dispatch({type:Job_Edit_Request})
  try {
    //put by axios
    let datas=await axios.put(`https://jobsearchwebsite.onrender.com/api/job/edit/${id}`,values); 
    
    dispatch({
        type:Job_Edit_Success,
        payload:datas.data
    })
    toast.success("Job is edited Successfully")
    window.location.reload();
   
  } catch (error) {
    dispatch({
        type:Job_Edit_Fail,
        payload:error
    })
    toast.error("Error editing job")
  }
    
}

//get one single job
export const JobSingleAction=(id)=> async (dispatch)=>{
  dispatch({type:Job_Single_Request})
  try {
    let datas=await axios.get(`https://jobsearchwebsite.onrender.com/api/job/${id}`); 
    
    dispatch({
        type:Job_Single_Success,
        payload:datas.data
    })
   
  } catch (error) {
    dispatch({
        type:Job_Single_Fail,
        payload:error
    })
  }
    
}

//delete job action
export const DeleteJobAction=(id)=> async (dispatch)=>{
  dispatch({type:Job_Delete_Request})
  try {
    
    //delete by axios
    let datas=await axios.delete(`https://jobsearchwebsite.onrender.com/api/job/delete/${id}`); 
    
    dispatch({
        type:Job_Delete_Success,
        payload:datas.data
    })
    toast.success("Job is deleted Successfully")
   
  } catch (error) {
    dispatch({
        type:Job_Delete_Fail,
        payload:error
    })
    toast.error("Error deleting job")
  }
    
}

//apply job history by axios
export const AppliedJobAction=(values)=> async (dispatch)=>{
  dispatch({type:Applied_Job_Request})
  try {
    //post by axios
    let datas=await axios.post(`https://jobsearchwebsite.onrender.com/api/job/history/create`,values); 
    
    dispatch({
        type:Applied_Job_Success,
        payload:datas.data
    })
    toast.success("Applied Job")
   
  } catch (error) {
    dispatch({
        type:Applied_Job_Fail,
        payload:error
    })
    toast.error("Error applying job")
  }
    
}
