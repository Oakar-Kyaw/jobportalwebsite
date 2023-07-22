import React from 'react';
import {NavBar} from '../component/navbar';
import image from '../images/pagenotfound.jpg';
import { Footer } from '../component/footer';
import { Box, styled } from '@mui/material';

const NotFound =()=>{
    const StylePageNotFounded= styled(Box)(({theme})=>({
         
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:window.innerHeight,
        backgroundImage:`url(${image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        backgroundPosition:"center",
        backgroundColor:theme.palette.secondary.main,
    }))
    return (
        <>
         <NavBar/>
         
          <StylePageNotFounded></StylePageNotFounded>
       
        </>
    );
}

export default NotFound;