import React, {useState, useEffect} from 'react'
import { 
    Grid,
    Card,
    TextField,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio,
    MenuItem,
    Divider
} from '@mui/material'
import { useTheme } from '@emotion/react'


const Options=[
    {value: '0', label: 'Up to your preference'},
    {value: '1', label: 'Weekly on Mondays'},
    {value: '2', label: 'Every two weeks on Monday'},
    {value: '3', label: '15th of every month'},
    {value: '4', label: 'Customize schdule...'}
]


const Invoicing = ({errors, register, defaultValues, scheduleLaterCheckbox}) => {
    const theme = useTheme()
    return(
        <Card sx={{p:3}}>
            <Typography gutterBottom variant="h5" component="div" sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                Invoicing
            </Typography>
            <Grid container  alignItems='flex-start'>
                <Grid item md={12}  xs={12} sm={12} >
                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                        What method of invoicing do you prefer ?
                    </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                        <FormControlLabel 
                            value="visit"  
                            control={
                                <Radio 
                                    size="small" 
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        },
                                    }}
                                />
                            } 
                            label={<Typography variant='h6'>Per visit</Typography>}
                        />
                        <FormControlLabel 
                            value="fixed" 
                            control={
                                <Radio 
                                    size="small" 
                                    sx={{
                                        '& .MuiSvgIcon-root': {
                                            fontSize: 14,
                                        },
                                    }}
                                />
                            } 
                            label={<Typography variant='h6'>Fixed Price</Typography>}
                        />
                    </RadioGroup>
                </Grid>
                <Grid item md={12}  xs={12} sm={12} mb={1}>
                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                        When would you like to be invoiced?
                    </Typography>
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
                            Options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                </Grid>
                <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                    Invoices
                </Typography>
                <Grid container item xs={12}>
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>First</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            2022-06-15
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>Last</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            2022-06-15
                        </Typography>
                    </Grid>
                    <Divider orientation="vertical" sx={{height: '38px', mr: 1, ml: 1}} />
                    <Grid md={3} xs={12} item>
                        <Typography variant='h6'>Total</Typography>
                        <Typography variant='h6' sx={{color:'#818EA1'}}>
                            1
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    )
}
export default Invoicing