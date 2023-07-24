import { Navigate, useNavigate, useParams } from "react-router-dom";
import { NavBar } from "../component/navbar";
import { Footer } from "../component/footer";
import { useEffect } from "react";
import { AppliedJobAction, JobSingleAction } from "../redux/actions/jobaction";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "../component/loadingcomponent";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, Divider, Typography } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import { toast } from 'react-toastify';
import  "react-toastify/dist/ReactToastify.css";

export const SingleJobPage= ()=>{
    const {id} = useParams();
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{

        dispatch(JobSingleAction(id));
    },[])
    
    const {getsinglejob,loading} = useSelector(state => state.jobSingleReducers);
    
    const ApplyJob = ()=>{
        let isAuthenticated = JSON.parse(localStorage.getItem('userInfo'));
        if(!isAuthenticated){
          toast.error("You Need To Login First")
          return navigate('/login');
        }
        let userid = JSON.parse(localStorage.getItem("userInfo")).id;
        let jobid= id;
        let title = getsinglejob && getsinglejob.title;
        let description =  getsinglejob && getsinglejob.description;
        let salary = getsinglejob && getsinglejob.salary;
        let location = getsinglejob && getsinglejob.location;
        let userid = getsinglejob && getsinglejob.user._id;
        let postownername = getsinglejob && getsinglejob.user.firstName+" "+getsinglejob.user.lastName;
        let values = {
                    id  : userid,
                  jobid : jobid,
                  title : title,
                  description : description,
                  salary : salary,
                  location : location,
                  userid : userid,
                  postownername :postownername
        }
        dispatch(AppliedJobAction(values))

    }
   return (
    <>
    <NavBar/>
    {
        loading ?
        <div style={{ height:"500px"}}>
           <LoadingComponent /> 
        </div>
        
        :
        getsinglejob &&
        <div style={{ height:"500px"}}>
        <Card id={id} variant="outlined" sx={{ m:4, spacing:4, p:2, minWidth:500, height:"400px"}} >
                 <CardActionArea >

                    <CardContent > 
                      <Typography gutterBottom variant="h5" component="div" sx={{color:"blueviolet" }}>
                         {getsinglejob.title}
                     </Typography>
                     
                     <Typography variant="body2" sx={{mt:1}}>
                       Post By: <span style={{color:palette.secondary.main}}> {getsinglejob.user.firstName} {getsinglejob.user.lastName}</span>
                     </Typography>
                      <Box sx={{display:'flex', alignItems:"center" , justifyContent:"space-between", mt:1}} >
                      <Typography variant="body2" component="text.secondary">
                       Salary: <span style={{color:"red"}}>{getsinglejob.salary}</span> 
                     </Typography>
                      
                       
                        <Typography sx={{display:"flex", alignItems:"center"}} variant="body2" component="text.secondary">
                            <LocationOnIcon />  
                            {getsinglejob.location}
                         </Typography>
                      </Box>
                      
                    
                     <Typography variant="body2" color="text.secondary" sx={{mt:2}}>
                     - {getsinglejob.description}
                     </Typography>
                   </CardContent>
                 </CardActionArea>
                 <CardActions sx={{mb:2}}>
                   <Button size="small" sx={{ backgroundColor:palette.secondary.main, color:"whitesmoke"}}  onClick={ApplyJob} >
                     <AddIcon/> Apply
                   </Button>
                 </CardActions>
                 <Divider></Divider>
                 <Typography variant="body2" color="text.secondary" sx={{mt:2, ml:1, display:"flex", alignItems:"end"}}>
                    <FolderIcon sx={{mr:1}}/> Job Function:  {getsinglejob.jobtype.jobcategories}
                </Typography>
               </Card>  
               </div>
    }
    
    <Footer />
    </>
    
   );
}
