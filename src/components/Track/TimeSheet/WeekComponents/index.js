import moment from "moment";
import { Typography, Box, Grid, Divider, Button } from "@mui/material";
import WeekEntryTable from "./WeekEntryTable";
import AddIcon from '@mui/icons-material/Add';
import makeStyles from "@mui/styles/makeStyles";
import * as React from 'react';

const useStyles = makeStyles((theme)=>({
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
    
}));

const entries2 = [
    {id:'1', type:'General', week:
    [ 
        {date:'Mon Jul 04 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
        {date:'Mon Jul 05 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 28 2022 13:32:02 GMT+0530'} ,
        {date:'Mon Jul 06 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 29 2022 13:32:02 GMT+0530'} ,
        {date:'Mon Jul 07 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 30 2022 13:32:02 GMT+0530'} ,
        
        {date:'Mon Jul 08 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 01 2022 13:32:02 GMT+0530'} ,
        {date:'Mon Jul 09 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 02 2022 13:32:02 GMT+0530'} ,
        {date:'Mon Jul 10 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 03 2022 13:32:02 GMT+0530'} ,

    ], 
    },
    {id:'2', type:'Job', week:
        [ 
            {date:'Mon Jul 04 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 27 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 05 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 28 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 06 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 29 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 07 2022 13:32:02 GMT+0530' ,duration:'Mon Jun 30 2022 13:32:02 GMT+0530'} ,
            
            {date:'Mon Jul 08 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 01 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 09 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 02 2022 13:32:02 GMT+0530'} ,
            {date:'Mon Jul 10 2022 13:32:02 GMT+0530' ,duration:'Mon Jul 03 2022 13:32:02 GMT+0530'} ,
    
        ], 
    },
]

const WeekComponent = ({date}) => {

    const classes = useStyles();
    const [weekEntries,setWeekEntries] = React.useState(entries2);
    
    const handleAddWeek = (e)=>{

    } 


    return (
        <Box sx={{p:3}}>  {/* Week Section */}
                        <Box>
                            <Grid sx={{display:'flex', justifyContent:'space-between'}}>
                                <Grid sx={{margin:'auto 0px'}}>
                                    <Typography className={classes.dividerHeading}>
                                        My hours for the Week
                                    </Typography>
                                </Grid>
                                <Grid sx={{paddingBottom: '5px!important'}}>
                                    <Button variant="outlined" className={classes.addTimeButton} onClick={handleAddWeek}>
                                        <AddIcon sx={{fontSize:20}}/>
                                        Add Time
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                        <Divider className={classes.divider}/>

                        <WeekEntryTable data={weekEntries}  date={date}/>
                           
                        
                    </Box>
      );
}
 
export default WeekComponent;