import { Box, Button, InputBase, Stack } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useNavigate} from 'react-router-dom';

export const SearchForm= ()=>{

    //for validation purpose
    const validationSchema = yup.object({
        search: yup
          .string('Enter your search word')
          .required('Search word is required'),
       
      });

    const onSubmit = (values,actions)=>{
        const {search} =values;
        if(search.trim()){
            navigate(`/search/${search}`);
        }
        else {
            navigate('/');
        }
    }

    const navigate= useNavigate();
    const formik =useFormik({
        initialValues:{
            search:''
        },
        validationSchema:validationSchema,
        onSubmit:onSubmit
    })

    
    return (
        <form style={{width:"60%"}} onSubmit={formik.handleSubmit}>
        <Box sx={{width:'100%',display:"flex", justifyContent:"center",alignItems:"center"}}>
        
        {/* input search form*/}
         <InputBase sx={{padding:"10px", bgcolor:"white"}}
          fullWidth={true}
          id="search"
          name="search"
          label="Search"
          placeholder="Ex: Sale Marketing, IT "
          value={formik.values.search}
          onChange={formik.handleChange}
          error={formik.touched.search && Boolean(formik.errors.search)}
         />
      
        <Button color="primary" variant="contained" type="submit" disabled={formik.isSubmitting} style={{padding:"13px",paddingLeft:'20px',paddingRight:"20px", borderRadius:'0%'}} >
          Search
        </Button>
       
        </Box>
        <Box component="span" sx={{color:'red'}}>{formik.touched.search && formik.errors.search}</Box>
        </form>
    );
}