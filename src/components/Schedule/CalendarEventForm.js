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
    Grid
} from '@mui/material';
import moment from 'moment';
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';



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

    console.log(_event)
    return _event;
};

export default function CalendarEventForm({ event={}, range, onCancel, open, setOpen, events, setEvents, color }) {
    const isCreating = Object.keys(event).length === 0;
    const theme = useTheme()

    const EventSchema = Yup.object().shape({
        title: Yup.string().max(255).required('Title is required'),
        description: Yup.string().max(5000),
    });
    console.log(event)
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
                start: data.allDay ? data.start : `${data.start}T${data.startTime}`,
                end: data.allDay ? data.end : `${data.end}T${data.endTime}`,
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

    const values = watch();
    const isDateError = moment(new Date(`${values.start}T${values.startTime}`)).isAfter(new Date(`${values.end}T${values.endTime}`));

return (
    <Dialog
        onClose={onCancel}
        open={open}
        scroll="body"
        maxWidth="xs"
    >
        <DialogTitle variant='h3' onClose={onCancel} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
            New Event
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Stack spacing={3} sx={{ p: 3 }}>
                <Controller
                    name={'title'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField {...field} fullWidth error={!!error} helperText={error?.message} label="Title" />
                    )}
                />
                <Controller
                    name={'description'}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <TextField {...field} fullWidth error={!!error} helperText={error?.message} label="Description" multiline rows={4} />
                    )}
                />
                <Grid container spacing={0.5}>
                    <Grid item xs={12} sm={6}>
                        <label>Start date</label>
                        <TextField
                            name='start'
                            {...register('start')}
                            value={values?.start}
                            type='date'
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <label>End date</label>
                        <TextField
                            name='end'
                            {...register('end')}
                            value={values?.end}
                            type='date'
                            fullWidth
                            error={!!isDateError}
                            helperText={isDateError && 'End date must be later than start date'}
                        />
                    </Grid>
                </Grid>
                <FormControlLabel
                    control={
                        <Controller name={'allDay'} control={control} render={({ field }) => <Switch {...field} checked={field.value} />} />
                    }
                    label="All day"
                />
                {
                    values.allDay ? null :
                    (
                        <Grid container spacing={0.5}>
                            <Grid item xs={12} sm={6}>
                                <label>Start time</label>
                                <TextField
                                    name='startTime'
                                    {...register('startTime')}
                                    value={values?.startTime}
                                    type='time'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <label>End time</label>
                                <TextField
                                    name='endTime'
                                    {...register('endTime')}
                                    value={values?.endTime}
                                    type='time'
                                    fullWidth
                                    error={!!isDateError}
                                    helperText={isDateError && 'End date must be later than start date'}
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
                    Cancel
                </Button>

                <Button type="submit" variant="contained">
                    {isSubmitting ? 'Loading...' : 'Add'}
                </Button>
            </DialogActions>
        </form>
    </Dialog>
    );
}
