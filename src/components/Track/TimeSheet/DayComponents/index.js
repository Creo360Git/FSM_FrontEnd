import moment from "moment";
import { Typography, Box, Grid, Divider, Button } from "@mui/material";
import TimeSheetDayForm from "./TimeSheetDayForm";
import DayEntryTable from "./DayEntryTable";
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

const entries1 = [
    {id:'1', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530',duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'},
    {id:'2', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530',duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'},
    {id:'3', type:'General', startTime:'Mon Jun 27 2022 13:32:02 GMT+0530',name:'Mon Jun 27 2022 13:32:02 GMT+0530', duration:'Mon Jun 27 2022 13:32:02 GMT+0530', description:'Description'}
]

const DayComponent = ({date}) => {

    const [visible,setVisible] = React.useState(true);
    const classes = useStyles();

    const [dayEntries, setDayEntries] = React.useState(entries1);

    const handleAddTime = (e)=>{
        e.preventDefault();
        setVisible(true);
    }

    return ( 
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
     );
}
 
export default DayComponent;