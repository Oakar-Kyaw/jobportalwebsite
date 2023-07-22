

import { useFormik } from 'formik';
import * as yup from 'yup';

import { useDispatch } from "react-redux";

import { TextField } from '@mui/material';
import { JobTypeAddAction } from '../redux/actions/jobtypeaction';



export const AddCategory = ()=>{ 
    
    const dispatch = useDispatch();
    
        
        const validationSchema = yup.object({
          jobcategories: yup
            .string('Enter your job categories')
            .required('Category name is required')
        });
        
 
          const formik = useFormik({
            initialValues: {
              jobcategories:''
            },
            validationSchema: validationSchema,
            onSubmit: (values,action) => {
              dispatch(JobTypeAddAction(values));
              action.resetForm();
              
            },
          });
        
        return (
            <>
             
             <div className="flex font-serif  w-full justify-center items-center h-full mt-4">
                <div className="flex-col  p-6 px-12 rounded-md shadow-xl">
                    <div className="text-center pb-3 mb-2">Add Categories</div>
                    <form onSubmit={formik.handleSubmit} >
                        <div>
                        <TextField
                          fullWidth
                          sx={{mb:4}}
                          id="jobcategories"
                          name="jobcategories"
                          label="Job Category"
                          value={formik.values.jobcategories}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.touched.jobcategories && Boolean(formik.errors.jobcategories)}
                          helperText={formik.touched.jobcategories && formik.errors.jobcategories}
                          />
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