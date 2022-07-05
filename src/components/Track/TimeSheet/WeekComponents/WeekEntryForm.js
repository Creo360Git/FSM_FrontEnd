import { Box, Typography,TextField,Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import moment from "moment";
import React from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

const useStyles = makeStyles((theme)=>({
    content:{
        marginTop:'8px',
        display:'flex',
        paddingRight:'8px',
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
    },
    input:{
        margin:'auto',
        borderColor:'#050d33',
        padding:'0px 5px!important'
    }
}))

const WeekEntryForm = ({type,id,week=[],weekDays=[],isEdit=false}) => {

    const classes = useStyles();
    
    
    var temp = {}
    weekDays.map((weekDay)=>{
        temp[moment(weekDay).format('YYYY-MM-DD')] = ''
        week.map((props) => {
            if(moment(props.date).format('YYYY-MM-DD') == moment(weekDay).format('YYYY-MM-DD')){
                temp[moment(weekDay).format('YYYY-MM-DD')]=props.duration 
                console.log(moment(props.duration).format('HH:mm'))
            }
        })        
    })

    const schema = yup.object().shape({

    })
    
    const {
        register, formState: { errors }, handleSubmit,  getValues, setValue, reset, control, watch
    } = useForm({
        defaultValues: temp,
        mode:'onBlur',
        reValidateMode:'onBlur',
        resolver: yupResolver(schema)
    })

    return ( 
        <Box>
            <Box className={classes.content} sx={{}}>
                <Box className={classes.contentHeading} >
                    <Typography variant="h3" sx={{flexDirection:'column',display:'flex',height:'100%',justifyContent:'center', textAlign:'center'}}>
                    {type}
                    </Typography>
                    
                </Box>
                    {weekDays?.map((weekDay)=>{

                        var name = moment(weekDay).format('YYYY-MM-DD')
                         
                            return (
                                <Box className={classes.contentBox} key={name}>
                                    <Typography sx={{display:{md:'block',lg:'none',width:'20%',margin:'auto'}}}>
                                    {
                                        moment(weekDay).format('DD MMM')  
                                    }
                                    </Typography>
                                    
                                    <TextField
                                        name = {name}
                                        value = { moment(getValues(name)).format('HH:mm')}
                                        size='small'
                                        className = {classes.input}
                                        onChange={(e)=>{
                                                    
                                        }}
                                        readOnly = {!isEdit}
                                    />

                                </Box>
                            )
                        })} 
                
            </Box>
            <Divider/>
        </Box>
     );
}
 
export default WeekEntryForm;