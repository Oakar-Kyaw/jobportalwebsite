import '../css/output.css';
import React, { useEffect }  from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkIcon from '@mui/icons-material/Work';
import Moment from 'react-moment';
import { useDispatch, useSelector } from 'react-redux';
import { UserProfileAction } from '../redux/actions/userprofileaction';
import { Box, Typography } from '@mui/material';
import { LoadingComponent } from './loadingcomponent';

export const UserDashboardStat = () => {
    const dispatch = useDispatch();
    let id = JSON.parse(localStorage.getItem("userInfo")).id;
    useEffect(()=>{
        dispatch(UserProfileAction(id));
    },[]);
    const {count,user,loading} = useSelector(state => state.userProfile);
    return (
        <>
        <div className="m-4 py-2"><h1>User Stats</h1></div>
        <div className="flex-col">
           {/* stat  row*/}
           <div className="md:flex ">
             {
                loading ?

                <LoadingComponent />

                :
                user && user !== null ?
                 <>
                   {/* Card for Created At*/}
                <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm bg-white text-black">
                <div className="pt-2 pb-1">
                   
                </div>
                <div className="pt-1 text-blue-900">
                   <CalendarMonthIcon fontSize='large'/>
                </div>
                <div className="pt-1">
                    Created At 
                </div>
                <div className="pt-1">
                <Moment format="HH:mm  DD-MM-YYYY " className="text-blue-900">
                 {user.createdAt}
               </Moment>
                </div>
               </div>

                {/* Card for Categories*/}
                <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm bg-white text-black md:mt-0 sm:mt-4">
                <div className="pt-2 pb-1">
                   
                </div>
                <div className="pt-1 text-blue-900">
                   <WorkIcon fontSize="large" />
                </div>
                <div className="pt-1">
                   Job Applied Count
                </div>
                <div className="pt-1 text-red-900 font-large">
                   {count}
                </div>
               </div>
                 </>
                :
                <Box sx={{width:"500px",height:"300px", display:"flex", justifyContent:"center", alignItems:"center"}} >
                <Typography>No Content</Typography>
              </Box>
             }
                

           </div>
            
            
       </div>
       </>
    );
}
