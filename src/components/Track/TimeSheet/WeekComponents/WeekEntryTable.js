import { Box, Button, Divider, Grid,  MenuItem, TextField, Typography } from "@mui/material";
import moment, { weekdays } from "moment";
import { useEffect } from "react";
import { fMonthShort } from "../../../Controls/formatUtils";
import * as React from 'react'
import { makeStyles } from "@mui/styles";
import WeekEntryForm from "./WeekEntryForm";

const styles = {
    button :{
        width:'120px',
        height:'25px',
        fontSize:'10px',
        borderRadius: '0px',
        m:1,
        mt:0
    },
    item:{
        margin:'auto',
        verticalAlign:'middle',
        fontSize: '0.8rem',
        mb:2
    },
    label:{
        fontWeight: 'bolder',
        padding:'0px 5px 2px 5px',
        
    },
}

const useStyles = makeStyles((theme)=>({
    header:{
        display:'flex',
        mb:1,
        color: theme.palette.primary.contrastText,
        backgroundColor:theme.palette.primary.dark,
        padding:'16px',
        [theme.breakpoints.down('lg')]:{
            display:'none'
        }
    },
    content:{
        marginTop:'8px',
        display:'flex',
        backgroundColor:'rgba(0, 0, 0, 0.1)',
        padding:'8px 0px',
        [theme.breakpoints.down('lg')]:{
            display:'block',
        }
    },
    contentHeading:{
        width:'30%',
        textAlign:'left',
        [theme.breakpoints.down('lg')]:{
            width:'100%'
        }
    },
    contentBox:{
        width:'10%',
        display:'flex',
        [theme.breakpoints.down('lg')]:{
            width:'100%',
            padding:'8px'
        }
    }
}))

const WeekEntryTable = ({data=[],date}) => {

    const classes = useStyles();

    const [weekDays,setWeekDays] = React.useState([])
    

    const weekFunction = (date)=>{
        let Days = []
        let startday = new Date(date) 
        let numDays = new Date(date).getDay()||7;
        startday.setHours(-24 * (numDays - 1))
       
        for(let i=0; i<7;i++){
            Days.push(moment(startday).add(i,'days'));
        }

        setWeekDays(Days)
        console.log(Days)
        
    }

    useEffect(()=>{
        weekFunction(date)
    },[date])



    return ( 
        <Box>
            <Box sx={{mt:2}}>
                
                <Box className={classes.header} sx={{p:2}}>
                    
                    <Box sx={{width:'30%'}}>
                       
                    </Box>
                    {
                        weekdays.length > 0 ?
                            weekDays.map((date)=>{
                                return (
                                    <Box  sx={{width:'10%',textAlign:'center'}} key={date}>
                                        {moment(date).format('DD MMM')}
                                    </Box>
                                )
                            })
                        :
                        null
                    }

                </Box>
                { data.map(({type,id,week})=>{
                    return(
                        <WeekEntryForm
                            type={type}
                            id= {id}
                            key = {id}
                            week={week}
                            weekDays = {weekDays}
                        />
                        // <Box>
                        // <Box className={classes.content} sx={{}}>
                        //     <Box className={classes.contentHeading} >
                        //         <Typography variant="h3" sx={{flexDirection:'column',display:'flex',height:'100%',justifyContent:'center', textAlign:'center'}}>
                        //           {type}
                        //         </Typography>
                                
                        //     </Box>
                                
                        //         {/* {weekDays.map((weekDay)=>{
                        //             let value = {date:'', duration:''}
                        //             week.map((props) => {
                        //                 if(moment(props.date).format('YYYY-MM-DD') == moment(weekDay).format('YYYY-MM-DD')){
                        //                     value = props;
                                            
                        //                 }else{
                        //                     value.date = moment(weekDay).format('YYYY-MM-DD');
                        //                 }
                        //             })
                                        
                        //                 return (
                        //                     <Box className={classes.contentBox} >
                        //                         <Typography sx={{display:{md:'block',lg:'none',width:'20%',margin:'auto'}}}>
                        //                         {
                        //                             moment(value.date).format('DD MMM')  
                        //                         }
                        //                         </Typography>
                        //                         <Typography>
                        //                         {
                                                    
                        //                                 <TextField
                        //                                     value = { value.duration ? moment(value.duration).format('HH:mm'): ''}
                        //                                     sx={{margin:'auto',
                        //                                     borderColor:'#050d33',
                        //                                     padding:'0px 5px'
                        //                                 }}
                        //                                     size='small'
                        //                                 />
                                                    
                                                    
                        //                         }
                        //                         </Typography>
                                               
                        //                     </Box>
                        //                 )
                        //             })}  */}
                            
                        // </Box>
                        //     <Divider/>
                        // </Box>
                    )
                })}
                
                  
                 
            </Box>

            <Box>
                <Grid container sx={{mt:3,p:1}}>
                    <Grid xs={12} md={8} item sx={{}}>
                        <Typography  sx={styles.label}>Type</Typography>
                    
                        <TextField 
                            select
                            fullWidth
                            
                            size='small'
                        >
                            <MenuItem value='General' key={0}>
                                General
                            </MenuItem>
                        </TextField>

                    </Grid>
                    <Grid xs={12} md={4} item>
                        <Box sx={{justifyContent:'space-evenly', display:'flex',width:'100%',mt:3}}>
                            <Button variant="outlined"  sx={styles.button} >
                                Add
                            </Button>
                            
                            <Button variant="outlined" color="error" sx={styles.button} >
                                Cancel
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>

     );
}
 
export default WeekEntryTable;