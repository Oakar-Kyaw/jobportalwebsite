import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';
import image from '../images/job.webp';
import React from 'react';
import { SearchForm } from './searchform';

export const Header=()=>{
    const StyleHeader= styled(Box)(({theme})=>({
        
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"400px",
        backgroundImage:`url(${image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"cover",
        //backgroundPosition:"center",
        backgroundColor:theme.palette.secondary.main,
    }))
    return (
        <>
            <StyleHeader >
                <SearchForm />
            </StyleHeader>
            
          
        </>
    );
}