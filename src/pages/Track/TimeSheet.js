import { Box, Button, ButtonGroup, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import TimeSheetDayForm from "../../components/Track/TimeSheet/TimeSheetDayForm";

const useStyles = makeStyles((theme)=>({
    header:{
        width:'100%',
        border: '2px solid rgba(0, 0, 0, 0.25)',
        height: '86px',
        background: 'rgba(69, 124, 206, 0.24)',
        display: 'flex' ,
        
        [theme.breakpoints.down('md')]: {
            height:'125px'
        }
    },
    headerContainer:{
        justifyContent:'space-between',
        display:'flex',
        width:'100%',
        
        [theme.breakpoints.down('md')]: {
            display:'block',
            height:'125px'
        }
    },
    headerIcon:{
        verticalAlign: 'middle',
        margin:'auto 18px',
        display:'flex',
        [theme.breakpoints.down('md')]: {
            marginTop:'20px'
        }
    },
    userButton:{
        margin:'auto 10px',
        [theme.breakpoints.down('md')]:{
            float:'right'
        }
    },
    userSelect:{
        height:'35px',
        width:'150px',
    },
    userDropdown:{
        margin:'auto',
        height:'35px',
    },
    dividerHeading:{
        fontWeight: '800!important',
        fontSize: '15px!important',
        color: '#2B43CF',
        
    },
    addTimeButton:{
        width:'120px',
        height:'30px',
        fontSize:'10px!important',
        borderRadius: '2px!important',
        background: 'rgba(63, 81, 181, 0.08)!important'
    },
    divider:{
        backgroundColor: '#007AFF!important'
    }
}))

const TimeSheet = () => {


    const classes = useStyles();
    const theme = useTheme();

    useEffect(()=>{
        console.log("TimeSheet")
    },[])



    return ( 
        <Box>
            <Box className={classes.header}>
                {/* <Box sx={{display:{xs:'block',sm:'none',height:'100px',}}}>

                </Box> */}
                <Box className={classes.headerContainer}>

                    <Grid  className={classes.headerIcon}>
                        <AccountCircleIcon sx={{ fontSize: 55 }} />
                        <Stack >
                            <Typography variant="h2" >
                                Sample User
                            </Typography>
                            <Typography sx={{fontWeight:700,color: 'rgba(0, 0, 0, 0.6)'}}>
                                sample@gmail.com
                            </Typography>
                        </Stack>
                    </Grid>
                    
                    <Grid   className={classes.userButton}>
                        <ButtonGroup >
                            <Button variant="contained" className={classes.userSelect} >
                                Switch User
                            </Button>
                            <Button variant="contained" className={classes.userDropdown} >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{marginTop:'50px',p:3}}>
                <Box>
                    <Grid sx={{display:'flex', justifyContent:'space-between'}}>
                        <Grid sx={{margin:'auto 0px'}}>
                            <Typography className={classes.dividerHeading}>
                                My hours for June 5th, 2022
                            </Typography>
                        </Grid>
                        <Grid sx={{paddingBottom: '5px!important'}}>
                            <Button variant="outlined" className={classes.addTimeButton}>
                                <AddIcon sx={{fontSize:20}}/>
                                Add Time
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
                <Divider className={classes.divider}/>

                <TimeSheetDayForm/>
               
                
            </Box>
        </Box>
     );
}
 
export default TimeSheet;