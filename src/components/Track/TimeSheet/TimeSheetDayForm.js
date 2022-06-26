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
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

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

const TimeSheetDayForm = () => {

    const theme = useTheme();
    const classes = useStyles();

    const {t} =  useTranslation()

    const schema = yup.object().shape({
        type: yup.string().required("Select the type"),
        startTime: yup.string().nullable(true),
        endTime: yup.string().nullable(true),
        duration: yup.string().required("Time Duration required"),
        description: yup.string()
    })

    const {
        register, formState: { errors }, handleSubmit,  getValues, setValue, reset, control, watch
    } = useForm({
        mode:'onBlur',
        reValidateMode:'onBlur',
        resolver: yupResolver(schema)
    })

    const [values,setValues] = React.useState({
        type:'',
        startTime:'',
        endTime:'',
        duration:'',
        description:''
    });

    //const [type, setType] = React.useState();

    const [users,setUsers] = React.useState();
    

    const handleChange = (e)=>{
        console.log(e)
        setValues((value)=>({
            ...value,
            [e.target.name]:e.target.value
        }))
    }

    const onSubmit = async ()=>{
        console.log(values)
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
            <form >
                <Grid container>
                    <Grid item md={4} xs={12}>
                        <Typography  className={classes.label}>Type</Typography>


                        <TextField
                            fullWidth        
                            select
                            className= {classes.input}
                            variant="outlined"
                            size="small"  
                            name = 'type'
                            value={values?.type}
                            //onChange = {handleChange}
                            helperText = {errors.type?.message}
                            {...register('type')}
                            error = {!!errors.type}
                        >

                            <MenuItem  value= "" onChange={handleChange} >
                                General
                            </MenuItem>                 
                            <MenuItem  value='general' onChange={handleChange} >
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
                            name = "description"
                            minRows={4}
                            className = {classes.input}
                            value = {values.description}
                            onChange = {handleChange}
                            {...register('description')}
                            error ={!!errors.description}
                            helperText = {errors.description?.message}
                        />
                        
    {/*                     
                        <TextareaAutosize
                            
                            minRows={4}
                            aria-label="maximum height"
                            placeholder="Maximum 4 rows"
                            defaultValue="Description"
                            style={{ width:'100%', mt:1,backgroundColor:'#E9ECFF',border:'1px solid #b3b5c4', borderRadius:'4px',padding:'0px 5px'}}
                            label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, ml: -14}}>End</Typography>}
                        /> */}
                        
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
                                        
                                        onChange={(time)=> setValues((values)=>({
                                            ...values,
                                            startTime:time
                                        }))}
                                        value = {values.startTime}
                                        //onChange={e=>setValue('startTime',(e))}
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
                                        name = "endTime"
                                        onChange={(time)=> setValues((values)=>({
                                            ...values,
                                            endTime:time
                                        }))}
                                        value = {values?.endTime}
                                        renderInput={(params)=>
                                        <TextField
                                            fullWidth
                                            size="small" 
                                            className={classes.input}
                                        
                                            helperText={errors.startTime?.message}
                                            {...params} 
                                            error={!!errors.startTime}
                                            
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
                                inputFormat="mm:ss"
                                mask="__:__"
                                value={values?.duration}
                                onChange={(time)=> setValues((values)=>({
                                    ...values,
                                    duration:time
                                }))}
                                renderInput={(params) => 
                                    <TextField 
                                        size="small" 
                                        fullWidth 
                                        className={classes.input}
                                        helperText={errors.startTime?.message}
                                        {...params} 
                                        {...register("startTime")}
                                        error={!!errors.startTime}
                                    />
                                }
                            />

                        </Grid>
                        </LocalizationProvider>
                        <Grid item xs={12}>
                            <ButtonGroup sx={{right:0,position:'absolute', m:3, mt:2 }}>
                                <Button variant='contained' onClick={onSubmit}  sx={{width:'120px',height:'30px',m:1,borderRadius:'0px'}}>
                                    Start 
                                </Button>
                                <Button varient='outlined' sx={{width:'120px',height:'30px',m:1,borderRadius:'0px',background: 'rgba(63, 81, 181, 0.08)!important'}}>
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