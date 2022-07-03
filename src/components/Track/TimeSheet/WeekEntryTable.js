import { Box, Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import moment, { weekdays } from "moment";
import { useEffect } from "react";
import { fMonthShort } from "../../Controls/formatUtils";
import * as React from 'react'

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

const WeekEntryTable = ({data=[],date}) => {

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
            <Box>
                
                <Box sx={{display:'flex'}}>
                    
                    <Box sx={{width:'30%'}}>
                       
                    </Box>
                    {
                        weekdays.length > 0 ?
                            weekDays.map((date)=>{
                                return (
                                    <Box  sx={{width:'10%',textAlign:'center'}}>
                                        {moment(date).format('DD MMM')}
                                    </Box>
                                )
                            })
                        :
                        null
                    }

                </Box>

                        <Box sx={{display:'flex'}}>
                            <Box sx={{width:'30%'}}>
                                {data.type}
                            </Box>
                            {weekDays.map((weekDay)=>{
                                let value = null;
                                data.week.map((props) => {
                                    console.log(props.date);
                                    console.log(weekDay)
                                    if(moment(props.date).format('YYYY-MM-DD') == moment(weekDay).format('YYYY-MM-DD')){
                                        value = props;
                                        
                                    }
                                })
                                console.log(value)
                                return (
                                    <Box sx={{width:'10%'}}>
                                        <Typography sx={{display:{sm:'block',md:'none'}}}>
                                        {
                                            value?.date ?
                                                moment(value.date).format('DD MMM')
                                            :
                                                null
                                        }
                                        </Typography>
                                        <Typography>
                                        {
                                            value?.duration ?
                                                <TextField
                                                    value = { moment(value.duration).format('HH:mm')}
                                                    sx={{margin:'0!important',
                                                    marginBottom:'10px!important',
                                                    padding:'0px 5px',height:'35px'}}
                                                    size='small'
                                                />
                                               
                                            :
                                                null
                                        }
                                        </Typography>
                                    </Box>
                                )
                            })} 
                        </Box>
                  
                 
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
                    <Grid sx={12} md={4} item>
                        <Box sx={{justifyContent:'space-evenly', display:'flex',width:'100%',mt:3}}>
                            <Button variant="outlined"  sx={styles.button} >
                                Edit
                            </Button>
                            
                            <Button variant="outlined" color="error" sx={styles.button} >
                                Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>

     );
}
 
export default WeekEntryTable;