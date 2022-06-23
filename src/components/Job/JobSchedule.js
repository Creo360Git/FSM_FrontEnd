import React, {useState, useEffect} from 'react'
import { 
    Grid,
    Card,
    CardContent,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack
} from '@mui/material'
import { useTheme } from '@emotion/react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { fDateShort } from '../Controls/formatUtils';


const JobSchedule = ({errors, register, defaultValues, watch, setValue}) => {
    const theme = useTheme()
    const [values, setValues] = useState({
        startTime: new Date(),
        endTime: new Date(),
    })
    const startDate=watch('startDate')
    const startTime=watch('startTime')
    const endDate=watch('endDate')
    const endTime=watch('endTime')
    const scheduleLater=watch('scheduleLater')
    return(
        <Card sx={{p:3}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Typography gutterBottom variant="h5" component="div" sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                    Schedule
                </Typography>
                <Grid container  alignItems='flex-start'>
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Date
                        </Typography>
                        <DesktopDatePicker
                            inputFormat="yyyy-MM-DD"
                            value={startDate}
                            name='startDate'
                            onChange={e=>setValue('startDate',fDateShort(e))}
                            disabled={scheduleLater}
                            renderInput={(params) => 
                                <TextField 
                                    size="small" 
                                    fullWidth 
                                    helperText={errors.startDate?.message}
                                    {...params} 
                                    error={!!errors.startDate}
                                />
                            }
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            End Date
                        </Typography>
                        <DesktopDatePicker
                            inputFormat="yyyy-MM-DD"
                            disabled={scheduleLater}
                            value={endDate}
                            name='endDate'
                            onChange={e=>setValue('endDate',fDateShort(e))}
                            renderInput={(params) => 
                                <TextField 
                                    size="small" 
                                    fullWidth 
                                    helperText={errors.endDate?.message}
                                    {...params} 
                                    error={!!errors.endDate}
                                />
                            }
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Time
                        </Typography>
                        <TimePicker
                            value={values.startTime}
                            disabled={scheduleLater}
                            name='startTime'
                            onChange={
                                (e)=>{
                                    setValues(
                                        ({...values})=>{
                                            values['startTime']=(e)
                                            return values
                                        }
                                    )
                                }
                            }
                            renderInput={(params) => 
                                <TextField 
                                    size="small" 
                                    fullWidth 
                                    helperText={errors.startTime?.message}
                                    {...params} 
                                    error={!!errors.startTime}
                                />
                            }
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            End Time
                        </Typography>
                        <TimePicker
                            value={values.endTime}
                            disabled={scheduleLater}
                            name='endTime'
                            onChange={
                                (e)=>{
                                    setValues(
                                        ({...values})=>{
                                            values['endTime']=(e)
                                            return values
                                        }
                                    )
                                }
                            }
                            renderInput={(params) => 
                                <TextField 
                                    size="small" 
                                    fullWidth 
                                    helperText={errors.endTime?.message}
                                    {...params} 
                                    error={!!errors.endTime}
                                />
                            }
                        />
                    </Grid>
                    <Grid item md={12} >
                        <FormControlLabel
                            sx={{height: '25px', mt: 2}}
                            control={
                                <Checkbox 
                                    {...register("scheduleLater")}
                                    checked={scheduleLater}
                                    sx={{color:theme.palette.secondary.dark}}
                                />
                            }
                            label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Schedule later</Typography>}
                        />
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Card>
    )
}
export default JobSchedule