import '../css/output.css';

import HomeIcon from '@mui/icons-material/Home';

import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

import CategoryIcon from '@mui/icons-material/Category';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';

import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import ApprovalIcon from '@mui/icons-material/Approval';

export const AdminSideBar= ({action})=>{
  const accounttype = JSON.parse(localStorage.getItem('userInfo'))
                  .accounttype;
    const navigate = useNavigate();
    //to show add user, view users , can add class list
    const userRef= useRef(null);

    //to add color in user li
    const userLiRef= useRef(null);

    //to add color in applied job li
    const appliedJobRef= useRef(null);

    //to add color in jo li
    const jobLiRef= useRef(null);

    //to add color in categories li
    const categoryLiRef= useRef(null);

    //to add color in dashboard li
    const dashboardRef= useRef(null);

    //to show add job, view jobs , can add class list
    const jobRef= useRef(null);

    //to show add category, view category , can add class list
    const categoryRef= useRef(null);
    
   
    
    
     //navigate to dashboard
   const navigateAdminDashboard = ()=>{
    dashboardRef.current.classList.add('bg-blue-900');
    navigate('/admindashboard');
 } 

    // to toggle hidden class for user
    const handleUser =()=>{
         userLiRef.current.classList.add('bg-blue-900');
         userRef.current.classList.toggle("hidden");
    }
    
    //navigate to home
   const navigateHome = ()=>{
    navigate('/')
   }
    
    //navigate to user
   const navigateUser = ()=>{
    userLiRef.current.classList.add('bg-blue-900');
    navigate('/admindashboard/user')
   }
    
   //navigate to add user
   const navigateAddUser = ()=>{
    userLiRef.current.classList.add('bg-blue-900');
    navigate('/admindashboard/user/adduser')
   }

     

    // to toggle hidden class for user
    const handleJob =()=>{
        jobRef.current.classList.toggle("hidden") 
    }

   //navigate to job
   const navigateJob = ()=>{
      navigate('/admindashboard/job')
   }

    //navigate to add job
    const navigateAddJob = ()=>{
        navigate('/admindashboard/job/addjob')
     }

   // to toggle hidden class for user
   const handleCategory =()=>{
       categoryRef.current.classList.toggle("hidden") 
   }
   
   //navigate to category
   const navigateCategory = ()=>{
    navigate('/admindashboard/category')
 } 
   
    //navigate to add category
   const navigateAddCategory = ()=>{
    navigate('/admindashboard/category/addcategory')
 }
  const navigateAppliedJob =()=>{
     navigate('/admindashboard/user/appliedjob')
   }
 
   
    return (
        <div className="xl:w-[250px] md:w-[250px] sm:min-w-[80px] shadow-xl h-screen bg-[#29323E] text-white">
            <div className="flex-col">
                <ul>
                 <li className="p-6">
                    
                 </li>
                 <li className="p-3 flex align-items-center hover:bg-blue-900 hover:cursor-pointer" onClick={navigateHome}>
                    <HomeIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block hover:cursor-pointer ">Home</span>
                 </li>
                 <li className="p-3 flex align-items-center  hover:bg-blue-900 hover:cursor-pointer" onClick={navigateAdminDashboard} ref={dashboardRef}>
                    <DashboardIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block hover:cursor-pointer">Dashboard</span>
                 </li>

                 <li className="p-3 flex-col align-items-center hover:bg-blue-900 cusor-pointer group" onClick={handleUser} ref={userLiRef}>
                  
                <div className="flex">
                    <PersonIcon sx={{mr:2}}/>
                    <span className="sm:hidden md:block hover:cursor-pointer">User </span>
                   </div> 
                     <div className="flex-col hidden " ref={userRef}>
                           <ul>
                           <li className="p-3 flex align-items-center " onClick={navigateUser}>
                                <PersonSearchIcon sx={{mr:2}} />
                             <span  className="sm:hidden md:block">View Users</span>
                           </li>
                           {accounttype == 1 ?
                           <li className="p-3 flex align-items-center " onClick={navigateAddUser} >
                               <PersonAddIcon sx={{mr:2}} />
                              <span  className="sm:hidden md:block">Add User</span>
                           </li>
                           :
                           ""
                           }
                           </ul>
                            
                     </div>
                    
                 </li>
                 <li className="p-3 flex align-items-cenlue-900 hover:bg-blue-900 hover:cursor-pointer" onClick={navigateAppliedJob} ref={appliedJobRef}>
                    <ApprovalIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block ">Applied Users</span>
                 </li>

                 <li className="p-3 flex-col align-items-center hover:bg-blue-900 cusor-pointer group " onClick={handleJob} ref={jobLiRef}>
                  
                <div className="flex">
                    <WorkIcon sx={{mr:2}}/>
                    <span className="sm:hidden md:block cursor-pointer">Job</span>
                   </div> 
                     <div className="flex-col hidden " ref={jobRef}>
                           <ul>
                           <li className="p-3 flex align-items-center " onClick={navigateJob}>
                                <WorkHistoryIcon sx={{mr:2}} />
                             <span  className="sm:hidden md:block">View Jobs</span>
                           </li>
                           <li className="p-3 flex align-items-center " onClick={navigateAddJob}>
                               <NoteAddIcon sx={{mr:2}} />
                              <span  className="sm:hidden md:block">Add Job</span>
                            </li>
                           </ul>
                            
                     </div>
                    
                 </li>

                 <li className="p-3 flex-col align-items-center hover:bg-blue-900 cusor-pointer group" onClick={handleCategory} ref={categoryLiRef}>
                  
                <div className="flex">
                    <CategoryIcon sx={{mr:2}}/>
                    <span className="sm:hidden md:block cursor-pointer">Category</span>
                   </div> 
                     <div className="flex-col hidden " ref={categoryRef}>
                           <ul>
                           <li className="p-3 flex align-items-center " onClick={navigateCategory}>
                                <VisibilityIcon sx={{mr:2}} />
                             <span  className="sm:hidden md:block">View Categories</span>
                           </li>
                           <li className="p-3 flex align-items-center " onClick={navigateAddCategory}>
                               <PostAddIcon sx={{mr:2}} />
                              <span  className="sm:hidden md:block">Add Category</span>
                            </li>
                           </ul>
                            
                     </div>
                    
                 </li>

                 
                </ul>
               
            </div>
        </div>
    )
}