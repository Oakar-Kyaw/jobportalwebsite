import React, { useEffect } from 'react';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { NavBar } from '../component/navbar';
import PersonIcon from '@mui/icons-material/Person';
import { Footer } from '../component/footer';
import { useDispatch, useSelector } from 'react-redux';
import { UserRequestAction } from '../redux/actions/userrequestaction';
import { useNavigate } from 'react-router-dom';


export const LoginPage =()=>{
       const dispatch = useDispatch();
       const navigate = useNavigate();
       let isLoggedIn =  JSON.parse(localStorage.getItem('userInfo'));
       

       const validationSchema = yup.object({
         email: yup
           .string('Enter your email')
           .email('Enter a valid email')
           .required('Email is required'),
         password: yup
           .string('Enter your password')
           .min(6, 'Password should be of minimum 8 characters length')
           .required('Password is required'),
       });
       

         const formik = useFormik({
           initialValues: {
             email: '',
             password: '',
           },
           validationSchema: validationSchema,
           onSubmit: (values,action) => {
             dispatch(UserRequestAction(values))
             action.resetForm();
             
           
           },
         });
       
         return (
           <div>
            <NavBar />
           
            <Box sx={{ height:"90vh", display:"flex", alignItems:"center",justifyContent:"center"}}>
              
            <form onSubmit={formik.handleSubmit} style={{width:"50%"}}>
             <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mb:4}}>
                 <Avatar sx={{ bgcolor: "black" }}>
                    <PersonIcon/>
                  </Avatar>
                  <Typography
                       variant="h5"
                       sx={{
                        marginLeft:"10px",
                       fontFamily: 'monospace',
                       fontWeight: 600,
                       
                     }}
                    >
                        Login
                     </Typography>
             </Box>
           
               <TextField
                 fullWidth
                 sx={{mb:4}}
                 id="email"
                 name="email"
                 label="Email"
                 value={formik.values.email}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={formik.touched.email && Boolean(formik.errors.email)}
                 helperText={formik.touched.email && formik.errors.email}
               />
               <TextField
                 fullWidth
                 sx={{mb:4}}
                 id="password"
                 name="password"
                 label="Password"
                 type="password"
                 value={formik.values.password}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 error={formik.touched.password && Boolean(formik.errors.password)}
                 helperText={formik.touched.password && formik.errors.password}
               />
               <Button color="primary" variant="contained" fullWidth style={{paddingTop:"10px", paddingBottom:"10px",borderRadius:"5px"}} type="submit">
                 Submit
               </Button>
               
             </form>
             </Box>
             

             <Footer/>
           </div>
         );
       
       
}
