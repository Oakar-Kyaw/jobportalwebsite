import { useEffect, useState } from "react"
import { JobByPostUserIdAction } from "../redux/actions/jobaction"
import { useDispatch, useSelector } from "react-redux"
import { LoadingComponent } from "../component/loadingcomponent"
import { Box, Pagination, Typography } from "@mui/material"

export const AppliedJob = ()=>{
    const dispatch = useDispatch();
    const [page,setPage] = useState(1);
    let id = JSON.parse(localStorage.getItem("userInfo")).id;
    useEffect(()=>{
        dispatch(JobByPostUserIdAction(page,id))
    },[page]);


    const {jobbypostuserid,loading,countPagination} = useSelector(state => state.loadJobByPostUserIdReducers);
    
    return (
        <div className= "mt-4 ml-4 flex-col">
    <h2 className="ml-4 ">Job Applied By User</h2>
    {
        loading ? 
          <LoadingComponent />
          :
       jobbypostuserid && 
       <table className="table-auto  text-[#AEAEAE] font-serif mt-4 ml-4 shadow-xl">
       <thead className="bg-[#36304A]">
         <tr >
          
           <th className="p-3">Job Title</th>
           <th className="p-3">Post By</th>
           <th className="p-3">Job Type</th>
           <th className="p-3">Applicant Email</th>
           
         </tr>
       </thead>
       {
        jobbypostuserid && jobbypostuserid.map(
            (job,i)=>{
                return (
                    <tbody key={i} className="bg-[#F5F5F5] text-black text-start">
                    <tr>
                     
                      <td className="p-3">{job.title}</td>
                      <td className="p-3">{job.user.firstName} {job.user.lastName}</td>
                      <td className="p-3">{job.jobtype.jobcategories}</td>
                      
                      {
                        job.AppliedUsers != 0 ?
                        <td  className="p-3 w-5 text-blue-900">
                        {job.AppliedUsers.map(
                            (user) => user.email +"\n"
                        )
                        }
                        </td>
                        :
                        <td className="p-3 text-blue-900">No Users</td>
                      }
                    </tr>
                    
                   </tbody>
                );
            }
        )
         
       
       }
       </table>
    } 
    {
        loading ? 
        ' '
        :
        <div className="mt-6 ">
           <Pagination  count={countPagination} onChange={(event,value)=>setPage(value)} />
        </div>
    }    
  </div>
        
    )
}
