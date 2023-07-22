import { Box, InputLabel, MenuItem, Select } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useSelector } from 'react-redux';
export const FormController=({handleChangeCate,cat})=>{
    const {jobtypes, success} = useSelector(state=>state.loadJobTypeReducers);
    
      return (
        <Box sx={{width:200,mt:4}}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={cat}
                label="Category"
                onChange={handleChangeCate}
                
                >
               <MenuItem  value=''>All</MenuItem>
               {
                jobtypes && jobtypes.map((jobtype,i)=>
                <MenuItem  key={i} value={jobtype._id}>{jobtype.jobcategories}</MenuItem>
                )
               }
               
               
             </Select>
          </FormControl>
         </Box>
      );
}