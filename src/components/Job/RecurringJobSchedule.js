import React, {useState, useEffect} from 'react'
import { 
    Grid,
    Card,
    MenuItem,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Divider
} from '@mui/material'
import { useTheme } from '@emotion/react'
import { fDateShort } from '../Controls/formatUtils'

const options=[
    {value: '0', label: 'Up to your preference'},
    {value: '1', label: 'Weekly on Mondays'},
    {value: '2', label: 'Every two weeks on Monday'},
    {value: '3', label: '15th of every month'},
    {value: '4', label: 'Customize schdule...'}
]

const DurationOptions = [
    {value: '0', label: 'Week (s)'},
    {value: '1', label: 'Day (s)'},
    {value: '2', label: 'Month (s)'},
    {value: '3', label: 'Year (s)'},
    {value: '4', label: 'Customize schdule...'},
]

const RecurringJobSchedule = ({errors, register, defaultValues, scheduleLaterCheckbox, startDate=fDateShort(new Date()) }) => {
    const theme = useTheme()
    const [sDate, setSDate] = useState('')

    const handleOptionsChange = (val) => {
        var d = new Date()
        switch(val) {
            case 1:
                d.setDate(d.getDate() + (((1 + 7 - d.getDay()) % 7) || 7));
                setSDate(d)
                break
            case 2:

        }
    }
    
    return(
        <Card sx={{p:3}}>
            <Typography gutterBottom variant="h5" component="div" sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                Schedule
            </Typography>
            <Grid container  alignItems='flex-start'>
            {
                !scheduleLaterCheckbox &&
                <React.Fragment>
                    <Grid item md={12}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Date
                        </Typography>
                        <TextField
                            type='date'
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register("startDate")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Time
                        </Typography>
                        <TextField
                            type='time'
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            End Time
                        </Typography>
                        <TextField
                            type='time'
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Grid>
                </React.Fragment>
            }
                <Grid item md={12} mb={1}>
                    <FormControlLabel
                        sx={{height: '25px', mt: 2}}
                        control={
                            <Checkbox 
                                {...register("scheduleLater")}
                                defaultChecked={scheduleLaterCheckbox}
                                sx={{color:theme.palette.secondary.dark}}
                            />
                        }
                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Schedule later</Typography>}
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
                        {...register("select")}
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
                            variant="outlined"
                            size="small"
                            {...register("duration")}
                            value={'6'}
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
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                            defaultValue={0}
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
                <Grid container item xs={12}>
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>First visit</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            2022-06-15
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>Last visit</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            2022-06-15
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>Total days</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            1
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}
export default RecurringJobSchedule