import React, { useState, useRef } from "react";
import { 
    Typography, 
    Container, 
    Grid, 
    Stack, 
    TextField ,
    FormControlLabel,
    Checkbox,
    FormGroup,
    ButtonGroup,
    Button,
    useMediaQuery,
    Box,
    Card
} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import SelectClientDialog from "../../components/Common/SelectClientDialog";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DesktopDatePicker, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { fDateShort } from "../../components/Controls/formatUtils";


const NewRequest = () => {
    const theme = useTheme()
    const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));

    const wrapperRef = useRef(null);
    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
    const [fileList, setFileList] = useState([]);

    const onFileDrop = (e) => {
        const target = e.target;
        if (!target.files) return;
        
        const arrMultiple = []
        const newFiles = Object.values(target.files).map((file) => file);
        newFiles.map((data, id) => {
            arrMultiple.push({file: data, previewFile: URL.createObjectURL(data)})
        })
        if (newFiles) {
            const updatedList = [...fileList, ...newFiles];
            if (updatedList.length > 10) {
                return alert(`Files must not be more than ${10}`);
            }
            setFileList(arrMultiple);
        }
        
    }

    const [show, setShow]= useState(false)
    const [client, setClient] = useState()
    const handleOpen = () => setShow(true)
    const defaultValues = {
        scheduleLater: false
    }

    const validationSchema = yup.object().shape({

    })

    const { register, formState: { errors }, handleSubmit, getValues, setValue, reset, control, watch } = useForm({
        defaultValues,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (values) => {
        reset()
        console.log(values)
    }
    const watchValues = watch()
    return (
        <DashboardLayout heading="new Request">
            <SelectClientDialog show={show} setShow={setShow} theme={theme} setClient={setClient} />
            <Container>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Grid container spacing={2} alignItems="center" justify="center" p={2}>
                            {
                                !!client ? 
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant='h3' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            {client?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid md={3} sm={5} xs={6} item>
                                        <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Property adress
                                        </Typography>
                                        <Grid container item >
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>135/B  Garden State Ave , Mississauga,Ontario,L4T 0A5, </Typography></Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid xs='auto' item>
                                        <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Contact details
                                        </Typography>
                                        <Grid container item >
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>0777898734</Typography></Grid>
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>snd89@gmail.com</Typography></Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                </>
                                :
                                <Grid xs={12} item >
                                    <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                        Client Name
                                        <Fab size="small" color="primary" aria-label="add" sx={{ml: 2}} onClick={handleOpen}>
                                            <AddIcon />
                                        </Fab>
                                    </Typography>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Request Title
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label= 'Request Title'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Service Details
                                </Typography>
                                <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>
                                    Please provide as much details as you can 
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label= 'Type here...'
                                    fullWidth
                                    rows={4}
                                    multiline={true}
                                    variant="outlined"
                                    size="small"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Schedule an appointment
                                </Typography>
                                <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>
                                    If available, which day works best for you ?
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
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
                            <Grid item xs={12}>
                                <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>
                                    What are your preferred arrival times ? (optional)
                                </Typography>
                                <FormGroup sx={{ml: 2}} row={false}>
                                    <FormControlLabel
                                        sx={{height: '25px'}}
                                        control={
                                            <Checkbox 
                                                {...register("IsPrimaryName")}
                                                defaultChecked={defaultValues.IsPrimaryName}
                                                sx={{color:theme.palette.secondary.dark}}
                                            />
                                        }
                                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Anytime</Typography>}
                                    />
                                    <FormControlLabel
                                        sx={{height: '25px'}}
                                        control={
                                            <Checkbox 
                                                {...register("IsPrimaryName")}
                                                defaultChecked={defaultValues.IsPrimaryName}
                                                sx={{color:theme.palette.secondary.dark}}
                                            />
                                        }
                                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Morning</Typography>}
                                    />
                                    <FormControlLabel
                                        sx={{height: '25px'}}
                                        control={
                                            <Checkbox 
                                                {...register("IsPrimaryName")}
                                                defaultChecked={defaultValues.IsPrimaryName}
                                                sx={{color:theme.palette.secondary.dark}}
                                            />
                                        }
                                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Afternon</Typography>}
                                    />
                                    <FormControlLabel
                                        sx={{height: '25px'}}
                                        control={
                                            <Checkbox 
                                                {...register("IsPrimaryName")}
                                                defaultChecked={defaultValues.IsPrimaryName}
                                                sx={{color:theme.palette.secondary.dark}}
                                            />
                                        }
                                        label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Evening</Typography>}
                                    />
                                </FormGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Assessment
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    fullWidth
                                    label='Instruction'
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="small"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid xs={12} item>
                                <FormControlLabel
                                    sx={{ml: 1}}
                                    control={
                                        <Checkbox 
                                            {...register("scheduleLater")}
                                            defaultChecked={defaultValues.scheduleLater}
                                            sx={{color:theme.palette.secondary.dark}}
                                        />
                                    }
                                    label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Schedule later</Typography>}
                                />
                            </Grid>
                            { !watchValues.scheduleLater && 
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <Grid container item xs={12}>
                                    <Grid item md={2} sm={6} xs={12}>
                                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Start Date
                                        </Typography>
                                        <DesktopDatePicker
                                            inputFormat="yyyy-MM-DD"
                                            value={watchValues.startDate}
                                            name='startDate'
                                            onChange={e=>setValue('startDate',fDateShort(e))}
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
                                    <Grid item md={2} sm={6} xs={12}>
                                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            End Date
                                        </Typography>
                                        <DesktopDatePicker
                                            inputFormat="yyyy-MM-DD"
                                            value={watchValues.endDate}
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
                                    <Grid item md={1} />
                                    <Grid item md={2} sm={6} xs={12}>
                                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Start Time
                                        </Typography>
                                        <TimePicker
                                            value={watchValues.startTime}
                                            name='startTime'
                                            onChange={e=>setValue('startTime',(e))}
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
                                    <Grid item md={2} sm={6} xs={12}>
                                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            End Time
                                        </Typography>
                                        <TimePicker
                                            value={watchValues.endTime}
                                            name='endTime'
                                            onChange={e=>setValue('endTime',(e))}
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
                                </Grid>
                            </LocalizationProvider>
                            }
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Notes & Attachments
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    fullWidth
                                    label='Note details'
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="small"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Box
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    sx={{
                                        position: 'relative',
                                        width: '100%',
                                        height: '6rem',
                                        border: '2px dashed #4267b2',
                                        borderRadius: '20px',
                                        backgroundColor: '#e9ecff'
                                    }}
                                    ref={wrapperRef}
                                    onDragEnter={onDragEnter}
                                    onDragLeave={onDragLeave}
                                    onDrop={onDragLeave}
                                >
                                    <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center' }}>
                                        <Typography sx={{fontWeight: theme.typography.fontWeightBold }}>
                                            {'Browse files to upload'}
                                        </Typography>
                                    
                                        {/* <Typography variant='body1' component='span'>
                                            <strong>Supported Files</strong>
                                        </Typography>
                                        <Typography variant='body2' component='span'>
                                            JPG, JPEG, PNG
                                        </Typography> */}
                                    </Stack>
                                    
                                    <input
                                        type='file'
                                        name={'files'}
                                        // onBlur={onBlur}
                                        // ref={ref}
                                        onChange={onFileDrop}
                                        multiple = {true}
                                        accept='image/jpg, image/png, image/jpeg'
                                        style={{
                                        
                                                opacity: 0,
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                cursor: 'pointer',
                                        }}
                                    /> 
                                </Box>
                            </Grid>
                            {
                                isDownSm ? 
                                <Grid xs={12} item>
                                    <Stack direction={{md:'row', xs:'column'}} alignItems={{md:'flex-end', xs:'stretch'}} justifyContent={{md:"space-between", xs:'flex-start'}} spacing={2}>
                                        <Button variant='contained' key="three" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save And ...</Button>
                                        <Button variant='outlined' key="two" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save Request</Button>
                                        <Button variant='outlined' key="one" sx={{textTransform: 'uppercase', height: {xs:'42.5px'},width:'100%', overflow: 'hidden', display: "block"}}>Cancel</Button>
                                    </Stack>
                                </Grid>
                                :
                                <Grid xs={12} item>
                                    <Stack direction='row' alignItems='flex-end' justifyContent="space-between" spacing={2}>
                                        <ButtonGroup size="large" aria-label="large button group">
                                            <Button key="one" sx={{textTransform: 'uppercase', height: {xs:'42.5px'},width:'100%', overflow: 'hidden', display: "block"}}>Cancel</Button>
                                        </ButtonGroup>
                                        <ButtonGroup size="large" aria-label="large button group"> 
                                            <Button variant='outlined' key="two" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save Request</Button>
                                            <Button variant='contained' key="three" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save And ...</Button>
                                        </ButtonGroup>
                                    </Stack>
                                </Grid>
                            }
                        </Grid>
                    </form>
                </Card>
            </Container>
        </DashboardLayout>
    );
};

export default NewRequest;
