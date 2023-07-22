import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { EditJobAction, JobSingleAction } from "../redux/actions/jobaction";
import { Box, TextField, Typography } from "@mui/material";
import {   useFormik } from 'formik';
import * as yup from 'yup';
import { JobTypeLoadAction } from "../redux/actions/jobtypeaction";
import { LoadingComponent } from "../component/loadingcomponent";

export const EditJob = ()=>{
    const {id} = useParams();
    const dispatch= useDispatch();

    useEffect(()=>{
       dispatch(JobSingleAction(id));
       dispatch(JobTypeLoadAction(1,0)); 
    },[])
    
    const { getsinglejob,loading} = useSelector(state=>state.jobSingleReducers);
    const {jobtypes}= useSelector(state => state.loadJobTypeReducers);

    const validationSchema = yup.object({
        title: yup
        .string('Enter title')
        .required('Title is required'),

      description: yup
        .string('Enter description')
        .required('Description is required'),


      salary: yup
        .string('Enter salary')
        .required('Salary is required'),

      location: yup
        .string('Enter location')
        .required('Location is required'),
    
      availiable: yup
        .string("Availiable is required")
        .required('Availiable is required'),
      
      jobtype: yup
        .string("Availiable is required")
        .required('Job Type is required'),
      
   
      });
      const formik = useFormik({
          initialValues: {
            title:getsinglejob && getsinglejob.title,
            description:getsinglejob && getsinglejob.description,
            salary:getsinglejob && getsinglejob.salary,
            location:getsinglejob && getsinglejob.location,
            availiable:getsinglejob && getsinglejob.availiable,
            jobtype:getsinglejob && getsinglejob.jobtype.jobcategories,
            
          },
          validationSchema: validationSchema,
          enableReinitialize:true,
          onSubmit: (values,action) => {
            
            
            dispatch(EditJobAction(values,id));
          },
          
        });
      
   
   
      return (
         <>
         {
          loading ? 
          <LoadingComponent />
          :
          getsinglejob  ?
          <div className="flex-col bg-white text-black  p-4  rounded-sm shadow-xl ml-4  mt-4">
                      <div className="text-center pb-2 mb-2">Edit Job</div>
                      
                      <form onSubmit={formik.handleSubmit} >
                    <div>
                    <TextField
                      fullWidth
                      sx={{mb:4}}
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                      helperText={formik.touched.title && formik.errors.title}
                      />
                    </div>
                    <div className="mb-4">
                        <label className="text-blue-700">Job Type: </label>
                          <select name="jobtype" id="jobtype"  onChange={formik.handleChange}>
                            {
                              jobtypes && jobtypes.map((jobtype)=>{
                                        return (

                                            <>
                                            <option ></option>
                                            <option value={jobtype._id}>{jobtype.jobcategories}</option>
                                            </>
                                        );
                               })
                              
                              
                            }
                              
                          </select>
                        </div>

                    <div >
                    <TextField
                      fullWidth
                      sx={{mb:4}}
                      id="salary"
                      name="salary"
                      label="Salary"
                      value={formik.values.salary}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.salary && Boolean(formik.errors.salary)}
                      helperText={formik.touched.salary && formik.errors.salary}
                      />
                    </div>
                    <div>
                    <label for="description" className="block mb-2 text-sm font-medium  text-blue-700">Description</label>
                    <textarea
                      rows="6" 
                      className="mb-4  block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your description here..."
                      
                      id="description"
                      name="description"
                      label="Description"
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                      />
                    </div>
                    <div>
                    <TextField
                      fullWidth
                      sx={{mb:4}}
                      id="location"
                      name="location"
                      label="Location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.location && Boolean(formik.errors.location)}
                      helperText={formik.touched.location && formik.errors.location}
                      />

                    </div>

                    <div className="mb-6">
                           <label className="text-blue-700">Availiable: </label>
                          <select name="availiable" id="availiable" onChange={formik.handleChange}>
                            {
                               getsinglejob.availiable == true ?
                               <>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                               </>
                               :
                               <>
                                <option value={false}>False</option>
                                <option value={true}>True</option>
                                
                               </>
                            }
                              
                             
                          </select>
                        </div>

                        
                        
                    <div className="text-center">
                        <button className="p-2 bg-blue-700 text-white rounded-sm hover:bg-blue-900 shadow-lg" type="submit">
                            Edit
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