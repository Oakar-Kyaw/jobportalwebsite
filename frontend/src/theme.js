import { createTheme } from "@mui/material";
import { blueGrey, lightBlue } from "@mui/material/colors";

export const theme= createTheme({
    palette:{
        primary:{
            main:blueGrey[900]
        },
        secondary:{
            main:lightBlue[900],
            midNightBlue:"#18186C",
        }
    }

})