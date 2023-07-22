import { Navigate } from "react-router-dom"

export const CheckCompany = ({ children})=>{
    let isRole= JSON.parse(localStorage.getItem('userInfo')).role;
    if(isRole == 0 ){
        return <Navigate to='/' replace />;
    }
    
    return children;

    
}