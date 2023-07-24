import { useEffect } from 'react';
import '../css/output.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileAction } from '../redux/actions/userprofileaction';

import { LoadingComponent } from './loadingcomponent';
import { Box, Typography } from '@mui/material';

export const JobHistoryCard = ()=>{
    const dispatch = useDispatch();
    let id = JSON.parse(localStorage.getItem("userInfo")).id;
    
    useEffect(()=>{
     
       dispatch(UserProfileAction(id))
    },[])
    
    const {loading,user}= useSelector(state => state.userProfile);
    
    
    
  
    return (
        <div className="flex w-screen h-full sm:w-screen">
        <div className="flex-col">
        <div className="p-2 ml-4 mt-4 mb-4 text-center">Applied Job History</div>
        <div className='grid gap-2 place-items-center sm:grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 items-center '>
        {
         loading ?
          <LoadingComponent/>
         :
         user && user.jobhistory.length != 0 ?

         user.jobhistory.map((job)=>{
            return (
            <div className="bg-white ml-4 text-black w-60 h-80 mt-4 flex-col space-y-2 p-3 shadow-lg rounded-sm">
       <h4 className="text-violet-700"> {job.title} </h4>
       <div className="flex justify-between">
           <div className="text-gray-500">{job.postownername}</div>
           <div className="flex text-gray-500">
               {job.applicationstatus}
           </div>
           
       </div>
      
       <div className="flex justify-between">
           <div className="text-blue-900">{job.salary}</div>
           <div className="flex text-blue-900">
               <LocationOnIcon/>
               <div >{job.location}</div>
           </div>
           
       </div>
       <p >{job.description.split(" ").splice(0,10).join(" ")+"..."}</p>
 
       <button className='bg-blue-700 mt-4 text-white shadow-lg rounded-sm flex justify-center p-1 hover:bg-blue-900'>
          <AddIcon sx={{mt:'1px'}}/>  
          <span className='pr-2'>More Detail</span>
       </button>
   </div>);
         })
         
      :
      // if there is no history
      <Box sx={{width:"500px",height:"300px", display:"flex", justifyContent:"center", alignItems:"center"}} >
             <Typography>No Content</Typography>
         </Box>
         }
         
         </div>
         </div>
         </div>
    );
}
