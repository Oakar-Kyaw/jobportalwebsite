import React,{useState,useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {NavBar} from '../component/navbar';
import { Header } from '../component/header';
import {useDispatch, useSelector} from 'react-redux';
import {JobLoadAction} from '../redux/actions/jobaction';
import { Box, Container, Stack, Card, Typography, useTheme, Pagination, MenuItem, ListItemIcon } from '@mui/material';
import { CardComponents } from '../component/cardcomponents';
import { LoadingComponent } from '../component/loadingcomponent';
import { JobTypeLoadAction } from '../redux/actions/jobtypeaction';
import { FormController } from '../component/formcomponent';
import { Footer } from '../component/footer';
import LocationOnIcon from '@mui/icons-material/LocationOn';


const HomePage = ()=>{
    const {palette}= useTheme();
    const {keyword, location}= useParams();
    const [page,setPage] = useState(1);
    const [cate,setCate] = useState("");
    const dispatch =useDispatch();
    
    useEffect(()=>{
          {/* dispatch job type load action when home.js run */}
        dispatch(JobTypeLoadAction(1,0));
         {/* dispatch job load action when home.js run */}
        dispatch(JobLoadAction(page,keyword,cate,location));
    },[page,keyword,cate,location])

    const {jobs,count,loading,SetUniqueLocation} = useSelector(state=>state.loadJobReucers);
    
    let locations = [];
    if(SetUniqueLocation && SetUniqueLocation.length !== 0){
    
       locations = SetUniqueLocation.reduce((location,nextlocation)=>{
     
          var overlap_location = location.filter((e)=> e.location == nextlocation.location);
          
          if(overlap_location.length <= 0) {
               location.push(nextlocation)
          } 
        return location;
      },[])
      
    }
    
      {/* This is to change category  param updating from formcomponent*/}
    const handleChangeCate=(event)=>{
            setCate(event.target.value);
    }
    
    return (
        
        <>
        <Box sx={{ minHeight:"100vh" }}>
            <NavBar/>
            <Header/>
            <Container>
                <Stack
                direction={{xs:"column", sm:"row"}}
                spacing={{xs:"1" , sm:"2", md:"3"}}
                >
                    <Box sx={{flex:2, p:2}}>
                        <Card sx={{minWidth:"150px", mt:2, mb:3, p:2}}>
                          <Typography component="h4" sx={{
                           color:palette.secondary.main
                           }}>
                             Filter By 
                         </Typography>

                         {/* Form to change category */}
                         <FormController 
                         handleChangeCate={handleChangeCate}
                         cat={cate} />
                        </Card>

                        {/* Card for search by location*/}

                        <Card sx={{minWidth:"150px", mt:2, mb:3, p:2}}>
                          <Typography component="h4" sx={{
                           color:palette.secondary.main
                           }}>
                             Filter By Location
                         </Typography>

                         {/* Form to change location */}
                         <MenuItem>
                            <ListItemIcon sx={{color:palette.secondary.main}}>
                                <LocationOnIcon/>
                            </ListItemIcon>
                            <Link to={"/"}  style={{ textDecoration: 'none' }}>All</Link>
                            
                           </MenuItem>
                          {
                            locations && locations.length !== 0
                             ?
                             locations.map((location,i)=>
                             <MenuItem
                              key={i}
                            >
                            <ListItemIcon sx={{color:palette.secondary.main}}>
                                <LocationOnIcon/>
                            </ListItemIcon>
                            <Link to={`/search/location/${location.location}`} style={{ textDecoration: 'none' }}>{location.location}</Link>
                            
                           </MenuItem>)
                            

                             : ''
                          }
              
                        </Card>

                    </Box>
                    <Box sx={{flex:4, p:2}}>
                        {
                            loading ? 
                            
                              <> 
                                {/* loading is true */}                 
                               <LoadingComponent />
                              </>
                               :

                        /* jobs from api existed and length of job is zero */
                        jobs && jobs.length !== 0 ?
                             jobs.map((job,i)=>{
                                return (

                                  /* Card Components from component file */
                                   <CardComponents
                                    key={i}
                                    id ={job._id} 
                                    title={job.title} 
                                    descriptions={job.description} 
                                    user={job.user}
                                    salary={job.salary}
                                    location={job.location}
                                    jobtypes={job.jobtype.jobcategories ==' '?'No Categories' : job.jobtype.jobcategories}
                                    />
                                );
                            })
                            :
                            <>
                              {/* If job doesn't existed, no content will show  */}
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
                          {/* Pagination for contents */}
                    
                        <Stack spacing={4}>
                            <Pagination  count={count} onChange={(event,value)=>setPage(value)} />
                        </Stack>
                    </Box>
                 
                </Stack>
            </Container>
            <Footer />
         </Box>
        </>
    );
}

export default HomePage;