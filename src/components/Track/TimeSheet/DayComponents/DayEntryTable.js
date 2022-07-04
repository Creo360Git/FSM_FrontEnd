import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import * as React from "react";
import moment from 'moment';
import { formatTime } from "../../../../services/datetime";
import { fTimeShort } from "../../../Controls/formatUtils";
import { makeStyles } from "@mui/styles";
import TimeSheetDayForm from "./TimeSheetDayForm";

const useStyles = makeStyles((theme)=>({
    button:{
        display:'inline-block',
        
        [theme.breakpoints.down('sm')]:{
            display:'flex',
            width:'100%'
        }
    }
}));

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
    }
}

const DayEntryTable = ({data}) => {

    const classes = useStyles();

    const [isEdit,setIsEdit] = React.useState(false);

    React.useEffect(()=>{
        console.log(data.type)
    },[])

    return ( 
        <Box sx={{mt:3}}>
            {
                !isEdit ?
                    <Grid container sx={{m:2}}>
                    
                        <Grid xs={12} md={3} item sx={styles.item}>
                            <Typography variant="h3">
                            {data.type}
                            </Typography>
                        </Grid>
                        <Grid xs={12} md={6} item sx={styles.item} >
                            <Grid container >
                                <Grid xs={6} item >
                                    { fTimeShort(data.startTime)} 
                                    &nbsp;
                                    to
                                    &nbsp;
                                    {fTimeShort(data.endTime)}
                                    
                                </Grid>
                                <Grid xs={6} item >
                                    <Typography variant="h3">
                                        {fTimeShort(data.duration)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                        <Grid xs={12} md={3} item>
                            <Grid container >
                                <Grid xs={6} md={12} item>
                                    <Button variant="outlined"  sx={styles.button} onClick={(e)=>{setIsEdit(true)}}>
                                        Edit
                                    </Button>
                                </Grid>
                                <Grid xs={6} md={12} item>
                                    <Button variant="outlined" color="error" sx={styles.button} onClick={(e)=>{setIsEdit(false)}}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </Grid>
                : 
                <TimeSheetDayForm 
                    setVisible={setIsEdit}
                    initialValues = {data}
                />
            }
           
            {/* <Divider/> */}
        </Box>
     );
}
 
export default DayEntryTable;