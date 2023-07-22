import { Box, CircularProgress } from "@mui/material";


export const LoadingComponent =()=>{
    return (
        <>
         <Box sx={{minWidth:350 ,minHeight:350 , display:"flex", alignItems:"center" ,justifyContent:"center"}}>
            <CircularProgress style={{color:"blue"}} ></CircularProgress>
         </Box>
        </>
    );
}