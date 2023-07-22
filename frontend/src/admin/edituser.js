import { Box, Input, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import '../css/output.css';
import { useParams } from "react-router-dom";
import { UserEditAction, UserSingleAction } from "../redux/actions/userrequestaction";
import {  Field, useFormik,FormikProps  } from 'formik';
import * as yup from 'yup';
import { useEffect } from "react";
import { LoadingComponent } from "../component/loadingcomponent";

export const EditUser = ()=>{
     const {id} = useParams();
     const dispatch = useDispatch();

    useEffect(()=>{
        
        dispatch(UserSingleAction(id));
    },[]);

    const {user,loading} = useSelector(state => state.userSingleReducers);

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
          id:user && user._id,
          role:user && user.role
          
        },
        validationSchema: validationSchema,
        enableReinitialize:true,
        onSubmit: (values,action) => {
          let id = values.id;
          
          dispatch(UserEditAction(values,id));
        },
        
      });
    
 

    return (
       <>
       {
        loading ? 
        <LoadingComponent />
        :
        user  ?
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
                        
                        <div>
                          <select name="role" id="role" onChange={formik.handleChange}>
                            {
                              user.role == 0 ?
                              <>
                              <option value={0}>Employee</option>
                              <option value={1}>Company</option>
                              </>
                              :
                              <>
                              <option value={1}>Company</option>
                              <option value={0}>Employee</option>
                              </>
                            }
                              
                          </select>
                        </div>
                        
                        
                        <div>
                        <input
                          id="id"
                          name="id"
                          value={user._id}
                          hidden
                          />
                        </div>
                        
                        <div className="text-center">
                            <button className="p-2 bg-blue-700 text-white rounded-sm hover:bg-blue-900 shadow-lg" type="submit" >
                                Update
                            </button>
                        </div>
                    </form>
                    
                </div> 
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
               
       </>
    );
        
  
}