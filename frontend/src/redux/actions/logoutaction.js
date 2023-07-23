import axios from "axios"
import { User_LogOut_Fail, User_LogOut_Request, User_LogOut_Success } from "../constant/constant"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const LogOutAction = ()=> async (dispatch)=>{
     
    dispatch({type:User_LogOut_Request})
    
    try {
        //log out action with axios
        let data = await axios.get("https://jobsearchwebsite.onrender.com/api/logout");
        dispatch({
            type:User_LogOut_Success,
            payload:data.data
        });
        
        toast.success("User Successfully Log Out");
        localStorage.removeItem("userInfo");
    } catch (error) {
        dispatch({
            type:User_LogOut_Fail,
            payload:error
        })
        toast.error("There is an error")
    }
}
