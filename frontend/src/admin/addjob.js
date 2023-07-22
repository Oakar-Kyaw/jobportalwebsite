
import {  useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch, useSelector } from "react-redux";

import { TextField } from '@mui/material';
import { useEffect } from 'react';
import { UserLoadAction } from '../redux/actions/userrequestaction';
import { JobTypeLoadAction } from '../redux/actions/jobtypeaction';
import { AddJobAction } from '../redux/actions/jobaction';



export const AddJob = ()=>{
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(JobTypeLoadAction(1,0))
    },[])

   
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
          title:'',
          description:'',
          salary:'',
          location:'',
          jobtype:'',
          availiable:true
          
        },
        validationSchema: validationSchema,
        onSubmit: (values,action) => {
          console.log('value is '+JSON.stringify(values))
         dispatch(AddJobAction(values))
        },
      });
    
    return (
        <>
         
         <div className="flex font-serif  w-full  mt-2">
            <div className="flex-col w-full p-6 px-12 rounded-md shadow-xl">
                <div className="text-center pb-3 mb-2 space-y-2">Add Job</div>
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
                              jobtypes && jobtypes.map((jobtype,i)=>{
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
                              
                              <option value={true}>True</option>
                              <option value={false}>False</option>
                          </select>
                        </div>

                        
                        
                    <div className="text-center">
                        <button className="p-2 bg-blue-700 text-white rounded-sm hover:bg-blue-900 shadow-lg" type="submit">
                            Add
                        </button>
                    </div>
                </form>
            </div>
           
         </div>
        
         

        </>
)
}