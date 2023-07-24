import axios from "axios";
import { User_Fail, User_Request, User_Success } from "../constant/constant";

export const UserProfileAction =(id)=>async(dispatch)=>{
    dispatch({type:User_Request});
    try {
        let datas= await axios.get(`https://jobsearchwebsite.onrender.com/api/me/${id}`); 
        dispatch({
            type:User_Success,
            payload:datas.data
        })
    } catch (error) {
        dispatch({type:User_Fail,payload:error,
                  payload:error})
    }
    
}
