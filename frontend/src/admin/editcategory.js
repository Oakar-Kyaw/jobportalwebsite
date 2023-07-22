import { useEffect } from "react";
import '../css/output.css';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditJobTypeAction, JobTypeSingleAction } from "../redux/actions/jobtypeaction";
import {   useFormik } from 'formik';
import * as yup from 'yup';
import { LoadingComponent } from "../component/loadingcomponent";
import { Box, TextField, Typography } from "@mui/material";


export const EditCategory = ()=> {
    const {id} = useParams();
    const dispatch = useDispatch();

   useEffect(()=>{
       
       dispatch(JobTypeSingleAction(id));
   },[]);

   const {singlejobtype,loading} = useSelector(state => state.jobTypeSingleReducers);

   const validationSchema = yup.object({
     jobcategories: yup
       .string('Enter Job Category')
       .required('Job Category is required'),

   });
   const formik = useFormik({
       initialValues: {
         jobcategories:singlejobtype && singlejobtype.jobcategories,
         id:singlejobtype && singlejobtype._id
         
       },
       validationSchema: validationSchema,
       enableReinitialize:true,
       onSubmit: (values,action) => {
         let id = values.id;
         dispatch(EditJobTypeAction(values,id));
       },
       
     });
   


   return (
      <>
      {
       loading ? 
       <LoadingComponent />
       :
       singlejobtype  ?
       <div className="flex-col bg-white text-black  p-4  rounded-sm shadow-xl ml-4  mt-4">
                   <div className="text-center pb-2 mb-2">Edit Category</div>
                   
                   <form onSubmit={formik.handleSubmit} >
                       <div >
                       <TextField
                         fullWidth
                         sx={{mb:4}}
                         id="jobcategories"
                         name="jobcategories"
                         label="Job Category"
                         value={formik.values.jobcategories }
                         onChange={formik.handleChange}
                         onBlur={formik.handleBlur}
                         error={formik.touched.jobcategories && Boolean(formik.errors.jobcategories)}
                         helperText={formik.touched.jobcategories && formik.errors.jobcategories}
                         />
                       </div>
                       
                       <div>
                       <input
                         id="id"
                         name="id"
                         value={singlejobtype._id}
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