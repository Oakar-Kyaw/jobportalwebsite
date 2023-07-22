import { Navigate } from "react-router-dom"

export const CheckRoute = ({ children})=>{
    let isLoggedIn= JSON.parse(localStorage.getItem('userInfo'))
    if(!isLoggedIn){
        return <Navigate to='/' replace />;
    }
    
    return children;

    
}