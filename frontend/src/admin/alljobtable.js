import { Box, Pagination, Typography } from '@mui/material';
import '../css/output.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../component/loadingcomponent';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteJobAction, JobByPostUserIdAction, JobLoadAction } from '../redux/actions/jobaction';

export const JobTable = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {keyword,location}= useParams();
    const [page,setPage] = useState(1);
    const [cate,setCate] = useState("");
    const userid =JSON.parse(localStorage.getItem('userInfo'))
                  .id;

    const accounttype = JSON.parse(localStorage.getItem('userInfo'))
                  .accounttype;
    useEffect(()=>{
      
       {/* dispatch job load action when home.js run */}
      dispatch(JobLoadAction(page,keyword,cate,location));
      dispatch(JobByPostUserIdAction(page,userid))
  },[page,keyword])
    
    const {jobs,count,loading} = useSelector(state=>state.loadJobReucers);
    const {jobbypostuserid,countPagination} = useSelector(state => state.loadJobByPostUserIdReducers);

    //navigate to edit
    const navigateJob = (e)=>{
        navigate(`/admindashboard/job/editjob/${e.target.value}`);
    }
    //delete Job using id
    const DeleteJob = (e)=>{
      
     dispatch(DeleteJobAction(e.target.value)) ;
    
     window.location.reload();
      
    }
    return (
    <div className= "mt-4 ml-4 flex-col">
    <h2 className="ml-4 ">Job Table</h2>
    {
        loading ? 
          <LoadingComponent />
          :
          
          jobs && jobs.length !==0 ?
          
          <table className="table-auto  text-[#AEAEAE] font-serif mt-4 ml-4 shadow-xl">
            <thead className="bg-[#36304A]">
              <tr >
                <th className="p-3">Job Title</th>
                <th className="p-3">Post By</th>
                <th className="p-3">Job Type</th>
                <th className="p-3">Job Description</th>
                <th className="p-3">Salary</th>
                <th className="p-3">Location</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
           { accounttype == 1 ?
          jobs.map((job,i) =>
            <tbody key={i} className="bg-[#F5F5F5] text-black">
              <tr>
                <td className="p-3">{job.title}</td>
                <td className="p-3">{job.user.firstName} {job.user.lastName}</td>
                <td className="p-3">{job.jobtype.jobcategories}</td>
                <td className="p-3">{job.description.split(" ").slice(0,10).join(" ")+".."}</td>
                <td className="p-3">{job.salary}</td>
                <td className="p-3">{job.location}</td>
                <td className="p-3">
                    <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900" onClick={navigateJob} value={job._id}>
                        Edit
                    </button>
                </td>
                <td className="p-2">
                    <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={job._id} onClick={DeleteJob}>
                        Delete
                    </button>
                </td>
              </tr>
              
             </tbody>
          
          )
          :
           jobbypostuserid && jobbypostuserid !=null ?
              
              jobbypostuserid.map(
                (job,i) =>
                <tbody key={i} className="bg-[#F5F5F5] text-black">
                <tr>
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">{job.user.firstName} {job.user.lastName}</td>
                  <td className="p-3">{job.jobtype.jobcategories}</td>
                  <td className="p-3">{job.description.split(" ").slice(0,10).join(" ")+".."}</td>
                  <td className="p-3">{job.salary}</td>
                  <td className="p-3">{job.location}</td>
                  <td className="p-3">
                      <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900" onClick={navigateJob} value={job._id}>
                          Edit
                      </button>
                  </td>
                  <td className="p-2">
                      <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={job._id} onClick={DeleteJob}>
                          Delete
                      </button>
                  </td>
                </tr>
                
               </tbody>
              )
              
              :
              <Box
                 sx={{
                     height:250,
                     display:"flex",
                     justifyContent:"center",
                     alignItems:"center"
                      }}
                >
               <Typography>
                    No Content 
               </Typography>
              </Box>
           }
          </table>
          :
          <>  {/* If job doesn't existed, no content will show  */}
              <Box
                 sx={{
                     height:250,
                     display:"flex",
                     justifyContent:"center",
                     alignItems:"center"
                      }}
                >
               <Typography>
                    No Content 
               </Typography>
              </Box>
              </>
             
    }
    {
        loading ? 
        ' '
        :
        <div className="mt-6 ">
           <Pagination  count={accounttype==1 ? count : countPagination} onChange={(event,value)=>setPage(value)} />
        </div>
    }
    
 

  </div>);
}
