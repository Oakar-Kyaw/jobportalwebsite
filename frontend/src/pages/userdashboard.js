import { useParams } from 'react-router-dom';
import { JobHistoryCard } from '../component/jobhistorycard';
import { SideBar } from '../component/sidebar';
import '../css/output.css';
import { PersonalInfo } from '../component/personalinfo';
import { UserDashboardStat } from '../component/userdashboardstat';

export const UserDashboard =()=>{
    const {action}= useParams();
    
    const CheckAction = () =>{
        if(action !=null){
      
        switch(action){
            case 'appliedjob':
               return <JobHistoryCard/>;
            case 'personalinfo':
                return <PersonalInfo/>;
            
            case 'stat' :
                return <UserDashboardStat />;
           
            default :
                 return <UserDashboardStat />;
            }
          }
          else {
             return <UserDashboardStat />;
          }
    }
    return (
        <div className="flex bg-[#2B305B] text-white font-serif">
         
         
           <SideBar />
           <div className=" bg-[#2B305B]">
            {
                CheckAction()
                
            }
              

           </div>
       
         
        </div>
        
    )
}