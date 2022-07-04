import * as React from 'react';
import { Box, ButtonGroup,  Grid,  Stack, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DateSetter from '../../components/Track/TimeSheet/DateSetter';
import CustomButtonDropDown from '../../components/Track/CustomButtonDropDown';
import DayComponent from '../../components/Track/TimeSheet/DayComponents';
import WeekComponent from '../../components/Track/TimeSheet/WeekComponents';

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
    {id:'1', label:'User_1', value:'user_1',name:'User_1',gmail:'user1@gmail.com'},
    {id:'2', label:'User_2', value:'user_2',name:'User_2',gmail:'user2@gmail.com'},
    {id:'3', label:'User_3', value:'user_3',name:'User_3',gmail:'user3@gmail.com'}
]

const TimeSheet = () => {


    const classes = useStyles();

    const [date,setDate] = React.useState(Date.now());
    const [isDay,setIsDay] = React.useState(false)

    const [users,setUsers] = React.useState(employees);
    const [user, setUser] = React.useState(users[0]);


    const handleUserChange = (props)=>{
        if(props.id){
            setUser(props)
        }
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
                                {user.name}
                            </Typography>
                            <Typography sx={{fontWeight:700,color: 'rgba(0, 0, 0, 0.6)'}}>
                                {user.gmail}
                            </Typography>
                        </Stack>
                    </Grid>
                    
                    <Grid   className={classes.userButton}>
                        <ButtonGroup>
                            <CustomButtonDropDown
                                lists = {users} 
                                handleFunction = {handleUserChange}
                                title = "Switch users"
                                width = "150px"
                                IsContained={true}
                            />
                        </ButtonGroup>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{m:3}}>
                <DateSetter
                    date = {date}
                    setDate = {setDate}
                    isDay = {isDay}
                    setIsDay = {setIsDay}
                    // callBack = {weekFunction}
                />
            </Box>
            
            { isDay ?

                <DayComponent
                    date = {date}
               />
                :                
                <WeekComponent
                    date = {date}
                />
                   
            }
        </Box>
     );
}
 
export default TimeSheet;