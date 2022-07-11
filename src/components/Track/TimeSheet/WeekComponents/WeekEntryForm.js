import { Box, Typography,TextField,Divider } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import moment from "moment";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useFieldArray } from "react-hook-form";

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
    
    
    
    // var temp = {}
    // weekDays.map((weekDay)=>{
    //     temp[moment(weekDay).format('YYYY-MM-DD')] = ''
    //     week.map((props) => {
    //         if(moment(props.date).format('YYYY-MM-DD') == moment(weekDay).format('YYYY-MM-DD')){
    //             temp[moment(weekDay).format('YYYY-MM-DD')]=props.duration 
    //             console.log(moment(props.duration).format('HH:mm'))
    //         }
    //     })        
    // })

    const schema = yup.object().shape({

    })

    // useEffect(()=>{
    //     initFunction()
    // },[]);

    

    // const [weeks,setWeeks] = React.useState([])

    // useEffect(()=>{

    // },[weeks])

    // const initFunction = ()=>{
    //     var weeks = []
    //     if (week.length <7){
    //         var temp = []
    //         var dates = weekDays
    //         var index = 0
    //         weekDays.map((weekDay)=>{
    //             if(moment(dates[index]).format('YYYY-MM-DD') == moment(weekDay).format('YYYY-MM-DD')){
    //                 temp.push(dates[index])
    //                 dates.pop(0)
    //             }else{
    //                 temp.push({
    //                     date:moment(weekDay).format('YYYY-MM-DD'),
    //                     duration: ''
    //                 })
    //             }
    //         })
    //         console.log(temp)
    //         setWeeks(temp)
    //     }else{
    //         console.log(week)
    //         setWeeks(week)
    //     }
    // }
   
    
    const {
        register, formState: { errors }, handleSubmit,  getValues, setValue, reset, control, watch
    } = useForm({
        defaultValues: {
            type:type,
            week:week
        },
        mode:'onBlur',
        reValidateMode:'onBlur',
        resolver: yupResolver(schema)
    })

    const {
        fields, append, prepend, swap, move, insert, remove
    } = useFieldArray({
        control,
        name:"week"
    })


    return ( 
        <Box>
            <Box className={classes.content} sx={{}}>
                <Box className={classes.contentHeading} >
                    <Typography variant="h3" sx={{flexDirection:'column',display:'flex',height:'100%',justifyContent:'center', textAlign:'center'}}>
                    {type}
                    </Typography>
                    
                </Box>
                    
                {
                    
                    fields.map((item,index)=>{
                        console.log(item)
                        return(
                            <Box className={classes.contentBox} key={index}>
                                <Typography sx={{display:{md:'block',lg:'none',width:'20%',margin:'auto'}}}>
                                {
                                    moment(item.date).format('DD MMM')  
                                }
                                </Typography>
                            
                                <TextField
                                    
                                    value = { moment(item.duration).format('HH:mm')}
                                    size='small'
                                    className = {classes.input}
                                    onChange={(e)=>{
                                                
                                    }}
                                    readOnly = {!isEdit}
                                />

                            </Box>
                        )
                    })
                }
            </Box>
            <Divider/>
        </Box>
     );
}
 
export default WeekEntryForm;