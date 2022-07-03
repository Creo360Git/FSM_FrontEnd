import * as React from 'react';
import { Box, Button, ButtonGroup, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize, Menu, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from "@emotion/react";
import TimeSheetDayForm from "../../components/Track/TimeSheet/TimeSheetDayForm";
import { useForm } from "react-hook-form";
import DateSetter from '../../components/Track/TimeSheet/DateSetter';
import moment from 'moment';
import CustomButtonDropDown from '../../components/Track/CustomButtonDropDown';
import DayEntryTable from '../../components/Track/TimeSheet/DayEntryTable';
import WeekEntryTable from '../../components/Track/TimeSheet/WeekEntryTable';

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

const entries1 = [
    {id:'1', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530',duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'},
    {id:'2', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530',duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'},
    {id:'3', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530', duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'}
]

const entries2 = [
    {id:'1', type:'General', week:
        [ 
            {date:'Mon Jun 27 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jun 28 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jun 29 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jun 30 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            
            {date:'Mon Jul 01 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 02 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jun 03 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
    
        ], 
    },
]

const TimeSheet = () => {


    const classes = useStyles();

    const [date,setDate] = React.useState(Date.now());
    const [isDay,setIsDay] = React.useState(true)

    const [visible,setVisible] = React.useState(true)

    const [users,setUsers] = React.useState(employees);
    const [user, setUser] = React.useState(users[0]);

    const [dayEntries, setDayEntries] = React.useState(entries1)
    const [weekEntries,setWeekEntries] = React.useState(entries2)
    

    useEffect(()=>{
        console.log(isDay)
    },[isDay])
    

    const handleAddTime = (e)=>{
        e.preventDefault();
        setVisible(true);
    }

    

    const handleUserChange = (props)=>{
        if(props.id){
            setUser(props)
        }
    }

    useEffect(()=>{
        console.log("TimeSheet")
    },[])

    const [weekDays,setWeekDays] = React.useState([])
    
    
    // const weekFunction = (date)=>{
    //     let Days = []
    //     let startday = new Date(date) 
    //     let numDays = new Date(date).getDay()||7;
    //     startday.setHours(-24 * (numDays - 1))
       
    //     for(let i=0; i<7;i++){
    //         Days.push(moment(startday).add(i,'days'));
    //     }

    //     setWeekDays(Days)
    //     console.log(weekDays)
    // }



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
                   
                    <Box sx={{p:3}}>      {/* Day Section */}
                         
                        <Box>
                            <Grid sx={{display:'flex', justifyContent:'space-between'}}>
                                <Grid sx={{margin:'auto 0px'}}>
                                    <Typography className={classes.dividerHeading}>
                                        My hours for {moment(date).format('DD MMM, yyyy')}
                                    </Typography>
                                </Grid>
                                <Grid sx={{paddingBottom: '5px!important'}}>
                                    <Button variant="outlined" className={classes.addTimeButton} onClick={handleAddTime}>
                                        <AddIcon sx={{fontSize:20}}/>
                                        Add Time
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider className={classes.divider}/>

                            {
                                dayEntries.map((props)=>{
                                    return <DayEntryTable data={props} key={props.id} />
                                })
                            }
                        
                            { visible ?
                                <TimeSheetDayForm
                                    setVisible={setVisible}
                                />
                                :
                                null
                            }
                        
                    
                        
                    </Box>
                :
                    <Box sx={{p:3}}>  {/* Week Section */}
                        <Box>
                            <Grid sx={{display:'flex', justifyContent:'space-between'}}>
                                <Grid sx={{margin:'auto 0px'}}>
                                    <Typography className={classes.dividerHeading}>
                                        My hours for the Week
                                    </Typography>
                                </Grid>
                                <Grid sx={{paddingBottom: '5px!important'}}>
                                    <Button variant="outlined" className={classes.addTimeButton} onClick={handleAddTime}>
                                        <AddIcon sx={{fontSize:20}}/>
                                        Add Time
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider className={classes.divider}/>

                            {
                                weekEntries.map((props)=>{
                                    return <WeekEntryTable data={props} key={props.id} date={date}/>
                                })
                            }
                        
                    </Box>
            }
        </Box>
     );
}
 
export default TimeSheet;