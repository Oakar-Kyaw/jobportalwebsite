import { useDispatch, useSelector } from 'react-redux';
import '../css/output.css';
import { useEffect } from 'react';
import { UserProfileAction } from '../redux/actions/userprofileaction';
import { LoadingComponent } from './loadingcomponent';
import { Box, Input, TextField, Typography } from '@mui/material';
import {  useFormik } from 'formik';
import * as yup from 'yup';
import { UserEditAction } from '../redux/actions/userrequestaction';

export const PersonalInfo = ()=>{
    const dispatch = useDispatch();
    let id = JSON.parse(localStorage.getItem("userInfo")).id;
    useEffect(()=>{
        dispatch(UserProfileAction(id));
    },[]);
    const {user,loading} = useSelector(state => state.userProfile);
    const validationSchema = yup.object({
      firstName: yup
        .string('Enter your first name')
        .required('First name is required'),

      lastName: yup
        .string('Enter your last name')
        .required('Last name is required'),


      email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),

    });
    

      const formik = useFormik({
        initialValues: {
          firstName:user && user.firstName,
          lastName:user && user.lastName,
          email: user && user.email,
          
        },
        validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: (values,action) => {
          let id = JSON.parse(localStorage.getItem('userInfo')).id;
          dispatch(UserEditAction(values,id));
        },
        
      });

    return (
             
                <>
                
                 <div className="flex-col   ml-4 mt-4 mb-4 shadow-xl p-2 px-4 
                  text-black bg-white min-w-2/4 rounded-sm"> 
                   <div className="text-center p-1">
                     Personal Info
                  </div>
                   
                   {
                    loading ?
                      <LoadingComponent />
                      :

                      user && user != null ?
                       <>
                       <div className=" flex justify-between">
                          <div className="p-4">First Name:<span className="text-blue-900">{user.firstName}</span> </div>
                          <div className="p-4">Last Name:<span className="text-blue-900">{user.lastName}</span> </div>
                       </div>
                        <div className="px-4 py-2">
                             Email: <span className="text-blue-900">{user.email}</span>
                        </div>

                        
                         </>
                      :
                     // if there is no user
                    <Box sx={{width:"500px",height:"300px", display:"flex", justifyContent:"center", alignItems:"center"}} >
                       <Typography>No Content</Typography>
                     </Box>
                    }
                  
                   
                 </div>
                  
                  {user && user != null ?
                    <div className="flex-col bg-white text-black  p-4  rounded-sm shadow-xl ml-4 ">
                    <div className="text-center pb-2 mb-2">Edit User</div>
                    <form onSubmit={formik.handleSubmit} >
                        <div>
                        <TextField
                          fullWidth
                          sx={{mb:4}}
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={formik.values.firstName }
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                          helperText={formik.touched.firstName && formik.errors.firstName}
                          />
                        </div>

                        <div>
                        <TextField
                          fullWidth
                          sx={{mb:4}}
                          id="lastName"
                          name="lastName"
                          label="Last Name"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                          helperText={formik.touched.lastName && formik.errors.lastName}
                          />
                        </div>
                        
                        <div>
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
                        </div>
                        
                        <div className="text-center">
                            <button className="p-2 bg-blue-700 text-white rounded-sm hover:bg-blue-900 shadow-lg" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
               
                    :
                    " "
                  }
                
                   </>  
        
    );
}
