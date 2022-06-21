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


const JobSchedule = ({errors, register, defaultValues, scheduleLaterCheckbox}) => {
    const theme = useTheme()
    return(
        <Card sx={{p:3}}>
            <Typography gutterBottom variant="h5" component="div" sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                Schedule
            </Typography>
            <Grid container  alignItems='flex-start'>
            {
                !scheduleLaterCheckbox &&
                <React.Fragment>
                    <Grid item md={6}  xs={12} sm={6} mb={1}>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                            Start Date
                        </Typography>
                        <TextField
                            type='date'
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
                            End Date
                        </Typography>
                        <TextField
                            type='date'
                            fullWidth
                            variant="outlined"
                            size="small"
                            {...register("title")}
                            error={!!errors.title}
                            helperText={errors.title?.message}
                        />
                    </Grid>
                    <Grid item md={6}  xs={12} sm={6}>
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
                    <Grid item md={6}  xs={12} sm={6}>
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
                <Grid item md={12} >
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
            </Grid>
        </Card>
    )
}
export default JobSchedule