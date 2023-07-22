import { Box } from "@mui/material"

export const Layout = (Component)=>({...props})=>{
    return (
        <>
        <Box>
            <Component {...props}/>
        </Box>
        
        </>
    )
}