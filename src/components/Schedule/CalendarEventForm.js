import React, {useState} from 'react'
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Box, 
    Stack, 
    Button, 
    Tooltip, 
    TextField, 
    IconButton, 
    DialogActions, 
    FormControlLabel,
    DialogTitle,
    Dialog,
    Switch,
    Grid,
    Typography
} from '@mui/material';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import { fDateShort } from '../Controls/formatUtils'
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';



const getInitialValues = (event, range, color) => {
    const _event = {
        title: event.title || '',
        description: event.description || '',
        textColor: event.textColor || color,
        backgroundColor: 'red',
        allDay: event.allDay || false,
        start:new Date(),
        end: range ? new Date('2014-08-18') : new Date(),
    };

    if (event || range) {
        return Object.assign({}, _event, event);
    }


    return _event;
};

export default function CalendarEventForm({ event={}, range, onCancel, open, setOpen, events, setEvents, color }) {
    const isCreating = Object.keys(event).length === 0;
    const theme = useTheme()
    const {t} = useTranslation()

    const [values, setValues] = useState({
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date()
    })

    const EventSchema = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(5000),
    });

    const methods = useForm({
        resolver: yupResolver(EventSchema),
        defaultValues: getInitialValues(event, range),
    });

    const {
        reset,
        register,
        watch,
        control,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data) => {
        try {
            const newEvent = {
                id: Math.random(),
                title: data.title,
                description: data.description,
                textColor: data.textColor,
                allDay: data.allDay,
                start: data.allDay ? values.startDate : `${values.startDate}T${values.startTime}`,
                end: data.allDay ? values.endDate : `${values.endDate}T${values.endTime}`,
            };
            if (event.id) {
                console.log(newEvent)
            } else {
                setEvents([...events, newEvent])
                console.log(newEvent)
            }
            onCancel();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {
        if (!event.id) return;
        try {
            onCancel();
            console.log('Deleted')
        } catch (error) {
            console.error(error);
        }
    };

    const allDay = watch('allDay');
    const isDateError = moment(new Date(`${values.startDate}T${values.startTime}`)).isAfter(new Date(`${values.endDate}T${values.endTime}`));

return (
    <Dialog
        onClose={onCancel}
        open={open}
        scroll="body"
        maxWidth="xs"
    >
        <DialogTitle variant='h3' onClose={onCancel} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
            {t("headings.newEvent")}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <Stack spacing={3} sx={{ p: 3 }}>
                    <Controller
                        name={'title'}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field} fullWidth error={!!error} helperText={error?.message} label={t("labels.title")} />
                        )}
                    />
                    <Controller
                        name={'description'}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                            <TextField {...field} fullWidth error={!!error} helperText={error?.message} label={t("labels.description")} multiline rows={4} />
                        )}
                    />
                    <Grid container spacing={0.5}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                {t("labels.startDate")}
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
                                        helperText={isDateError && 'End date must be later than start date'}
                                        {...params} 
                                        error={!!isDateError}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                {t("labels.endDate")}
                            </Typography>
                            <DesktopDatePicker
                                inputFormat="yyyy-MM-DD"
                                value={values.endDate}
                                name='endDate'
                                onChange={
                                    (e)=>{
                                        setValues(
                                            ({...values})=>{
                                                values['endDate']=fDateShort(e)
                                                return values
                                            }
                                        )
                                    }
                                }
                                renderInput={(params) => 
                                    <TextField 
                                        size="small" 
                                        fullWidth 
                                        helperText={isDateError && 'End date must be later than start date'}
                                        {...params} 
                                        error={!!isDateError}
                                    />
                                }
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={
                            <Controller name={'allDay'} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
                        }
                        label={t("labels.allDay")}
                    />
                    {
                        allDay ? null :
                        (
                            <Grid container spacing={0.5}>
                                <Grid item md={6}  xs={12} sm={6} mb={1}>
                                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                        {t("labels.startTime")}
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
                                                // helperText={errors.startTime?.message}
                                                {...params} 
                                                error={!!isDateError}
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item md={6}  xs={12} sm={6} mb={1}>
                                    <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                        {t("labels.endTime")}
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
                                                // helperText={errors.endTime?.message}
                                                {...params} 
                                                error={!!isDateError}
                                            />
                                        }
                                    />
                                </Grid>
                            </Grid>
                        )
                    }
                    
                    {/* <Controller
                        name="textColor"
                        control={control}
                        render={({ field }) => (
                            <ColorSinglePicker value={field.value} onChange={field.onChange} colors={COLOR_OPTIONS} />
                        )}
                    /> */}
                </Stack>

                <DialogActions>
                    {!isCreating && (
                    <Tooltip title="Delete Event">
                        <IconButton onClick={handleDelete}>
                            <DeleteIcon width={20} height={20} />
                        </IconButton>
                    </Tooltip>
                    )}
                    <Box sx={{ flexGrow: 1 }} />

                    <Button variant="outlined" color="inherit" onClick={onCancel}>
                        {t("buttons.cancel")}
                    </Button>

                    <Button type="submit" variant="contained">
                        {isSubmitting ? t("buttons.loading") : t("buttons.add")}
                    </Button>
                </DialogActions>
            </LocalizationProvider>
        </form>
    </Dialog>
    );
}
