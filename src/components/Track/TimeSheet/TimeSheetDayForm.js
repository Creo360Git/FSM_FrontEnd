import { Box, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize, FormHelperText } from "@mui/material";
import { useTheme } from "@emotion/react";


const TimeSheetDayForm = () => {

    const theme = useTheme();

    return ( 

        <Box sx={{pt:3}}>
            <Grid container>
                <Grid sm={4} xs={12}>
                    <FormControlLabel
                        labelPlacement="top"
                        sx={{width:'100%!important',marginLeft:'0px',marginBottom:'10px'}}
                        control={
                            <TextField
                             fullWidth        
                            
                            select
                            type="text"
                            variant="outlined"
                            size="small"
                            
                                        
                        >
                                                
                            <MenuItem >
                                1
                            </MenuItem>
                                                    
                        </TextField>}
                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Start</Typography>}
                    />
                    
                    <TextareaAutosize
                        
                        minRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Description"
                        style={{ width:'100%', mt:1,backgroundColor:'#E9ECFF', borderColor:'black',borderRadius:'4px',outline:'none'}}
                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>End</Typography>}
                    />
                </Grid>

            <Grid xs={12} sm={8}>
                <FormControlLabel
                    labelPlacement="top"
                    control={
                    <TextField
                        type='time'
                        fullWidth
                        variant="outlined"
                        size="small"
                    />}
                    label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>Start</Typography>}
                />
                <FormControlLabel
                    labelPlacement="top"
                    control={
                    <TextField
                        type='time'
                        fullWidth
                        variant="outlined"
                        size="small"
                    />}
                    label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>End</Typography>}
                />
                 <FormControlLabel
                    labelPlacement="top"
                    control={
                    <TextField
                        type=''
                        fullWidth
                        variant="outlined"
                        size="small"
                    />}
                    label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>Start</Typography>}
                />
            </Grid>
            </Grid>
        </Box>
    );
}
 
export default TimeSheetDayForm;