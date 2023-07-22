import { useDispatch, useSelector } from 'react-redux';
import '../css/output.css';
import { useEffect, useState } from 'react';
import { LoadingComponent } from '../component/loadingcomponent';
import { DeleteJobTypeAction, JobTypeLoadAction } from '../redux/actions/jobtypeaction';
import { Box, Pagination, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserSingleAction } from '../redux/actions/userrequestaction';

export const CategoryTable = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accounttype = JSON.parse(localStorage.getItem('userInfo'))
                  .accounttype;
    const userid = JSON.parse(localStorage.getItem('userInfo'))
                  .id;
    const [pageNumber,setPageNumber]= useState(1);
    useEffect(()=>{
      dispatch(JobTypeLoadAction(pageNumber,5));
      dispatch(UserSingleAction(userid))
  
    },[pageNumber]);
    
    //destrusture job types and loading from reducer
    const {jobtypes, loading, count} = useSelector(state=> state.loadJobTypeReducers);
    
    //destrusture user  and loading from reducer
    const {user} = useSelector(state => state.userSingleReducers);
    
    //edit delete category using edit button's value that have id
    const navigateEdit = (e)=>{
      navigate(`/admindashboard/editcategory/${e.target.value}`);
    }
    
    //delete category using delete button's value that have id
    const DeleteCategory = (e)=>{
      dispatch(DeleteJobTypeAction(e.target.value));
    }

    return (
      
    <div className= "mt-4 ml-4 ">
    <h2 className="ml-4 ">Category Table</h2>
    {
        loading ?
        <LoadingComponent />
        :
        
        jobtypes && jobtypes.length != 0 ?
        
        <table className="table-auto  text-[#AEAEAE] font-serif mt-4 ml-4 shadow-xl">
    <thead className="bg-[#36304A]">
      <tr >
        <th className="p-3">Category Name</th>
        <th className="p-3">Post By</th>
        <th className="p-3">Edit</th>
        <th className="p-3">Delete</th> 
      </tr>
    </thead>
    {
    jobtypes.map((job,i)=>{
    return (
    <tbody key={i} className="bg-[#F5F5F5] text-black">
      <tr>
        <td className="p-3">{job.jobcategories}</td>
        <td className="p-3">{job.user.email}</td>
        
        {
           accounttype == 1 ? 
           
             <>
            <td className="p-3">
              <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900" onClick={navigateEdit} value={job._id}>
                Edit
            </button>
            </td>
            <td className="p-2">
              <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={job._id} onClick={DeleteCategory}>
                Delete
              </button>
             </td>
             </>
             :
             user && 
             user.email == job.user.email ?
             <>
             <td className="p-3">
               <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900" onClick={navigateEdit} value={job._id}>
                 Edit
             </button>
             </td>
             <td className="p-2">
               <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={job._id} onClick={DeleteCategory}>
                 Delete
               </button>
              </td>
              </>
              :
              ""
            
        }
        
      </tr>
      
    </tbody>
      )

})}
    
  </table>
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
  {
    loading ?
    ''
    :
    <div className="mt-4 ml-4">
      <Pagination count={count} onChange={(event,value)=>{
        setPageNumber(value)}
      } />
    </div>
    
  }
  </div>);
}