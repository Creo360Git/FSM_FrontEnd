import * as React from 'react'
import { Box, FormControlLabel,FormControl,InputLabel, Grid, MenuItem, Select,TextField, Stack, Typography, Divider, TextareaAutosize, FormHelperText, ButtonGroup, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopTimePicker, LocalizationProvider, MobileTimePicker, TimePicker } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import useMediaQuery from '@mui/material/useMediaQuery';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup'
import { get, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fTimeAdd, fTimeDifference, fTimeDifferenceDate, fTimeShort, fTimeValidate } from '../../../Controls/formatUtils';
import moment from 'moment';

const useStyles = makeStyles((theme)=>({
    label:{
        fontWeight: 'bolder!important',
        padding:'0px 5px',
        
    },
    input :{
        margin:'0!important',
        marginBottom:'10px!important',
        padding:'0px 5px!important',

    },
    picker:{
        pointer: 'fine'
    }
}))

const emptyValues = {
    type:'',
    startTime:moment(),
    endTime:'',
    duration:'',
    description:''
}


const TimeSheetDayForm = ({setVisible,date, initialValues=emptyValues}) => {

    const theme = useTheme();
    const classes = useStyles();

    const {t} =  useTranslation()

    React.useEffect(()=>{
        console.log(initialValues)
    },[])

    const schema = yup.object().shape({
        type: yup.string().required("Select the type"),
        startTime: yup.string().test('start time test','Invalid Time',function (value){
            return fTimeValidate(value)
        }),
        endTime: yup.string().test('end time test','Invalid Time',function (value) {
            return fTimeValidate(value)
        }),
        duration: yup.string().required("Time Duration required").test('start time test','Invalid Time',function (value) {
            return fTimeValidate(value)
        }).test('start time test','Validate ',function (value){
            const {startTime, endTime} = this.parent;
            if (startTime && endTime){
                const diff = fTimeDifference(startTime,endTime);
                return diff == fTimeShort(value)               
            }
            return true

        }),
        description: yup.string()
    })

    const [values,setValues] = React.useState(initialValues);

    const {
        register, formState: { errors }, handleSubmit,  getValues, setValue, reset, control, watch
    } = useForm({
        defaultValues: values,
        mode:'onBlur',
        reValidateMode:'onBlur',
        resolver: yupResolver(schema)
    })

    const data = watch();


    const handleCancel = ()=>{
        reset({
            type:'',
            startTime: '',
            endTime:'',
            duration:'',
            description:''
        });
        setVisible(false);
    }

    //const [type, setType] = React.useState();

    const [users,setUsers] = React.useState();
    

    const onSubmit = async ()=>{
       
        setValues({
            type:'',
            startTime:'',
            endTime:'',
            duration:'',
            description:''
        })
    }

    return ( 

        <Box sx={{mt:6}}>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                autoComplete = "off"
            >
                <Grid container>
                    <Grid item md={4} xs={12}>
                        <Typography  className={classes.label}>Type</Typography>


                        <TextField
                            fullWidth        
                            select
                            className= {classes.input}
                            variant="outlined"
                            size="small"  
                            //name = 'type'
                            //value={data.type}
                            value={getValues('type')}
                            //onChange = {handleChange}
                            helperText = {errors.type?.message}
                            {...register('type')}
                            error = {!!errors.type}
                            
                        >

                                      
                            <MenuItem  value='General' key="1">
                                General
                            </MenuItem>
                                                            
                        </TextField>
                            

                        <Typography  className={classes.label} > Description </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{resize:'both'}}
                            multiline
                            minRows={4}
                            className = {classes.input}
                            {...register('description')}
                            error ={!!errors.description}
                            helperText = {errors.description?.message}
                        />
                        
                        
                    </Grid>
                    <Grid item md={8}>
                        <Grid container>
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                        <Grid item xs={12} md={6}  sx={{display:'flex'}}>
                            
                                <Grid item xs={6}> 
                                    <Typography className={classes.label}>Start</Typography>
                                    <TimePicker
                                        //value={watchValues.startTime}
                                        name='startTime'
                                        ampm = {false}
                                        openTo="hours"
                                        views={["hours", "minutes"]}
                                        inputFormat="HH:mm"
                                        mask="__:__"
                                        onChange={(value) => {
                                            
                                            setValue('startTime', value)
                                            if (fTimeValidate(getValues('startTime'))){
                                                if (fTimeValidate(getValues('endTime'))){
                                                    setValue('duration',fTimeDifferenceDate(getValues('startTime'),getValues('endTime')))
                                                }
                                            }
                                        }}
                                        value = {getValues('startTime')}
                                        renderInput={(params) => 
                                            <TextField 
                                                size="small" 
                                                fullWidth 
                                                className={classes.input}
                                                helperText={errors.startTime?.message}
                                                {...params} 
                                                error={!!errors.startTime}
                                        
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography className={classes.label} >End</Typography>
                                    
                                    <TimePicker
                                        ampm = {false}
                                        openTo="hours"
                                        views={["hours", "minutes"]}
                                        inputFormat="HH:mm"
                                        mask="__:__"
                                        value={getValues('endTime')}
                                        //value = {data.endTime}
                                        onChange={(value)=>{
                                            setValue('endTime', value)
                                            if(fTimeValidate(getValues('startTime')) && fTimeValidate(getValues('endTime')) ){
                                                setValue('duration',fTimeDifferenceDate(getValues('startTime'),getValues('endTime')))
                                            }
                                        }}
                                        renderInput={(params)=>
                                            <TextField
                                                fullWidth
                                                size="small" 
                                                className={classes.input}

                                                helperText={errors.endTime?.message}
                                                {...params} 
                                                error={!!errors.endTime}
                                                
                                            />}
                                    />
                                </Grid>
                        
                        </Grid>
                        <Grid item xs={12} md={6} >
                            <Typography className={classes.label} >Total Duration</Typography>
                            {/* <TextField
                                className= {classes.input}
                                name = "duration"
                                fullWidth
                                variant="outlined"
                                size="small"
                                
                            /> */}
                            <TimePicker 
                                ampm = {false}

                                openTo="hours"
                                views={["hours", "minutes"]}
                                inputFormat="HH:mm"
                                mask="__:__"
                                value={getValues('duration')}
                                onChange={(value)=> {
                                    
                                    setValue('duration',value)
                                    if(fTimeValidate(getValues('startTime')) && fTimeValidate(getValues('duration')) ){
                                        setValue('endTime',fTimeAdd(getValues('startTime'),getValues('duration')))
                                    }
                                }}
                                renderInput={(params) => 
                                    <TextField 
                                        size="small" 
                                        fullWidth 
                                        className={classes.input}
                                        helperText={errors.duration?.message}
                                        {...params} 
                                        error={!!errors.duration}
                                    />
                                }
                            />

                        </Grid>
                        </LocalizationProvider>
                        <Grid item xs={12}>
                            <ButtonGroup sx={{right:0,position:'absolute', m:3, mt:2 }}>
                                <Button variant='contained' type="submit"  sx={{width:'120px',height:'30px',m:1,borderRadius:'0px'}}>
                                    Save 
                                </Button>
                                <Button varient='outlined' onClick={handleCancel} sx={{width:'120px',height:'30px',m:1,borderRadius:'0px',background: 'rgba(63, 81, 181, 0.08)!important'}}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
 
export default TimeSheetDayForm;