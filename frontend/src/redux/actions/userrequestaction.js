import axios from "axios";
import { User_Delete_Fail, User_Delete_Request, User_Delete_Success, User_Edit_Fail, User_Edit_Request, User_Edit_Success, User_Load_Fail, User_Load_Request, User_Load_Success, User_SignUp_Fail, User_SignUp_Request, User_SignUp_Success, User_Sign_Fail, User_Sign_Request, User_Sign_Success, User_Single_Fail, User_Single_Request, User_Single_Success } from "../constant/constant";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


//to sign in request by user
export const UserRequestAction= (values)=> async (dispatch)=>{
     
     dispatch({type:User_Sign_Request})
     try {
        let datas = await axios.post(`https://jobsearchwebsite.onrender.com/api/signin/`,values,{withCredentials: true, credentials: 'include'});
        dispatch({
            type:User_Sign_Success,
            payload:datas.data,
           
        })
        
        
        
        let userInfo= {
              id:datas.data.user._id,
              firstName:datas.data.user.firstName,
              role:datas.data.user.role,
              accounttype:datas.data.user.accounttype,
             
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        toast.success("Login In Successfully");
        
     }
     catch(error){
        dispatch({type:User_Sign_Fail,payload:error})
        toast.error("Invalid Credential")
     }
}

//to post sign up result with axios

export const UserSignUpAction = (values)=>async(dispatch)=>{
      
      // first request
      dispatch({type:User_SignUp_Request});

      try {
         let datas = await axios.post("https://jobsearchwebsite.onrender.com/api/signup",values);

         //when the data get successfully
         dispatch({
            type:User_SignUp_Success,
            payload:datas.data
         });

         toast.success("User Successfully Sign Up")
      } catch (error) {
         dispatch(
            {
               type:User_SignUp_Fail,
               payload:error
            }
         );
         toast.error("Invalid Sign Up");
      }
}

//to get all of the users
export const UserLoadAction= (page,pageSize)=> async (dispatch)=>{
    
   dispatch({type:User_Load_Request})
   try {
      let datas = await axios.get(`https://jobsearchwebsite.onrender.com/api/allusers?pageNumber=${page}&pageSize=${pageSize}`);
      
      dispatch({
          type:User_Load_Success,
          payload:datas.data,
          
      })
   }
   catch(error){
      dispatch({type:User_Load_Fail,payload:error})
      
   }
}

//to put editing result with axios

export const UserEditAction = (values,id)=>async(dispatch)=>{
      
   // first request
   dispatch({type:User_Edit_Request});

   try {
      let datas = await axios.put(`https://jobsearchwebsite.onrender.com/api/user/edit/${id}`,values);

      //when the data get successfully
      dispatch({
         type:User_Edit_Success,
         payload:datas.data
      });

      toast.success("User Successfully Edited")
      window.location.reload()
   } catch (error) {
      dispatch(
         {
            type:User_Edit_Fail,
            payload:error
         }
      );
      toast.error("Invalid Edit");
   }
}

//to get single user result with axios

export const UserSingleAction = (id)=>async(dispatch)=>{
      
   // first request
   dispatch({type:User_Single_Request});

   try {
      let datas = await axios.get(`https://jobsearchwebsite.onrender.com/api/user/${id}`,{withCredentials:true});
      
      //when the data get successfully
      dispatch({
         type:User_Single_Success,
         payload:datas.data
      });

      
   } catch (error) {
      dispatch(
         {
            type:User_Single_Fail,
            payload:error
         }
      );
     
   }
}


export const UserDeleteAction = (id)=>async(dispatch)=>{
      
   // first request
   dispatch({type:User_Delete_Request});

   try {
      let datas = await axios.delete(`https://jobsearchwebsite.onrender.com/api/user/delete/${id}`);
      
      //when the data get deleted successfully
      dispatch({
         type:User_Delete_Success,
         payload:datas.data
      });

      toast.success("User is Deleted Successfully ")
      window.location.reload()
   } catch (error) {
      dispatch(
         {
            type:User_Delete_Fail,
            payload:error
         }
      );
      toast.error("Error in Deleting")
     
   }
}
