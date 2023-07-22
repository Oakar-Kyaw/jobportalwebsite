import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { NavBar } from '../component/navbar';
import { Footer } from '../component/footer';
import { TextField } from '@mui/material';
import { UserSignUpAction } from '../redux/actions/userrequestaction';

export const SignUpPage = ()=>{ 
    
    const dispatch = useDispatch();
    
    const navigate = useNavigate();
    let isLoggedIn =  JSON.parse(localStorage.getItem('userInfo'));
    useEffect(()=>{
     isLoggedIn ?
      navigate('/') 
      : navigate('/signup');
    },[])
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

          password: yup
            .string('Enter your password')
            .min(6, 'At least 6 characters length')
            .required('Password is required'),
        });
        
 
          const formik = useFormik({
            initialValues: {
              firstName:'',
              lastName:'',
              email: '',
              password: '',
            },
            validationSchema: validationSchema,
            onSubmit: (values,action) => {
              dispatch(UserSignUpAction(values))
              action.resetForm();
            },
          });
        
        return (
            <>
             <NavBar />
             <div className="flex font-serif  w-screen justify-center items-center h-screen mt-4">
                <div className="flex-col  p-6 px-12 rounded-md shadow-xl">
                    <div className="text-center pb-3 mb-2">Sign Up</div>
                    <form onSubmit={formik.handleSubmit} >
                        <div>
                        <TextField
                          fullWidth
                          sx={{mb:4}}
                          id="firstName"
                          name="firstName"
                          label="First Name"
                          value={formik.values.firstName}
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
                        </div>
                        <div className="text-center">
                            <button className="p-2 bg-blue-700 text-white rounded-sm hover:bg-blue-900 shadow-lg" type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
               
             </div>
            
             
 
              <Footer/>
            </>
    )
}