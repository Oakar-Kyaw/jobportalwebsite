import { useParams } from 'react-router-dom';


import '../css/output.css';


import { JobTable } from './alljobtable';
import { AdminSideBar } from './adminsidebar';
import { CategoryTable } from './allcategoriestable';
import { UserTable } from './allusertable';
import { StatComponent } from '../component/statcomponent';
import { AddUser } from './adduser';
import { AddCategory } from './addcategory';
import { EditUser } from './edituser';
import { EditCategory } from './editcategory';
import { AddJob } from './addjob';
import { EditJob } from './editjob';
import { AppliedJob } from './appliedJob';
import { CheckRoute } from '../component/checkroute';

export const AdminDashboard =()=>{
    
    const {action}= useParams();
    let content;
    function checkcontent(){
      if(action !=null){
      
      switch(action){
      case 'job':
       return <JobTable/>;
      
      case 'addjob':
       return <AddJob/>;
      
      case 'editjob':
       return <EditJob/>;
        
      case 'category':
          return <CategoryTable/>;
      case 'user':
            return <UserTable/>;
      
      case 'adduser':
            return <AddUser/>;
      
      case 'edit':
              return <EditUser/>;
      case 'addcategory':
            return <AddCategory/>;
      
      case 'editcategory':
            return <EditCategory/>;
      
      case 'appliedjob':
            return <AppliedJob/>;
        
      default :
           return <StatComponent/>;
      }
    }
    else {
       return <StatComponent/>;
    }
    

    }
    
    
   
    return (
        <div className="flex-col   h-full text-black font-serif">
         
         <div className="flex h-screen">
           <AdminSideBar action={action}/>
           <div className="w-screen bg-[#F7F7F7]">
            {
              checkcontent()
            }
             
              

           </div>
         </div>
         
        </div>
        
    )
}