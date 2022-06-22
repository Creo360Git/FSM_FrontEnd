import React, {useState, useEffect} from 'react'
import { 
    Grid,
    Card,
    MenuItem,
    Typography,
    TextField,
    FormControlLabel,
    Backdrop,
    Divider,
    CircularProgress
} from '@mui/material'
import { useTheme } from '@emotion/react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { fDateShort } from '../Controls/formatUtils'

const options=[
    {value: '0', label: 'Up to your preference'},
    {value: '1', label: 'Weekly on Mondays'},
    {value: '2', label: 'Every two weeks on Monday'},
    {value: '3', label: '15th of every month'},
    {value: '4', label: 'Customize schdule...'}
]

const DurationOptions = [
    {value: 'w', label: 'Week (s)'},
    {value: 'd', label: 'Day (s)'},
    {value: 'M', label: 'Month (s)'},
    {value: 'y', label: 'Year (s)'},
    {value: '4', label: 'Customize schdule...'},
]

const RecurringJobSchedule = ({errors, register, defaultValues, scheduleLaterCheckbox, setValue,  watch }) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        startDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        visitRepeat: '1',
        duration: '6',
        durationTitle: 'w'
    })
    const [visits, setVisits] = useState({
        firstVisit: '',
        lastVisit: '',
        totalDays: ''
    })

    const handleChange = (e) => {
        setOpen(true)
        setValues(({...values})=>{
            values[e.target.name]= e.target.value
            return values
        })
    }

    useEffect(()=>{
        let start = moment(values.startDate)
        var futureMonth = moment(start).add(parseInt(values.duration), values.durationTitle);
        var futureMonthEnd = moment(futureMonth).endOf('month');
        
        if(start.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
            futureMonth = futureMonth.add(1, 'd');
        }

        let end = futureMonth
        const arr=[]
        let weekdayCounter=0
        
        switch(values.visitRepeat) {
            case '1':
                while (start < end) {
                    if (start.format('ddd') === 'Mon'){
                        arr.push(fDateShort(start))
                        weekdayCounter++; 
                    }
                    start = moment(start, 'YYYY-MM-DD').add(1, 'd')
                }
                setVisits({
                    firstVisit: arr[0],
                    lastVisit: arr.at(-1),
                    totalDays: weekdayCounter
                })
                setOpen(false)
                break
            case '2': 
                while (start < end) {
                    if (start.format('ddd') === 'Mon'){
                        if(weekdayCounter===0 || (weekdayCounter)%2===0){
                            arr.push(fDateShort(start))
                        }
                        weekdayCounter++
                    }
                    start = moment(start, 'YYYY-MM-DD').add(1, 'd')
                }
                setVisits({
                    firstVisit: arr[0],
                    lastVisit: arr.at(-1),
                    totalDays: arr.length
                })
                setOpen(false)
                break
            case '3':
                while (start < end) {
                    if(start.format('DD')==='15'){
                        arr.push(fDateShort(start))
                        weekdayCounter++
                    }
                    start = moment(start, 'YYYY-MM-DD').add(1, 'd')
                }
                setVisits({
                    firstVisit: arr[0],
                    lastVisit: arr.at(-1),
                    totalDays: weekdayCounter
                })
                setOpen(false)
                break
            default: 
                alert('alert')
                break
        }

    },[values])

    return(
        <Card sx={{p:3}}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Typography gutterBottom variant="h5" component="div" sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                    Schedule
                </Typography>
                <Grid container  alignItems='flex-start'>
                    <Grid item md={12}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Date
                        </Typography>
                        <DesktopDatePicker
                            inputFormat="yyyy-MM-DD"
                            value={values.startDate}
                            name='startDate'
                            onChange={
                                (e)=>{
                                    setValues(
                                        ({...values})=>{
                                            values['startDate']=fDateShort(e)
                                            return values
                                        }
                                    )
                                }
                            }
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
                            Start Time
                        </Typography>
                        <TimePicker
                            value={values.startTime}
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
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            End Time
                        </Typography>
                        <TimePicker
                            value={values.endTime}
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
                    <Grid xs={12} item mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Visit repeats for jobs
                        </Typography>
                        <TextField
                            select
                            fullWidth
                            variant="outlined"
                            size="small"
                            name='visitRepeat'
                            value={values.visitRepeat}
                            onChange={handleChange}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            defaultValue={1}
                        >
                            {
                                options.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))
                            }
                        </TextField>
                    </Grid>
                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                        Duration
                    </Typography>
                    <Grid container item xs={12} mb={1}>
                        <Grid item md={2}  xs={12} sm={4}>
                            <TextField
                                type='text'
                                fullWidth
                                name='duration'
                                value={values.duration}
                                variant="outlined"
                                size="small"
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        </Grid>
                        <Grid item md={10}  xs={12} sm={8}>
                            <TextField
                                select
                                fullWidth
                                variant="outlined"
                                size="small"
                                name='durationTitle'
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title?.message}
                                value={values.durationTitle}
                                defaultValue={'w'}
                            >
                                {
                                    DurationOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))
                                }
                            </TextField>
                        </Grid>
                    </Grid>
                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                        Visits
                    </Typography>
                    
                    <Grid container item xs={12} sx={{position: 'relative'}} >
                        <Backdrop
                            sx={{ color: 'black', zIndex: 100, position: 'absolute' }}
                            open={open}
                        >
                            <CircularProgress size={'1.5rem'} />
                        </Backdrop>
                        <Grid md={3} xs={12} item>
                            <Typography variant='h6'>First visit</Typography>
                            <Typography variant='h6' sx={{color:'#818EA1'}}>
                                {fDateShort(visits.firstVisit)}
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                        <Grid md={3} xs={12} item>
                            <Typography variant='h6'>Last visit</Typography>
                            <Typography variant='h6' sx={{color:'#818EA1'}}>
                                {fDateShort(visits.lastVisit)}
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                        <Grid md={3} xs={12} item>
                            <Typography variant='h6'>Total days</Typography>
                            <Typography variant='h6' sx={{color:'#818EA1'}}>
                                {(visits.totalDays)}
                            </Typography>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </LocalizationProvider>
        </Card>
    )
}
export default RecurringJobSchedule