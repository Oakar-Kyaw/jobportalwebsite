import { Card, CardActionArea, CardActions, CardContent , Typography, Button, useTheme, Box, Divider } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FolderIcon from '@mui/icons-material/Folder';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


export const CardComponents=({id,title, descriptions,user,salary,location,jobtypes})=>{
   
    const {palette} = useTheme();
    const navigate = useNavigate();

    //navigate to single job page
    const navigateSingleJobPage = ()=>{
      navigate(`/job/${id}`);
    }
    return (
        <div>
             <Card id={id} variant="outlined" sx={{ minWidth:300, mt:2, mb:4, spacing:4, p:2}}>
                 <CardActionArea >

                    <CardContent > 
                      <Typography gutterBottom variant="h5" component="div" sx={{color:"blueviolet" }}>
                         {title}
                     </Typography>
                     <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                       {user.firstName} {user.lastName}
                     </Typography>
                      <Box sx={{display:'flex', alignItems:"center" , justifyContent:"space-between", mt:1,color:palette.secondary.main}} >
                      <Typography variant="body2" >
                        {salary}
                     </Typography>
                      
                       
                        <Typography sx={{display:"flex", alignItems:"center"}} variant="body2" component="text.secondary">
                            <LocationOnIcon />  
                            {location}
                         </Typography>
                      </Box>
                      
                    
                     <Typography variant="body2" color="text.secondary" sx={{mt:1}}>
                       {descriptions.split(" ").splice(0,15).join(" ")+" ..."}
                     </Typography>
                   </CardContent>
                 </CardActionArea>
                 <CardActions sx={{mb:2}}>
                   <Button size="small" sx={{ backgroundColor:palette.secondary.main, color:"whitesmoke"}}   onClick={navigateSingleJobPage}>
                     <AddIcon/> More Detail
                   </Button>
                 </CardActions>
                 <Divider></Divider>
                 <Typography variant="body2" color="text.secondary" sx={{mt:2, ml:1, display:"flex", alignItems:"end"}}>
                    <FolderIcon sx={{mr:1}}/> Job Function:  {jobtypes}
                </Typography>
               </Card>
        </div>
    );
}