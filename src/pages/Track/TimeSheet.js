import * as React from 'react';
import { Box, Button, ButtonGroup, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize, Menu } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import TimeSheetDayForm from "../../components/Track/TimeSheet/TimeSheetDayForm";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useForm } from "react-hook-form";

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
    },
    menuItem:{
        minWidth:'200px',
        '&:hover':{
            color:theme.palette.primary.contrastText,
            backgroundColor: `${theme.palette.primary.dark}!important`
        }
    }

}))

const employees = [
        {id:'1', label:'User_1', value:'user_1'},
        {id:'2', label:'User_2', value:'user_2'},
        {id:'3', label:'User_3', value:'user_3'}
    ]

const TimeSheet = () => {


    const classes = useStyles();
    const theme = useTheme();

    

    const [users,setUsers] = React.useState(employees);
    const [user, setUser] = React.useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleUser = (e)=>{
        console.log(e.currentTarget)
        setAnchorEl(e.currentTarget);
    }

    const handleClose = (e)=>{
        
        const value = e.currentTarget.attributes?.value?.value
        users.map((props)=>{
            if (props.id == value){
                setUser(props)
            }
        })
        
        setAnchorEl(null); 
             
    }

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
                        <ButtonGroup>
                            <Button variant="contained" className={classes.userSelect} onClick={handleUser}>
                                { !user? "Switch User": user.label }
                            </Button>
                            <Button variant="contained" className={classes.userDropdown} onClick={handleUser}>
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            transformOrigin={{ 
                                horizontal: 'right', 
                                vertical: 'top' 
                            }}
                            anchorOrigin={{ 
                                horizontal: 'right', 
                                vertical: 'bottom' 
                            }}
                            
                            
                            
                        >
                            {
                                users.map((prop)=>{
                                    return(
                                        <MenuItem 
                                            value={prop.id}  
                                            key = {prop.id}
                                            className={classes.menuItem}
                                            onClick = {handleClose}
                                        > 
                                            {prop.label}
                                        </MenuItem>
                                    )
                                })
                            }
                
                        </Menu>
                        
                    </Grid>
                </Box>
            </Box>
            <Box sx={{m:3}}>
                <ButtonGroup>
                    <Button variant="outlined">
                        <ArrowBackIosIcon/>
                    </Button>
                    <Button variant="outlined">Day</Button>
                    <Button variant="outlined">Week</Button>
                    <Button variant="outlined">
                        <ArrowForwardIosIcon/>
                    </Button>
                </ButtonGroup>
            </Box>
            <Box sx={{p:3}}>
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