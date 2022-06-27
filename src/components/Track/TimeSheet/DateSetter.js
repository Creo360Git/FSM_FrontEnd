import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import moment from "moment";
import * as React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { fDateShort } from "../../Controls/formatUtils";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Box, TextField } from "@mui/material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import CustomButtonDropDown from "./CustomButtonDropDown";



const useStyles  = makeStyles((theme)=>({
    container:{
        
        display:'inline-block',
        [theme.breakpoints.up('sm')]:{
            display:'flex',
            justifyContent: 'space-between'
        }
    }
}));

const selectionType = [
    {id:0, value:true, label: 'Day'},
    {id:1, value:false, label: 'Week'}
]

const DateSetter = ({date, setDate, isDay, setIsDay}) => {

    const classes = useStyles();

    const handlechange = (increment)=>{
        setDate(moment(date).clone().add(increment,'d'))
    }

    const [title,setTitle] = React.useState(isDay?'Day':'Week');

    const handleDayType  = (props)=>{
        if(props.label){
            setIsDay(props.value);
            setTitle(props.label);
        }
    }

    
    const [anchorEl, setAnchorEl] = React.useState(null)

    const handleDatePicker = (e)=>{
        setAnchorEl(e.currentTarget)
    }
    

    return ( 
        <Box className={classes.container} >
            <ButtonGroup sx={{m:2,ml:0}}>
                <Button variant="outlined" onClick={()=>{handlechange(-1)}} sx={{height:'35px'}}>
                    <ArrowBackIosIcon/>
                </Button>
                {/* <Button variant="outlined" onClick={(e)=>{setIsDay(true)}}>Day</Button>
                <Button variant="outlined" onClick={(e)=>{setIsDay(false)}}>Week</Button> */}
                <CustomButtonDropDown
                    lists = {selectionType} 
                    handleFunction = {handleDayType}
                    title = {title}
                    width = "60px"
                    IsContained={false}
                />

                <Button variant="outlined" onClick={()=>{handlechange(1)}} sx={{height:'35px'}}>
                    <ArrowForwardIosIcon/>
                </Button>
            </ButtonGroup>

            { isDay == true  ?
                <ButtonGroup sx={{m:2,mr:0,height:'35px'}}>
                    <Button variant="contained" onClick={handleDatePicker}>
                        { 
                             moment().isSame(date, 'day') ? "Today" : fDateShort(date) 
                        } 
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleDatePicker}
                        endIcon={<CalendarTodayIcon />}
                    />
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DatePicker
                            inputFormat="yyyy-MM-DD"
                            open={Boolean(anchorEl)}
                            anchorEl = {anchorEl}
                            onChange={ (value)=>{
                                console.log(value)
                                setDate(value)
                                setAnchorEl(null)
                                }
                            }
                            transformOrigin={{ 
                                horizontal: 'right', 
                                vertical: 'top' 
                            }}
                            anchorOrigin={{ 
                                horizontal: 'right', 
                                vertical: 'bottom' 
                            }}
                            
                            renderInput={(params) => 
                                <TextField 
                                    size="small" 
                                    sx={{display:'none'}}
                                    {...params} 
                                
                                />
                            }
                            />
                        </LocalizationProvider>
                           
                </ButtonGroup>
                :
                null
            }
        </Box>
        
     );
}
 
export default DateSetter;