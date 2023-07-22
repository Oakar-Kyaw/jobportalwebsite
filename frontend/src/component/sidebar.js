import '../css/output.css';
import PersonIcon from '@mui/icons-material/Person';

import DashboardIcon from '@mui/icons-material/Dashboard';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export const SideBar= ()=>{
    const navigate = useNavigate();
    
    //navigate to home
    const navigateHome =()=>{
        navigate('/');
    }

    //navigate to job
    const navigateJob =()=>{
        navigate('/userdashboard/appliedjob');
    }

    //navigate to user
    const navigatePersonalInfo =()=>{
        navigate('/userdashboard/personalinfo');
    }
    
    //navigate to user dashboard
    const navigateUserDashboard =()=>{
        navigate('/userdashboard/stat');
    }
   
    return (
        <div className="flex-col w-20 shadow-lg  border h-screen md:w-40">
            
                <ul>
                 <li className="p-6">
                    
                 </li>
                 <li className="p-3 flex align-items-center " onClick={navigateHome}>
                    <HomeIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block">Home</span>
                 </li>
                 <li className="p-3 flex align-items-center " onClick={navigateUserDashboard}>
                    <DashboardIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block">Dashboard</span>
                 </li>

                 <li className="p-3 flex align-items-center " onClick={navigatePersonalInfo}>
                    <InfoIcon sx={{mr:2}} />
                    <span  className="sm:hidden md:block">Personal Infos</span>
                 </li>
                 
                 <li className="p-3 flex align-items-center hover:bg-black cusor-pointer" onClick={navigateJob}>
                    <HistoryIcon sx={{mr:2}}/>
                    <span className="sm:hidden md:block">Applied History</span>
                 </li>
                 
                
                </ul>
               
           
        </div>
    )
}