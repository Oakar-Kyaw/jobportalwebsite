import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../css/output.css';

import WorkIcon from '@mui/icons-material/Work';

import CategoryIcon from '@mui/icons-material/Category';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { JobLoadAction } from '../redux/actions/jobaction';
import { JobTypeLoadAction } from '../redux/actions/jobtypeaction';
import { UserLoadAction, UserSingleAction } from '../redux/actions/userrequestaction';
import Moment from 'react-moment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export const StatComponent = ()=>{
    const dispatch= useDispatch();
    const accounttype = JSON.parse(localStorage.getItem('userInfo'))
                  .accounttype;
    const userid = JSON.parse(localStorage.getItem('userInfo'))
                  .id;
    useEffect(()=>{
        dispatch(JobLoadAction());
        dispatch(JobTypeLoadAction(1,5));
        dispatch(UserLoadAction());
        dispatch(UserSingleAction(userid))

    },[])
    const {totaljobs} = useSelector(state=>state.loadJobReucers);
    const {totaljobtype} =useSelector(state=>state.loadJobTypeReducers);
    const {totaluser} = useSelector(state=>state.userLoadReducers);

   //destrusture user  and loading from reducer
   const {user} = useSelector(state => state.userSingleReducers);
    return (
        <>
        <h1 className="m-4 py-2">Welcome to Dashboard</h1>
       <div className="flex-col">
           {/* stat  row*/}
           <div className="md:flex ">
                
                {/* Card for user*/}
               <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm ">
                <div className="pt-2 pb-1">
                   <AccountCircleIcon fontSize="large"/>
                </div>
                <div className="pt-1 text-blue-900">
                  {totaluser}
                </div>
                <div className="pt-1">
                    Users
                </div>
               </div>

                {/* Card for user*/}
                <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm ">
                <div className="pt-2 pb-1">
                   <WorkIcon fontSize="large"/>
                </div>
                <div className="pt-1 text-blue-900">
                   {totaljobs}
                </div>
                <div className="pt-1">
                    Jobs
                </div>
               </div>

                {/* Card for Categories*/}
                <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm ">
                <div className="pt-2 pb-1">
                   <CategoryIcon fontSize="large"/>
                </div>
                <div className="pt-1 text-blue-900">
                  {totaljobtype}
                </div>
                <div className="pt-1">
                   Categories 
                </div>
               </div>

           </div>
            
             {/* Card for Job Applied*/}
             <div className="flex-col p-4 shadow-xl w-60 h-40 ml-4 rounded-sm ">
                <div className="pt-2 pb-1">
                   <CalendarMonthIcon fontSize="large"/>
                </div>
                <div className="pt-1 text-blue-900">
                  
                </div>
                <div className="pt-1">
                    Account Created At
                </div>
                {
                  user &&
                <div className="pt-1 text-blue-900">
                  <Moment format="HH:mm  DD-MM-YYYY " className="text-blue-900">
                    {user.createdAt}
                  </Moment>
                </div>
                }
               </div>
       </div>
       </>
    );
}