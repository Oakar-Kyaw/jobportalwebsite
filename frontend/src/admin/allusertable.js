import { useEffect, useState } from 'react';
import '../css/output.css';
import { useDispatch, useSelector } from 'react-redux';
import { UserDeleteAction, UserLoadAction, UserSingleAction } from '../redux/actions/userrequestaction';
import { Box, Pagination, Typography } from '@mui/material';
import { LoadingComponent } from '../component/loadingcomponent';
import { useNavigate } from 'react-router-dom';
import { JobSingleAction } from '../redux/actions/jobaction';

export const UserTable = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [page,setPage] = useState(1);
    const accounttype = JSON.parse(localStorage.getItem('userInfo'))
                        .accounttype;
    const userid =JSON.parse(localStorage.getItem('userInfo'))
                  .id;
    
    useEffect(()=>{
      
        dispatch(UserLoadAction(page,5));
     
        dispatch(UserSingleAction(userid))
      
      
      
    },[page]);

    const {count,loading,user} = useSelector(state=>state.userLoadReducers);
    const singleuser = useSelector(state=>state.userSingleReducers);
    
    //edit category using edit button's value that have id
    const handleEdit = (e)=>{
      navigate(`/admindashboard/edit/${e.target.value}`);

    }

    //delete category using delete button's value that have id
    const DeleteUser = (e)=>{
      dispatch(UserDeleteAction(e.target.value));
    }

    return (
    <div className= "mt-4 ml-4 ">
    <h2 className="ml-4 ">User Table</h2>
    {
      loading ?
      <LoadingComponent/>
      :
      user && user.length != 0 ?
      <table className="table-auto  text-[#AEAEAE] font-serif mt-4 ml-4 shadow-xl">
    <thead className="bg-[#36304A]">
      <tr >
        <th className="p-3">First Name</th>
        <th className="p-3">Last Name</th>
        <th className="p-3">Email</th>
        <th className="p-3">Edit</th>
        <th className="p-3">Delete</th>
      </tr>
    </thead>
    {
     accounttype ==1 ?
      user.map((data,i)=>{
        return (
        <tbody key={i} className="bg-[#F5F5F5] text-black">
        <tr>
        <td className="p-3">{data.firstName}</td>
        <td className="p-3">{data.lastName}</td>
        <td className="p-3">{data.email}</td>
        
        <td className="p-3">
            <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900 cursor-pointer" onClick={handleEdit} value={data._id}>
                Edit
            </button>
        </td>
        <td className="p-2">
            <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={data._id} onClick={DeleteUser}>
                Delete
            </button>
        </td>
      </tr>
      
    </tbody>

        );
      })
      
    :
    singleuser.user && 
   <tbody  className="bg-[#F5F5F5] text-black">
    <tr>
    <td className="p-3">{singleuser.user.firstName}</td>
    <td className="p-3">{singleuser.user.lastName}</td>
    <td className="p-3">{singleuser.user.email}</td>
    
    <td className="p-3">
        <button className=" bg-green-700 text-white p-2 rounded-sm hover:bg-green-900 cursor-pointer" onClick={handleEdit} value={singleuser.user._id}>
            Edit
        </button>
    </td>
    <td className="p-2">
        <button className="bg-red-700 text-white p-2 rounded-sm hover:bg-red-900" value={singleuser.user._id} onClick={DeleteUser}>
            Delete
        </button>
    </td>
  </tr>
  
  </tbody>
  
  
    }
    
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
     No User
</Typography>
</Box>
    }
  
  {
    loading ? 
    ' '
    :
   accounttype == 1 ?
    <div className="mt-6 ">
    <Pagination  count={count} onChange={(event,value)=>setPage(value)} />
    </div>
    :
    ""
  }
  
  </div>);
}