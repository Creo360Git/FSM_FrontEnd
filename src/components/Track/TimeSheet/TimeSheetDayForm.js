import { Box, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize, FormHelperText, ButtonGroup, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme)=>({
    label:{
        fontWeight: 'bolder!important',
        padding:'0px 5px!important',
        
    },
    input :{
        width:'100%!important',
        margin:'0px',
        marginBottom:'10px',
        padding:'0px 5px'
    }
}))

const TimeSheetDayForm = () => {

    const theme = useTheme();
    const classes = useStyles();

    return ( 

        <Box sx={{pt:3}}>
            <form>
            <Grid container>
                <Grid item md={4} xs={12}>
                    <Typography  className={classes.label}>Type</Typography>
                    <FormControlLabel
                        labelPlacement="top"
                        className= {classes.input}
                        control={
                            <TextField
                                fullWidth        
                                select
                                type="text"
                                variant="outlined"
                                size="small"  
                        
                        >
                                                
                            <MenuItem >
                                General
                            </MenuItem>
                                                    
                        </TextField>}
                        
                    />

                    <Typography  className={classes.label} > Description </Typography>
                    <FormControlLabel
                        labelPlacement="top"
                        className= {classes.input}
                        control={
                        <TextField
                            type=''
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{resize:'both'}}
                            multiline
                            minRows={4}

                        />}
                    />
{/*                     
                    <TextareaAutosize
                        
                        minRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Description"
                        style={{ width:'100%', mt:1,backgroundColor:'#E9ECFF',border:'1px solid #b3b5c4', borderRadius:'4px',padding:'0px 5px'}}
                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>End</Typography>}
                    /> */}
                    
                </Grid>
                <Grid item md={8}>
                    <Grid container>
                    <Grid item xs={12} md={6}  sx={{display:'flex'}}>
                        <Grid item xs={6}> 
                        <Typography className={classes.label}>Start</Typography>
                            <FormControlLabel
                                
                                labelPlacement="top"
                                className= {classes.input}
                                control={
                                <TextField
                                    type='time'
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />}
                                
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography className={classes.label} >End</Typography>
                            <FormControlLabel
                                labelPlacement="top"
                                className= {classes.input}
                                control={
                                <TextField
                                    type='time'
                                    fullWidth
                                    variant="outlined"
                                    size="small"
                                />}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={6} >
                        <Typography className={classes.label} >Total Duration</Typography>
                        <FormControlLabel
                            labelPlacement="top"
                            className= {classes.input}
                            control={
                            <TextField
                                type=''
                                fullWidth
                                variant="outlined"
                                size="small"
                                
                            />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonGroup sx={{right:0,position:'absolute', mt:2,mr:3,}}>
                            <Button variant='contained' sx={{width:'120px',height:'30px',m:1,borderRadius:'0px'}}>
                                Start 
                            </Button>
                            <Button varient='outlined' sx={{width:'120px',height:'30px',m:1,borderRadius:'0px',background: 'rgba(63, 81, 181, 0.08)!important'}}>
                                Cancel
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    </Grid>
                </Grid>
            </Grid>
            </form>
        </Box>
    );
}
 
export default TimeSheetDayForm;