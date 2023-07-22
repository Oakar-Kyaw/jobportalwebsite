
import { Box, Typography, useTheme } from "@mui/material";

export const Footer = () => {
    const {palette} = useTheme();
    return (
       <>
         <Box sx={{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            mt:4,
            height:100,
            backgroundColor:palette.primary.main
         }} >
             <Typography variant="body2"  sx={{mt:1, color:"whitesmoke"}}>
                       All Rights reserved @ 2023
            </Typography >

         </Box>
       </>
    );
}