import React, {useState, useEffect} from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid,
    TextField,
    Typography,
    Button,
    FormControlLabel,
    Checkbox,
    IconButton,
    MenuItem,
    Switch,
    Stack,
    FormGroup
} from '@mui/material'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';


const AddClient = ({open, setOpen, setClientValue}) => {
    const theme = useTheme()
    const [type, setType] = useState([
        {TypeId: 1, Module: 'phone', Type: 'main'},
        {TypeId: 2, Module: 'phone', Type: 'personel'},
        {TypeId: 3, Module: 'email', Type: 'personel'},
        {TypeId: 4, Module: 'email', Type: 'main'},
    ])
    const [emailType, setEmailType] = useState((type.filter((t)=>t.Module==='email')).map((val)=>({value: val.TypeId, label: val.Type})))
    const [phoneType, setPhoneType] = useState(type.filter((t)=>t.Module==='phone').map((val)=>({value: val.TypeId, label: val.Type})))

    const [client, setClient] = useState({})

    const defaultValues = {
        ClientId: '',
        FirstName: '',
        LastName: '',
        CompanyName: '',
        IsPrimaryName: false,
        IsBillingAddress: true,
        EmailList: [{Email: '', EmailType: emailType[0].value}],
        CreatedBy: '',
        IsActive: true,
        PhoneNumbersList: [{PhoneNumber: '', NumberType: phoneType[0].value}],
        Address: {
            AddressLine1: '',
            AddressLine2: '',
            CountryId: countries[0]?.value,
            ZipCode: '',
            State: '',
            City: ''
        },
        BillingAddress: {
            AddressLine1: '',
            AddressLine2: '',
            CountryId: countries[0]?.value,
            ZipCode: '',
            State: '',
            City: ''
        },
        Notification: {
            Appointment: false,
            Invoice: false,
            Quote: false,
            Job: false
        }
    }

    const phoneReg = "^[\\+]?([(]?\\+?[/0-9]{1,3}[)]?)?([-.,\\s]{0,1}(?:\\d[-.,\\s]{0,1}){10})$"

    const validationSchema = yup.object().shape({
        FirstName: yup.string().required('required'),
        LastName: yup.string().required('required'),
        CompanyName: yup.string(),
        IsPrimaryName: yup.boolean(),
        IsBillingAddress:  yup.boolean(),
        EmailList: yup.array()
            .of(
                yup.object().shape({
                    Email: yup.string().email('Not a valid number').required('required'),
                    EmailType: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required')
                })
            )
            .min(1, 'Atleast one'),
        CreatedBy: yup.string(),
        IsActive: yup.boolean(),
        PhoneNumbersList: yup.array()
            .of(
                yup.object().shape({
                    PhoneNumber: yup.string().matches(phoneReg, 'Not a valid number'),
                    NumberType: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required')
                })
            )
            .min(1, 'Atleast one'),
        Address:  yup.object().shape({
            AddressLine1: yup.string().required('required 1'),
            AddressLine2: yup.string().notRequired(),
            CountryId: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
            ZipCode: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
            State: yup.string().required('required'),
            City: yup.string().required('required')
        }),
        BillingAddress: yup.object()
            .when([], {
                is: () => !getValues('IsBillingAddress'),
                then: yup.object().shape({
                        AddressLine1: yup.string().required('required 1'),
                        AddressLine2: yup.string().notRequired(),
                        CountryId: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
                        ZipCode: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
                        State: yup.string().required('required'),
                        City: yup.string().required('required')
                    }),
                otherwise: yup.object().notRequired()
            }),
    })

    const { register, formState: { errors }, handleSubmit, getValues, setValue, reset, control, watch } = useForm({
        defaultValues,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });

    const handleClose = () => {
        setOpen(false)
        reset()
    }

    const { fields, append, remove } = useFieldArray({control, name: 'PhoneNumbersList'});
    const { fields: emailFields, append: emailAppend, remove: emailRemove } = useFieldArray({control, name: 'EmailList'});

    const onSubmit = (values) => {
        const data = {...values, CustomerName: values.FirstName+ ' ' + values.LastName, name:  values.FirstName+ ' ' + values.LastName}
        delete(data['FirstName'])
        delete(data['LastName'])
        handleClose()
        if(typeof setClientValue === 'function') {
            setClientValue(data)
        }
    }
    const checkboxForBilling = watch("IsBillingAddress");

    return(
        <Dialog
            onClose={handleClose}
            open={open}
            scroll="body"
            maxWidth="sm"
        >
            <DialogTitle variant='h3' onClose={handleClose} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                New Client
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        Client Details
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                label= 'First Name'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("FirstName")}
                                error={!!errors.FirstName}
                                helperText={errors.FirstName?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= 'Last Name'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("LastName")}
                                error={!!errors.LastName}
                                helperText={errors.LastName?.message}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label= 'Company Name'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CompanyName")}
                                error={!!errors.CompanyName}
                                helperText={errors.CompanyName?.message}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        {...register("IsPrimaryName")}
                                        defaultChecked={defaultValues.IsPrimaryName}
                                        sx={{color:theme.palette.secondary.dark}}
                                    />
                                }
                                label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Use company name as the primary name</Typography>}

                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        Contact Details
                    </Typography>
                    <Grid container spacing={0.5}>
                        {fields.map((val, index) => {
                            return (
                                <React.Fragment key={index}> 
                                    <Grid item sx={{mb: 1}} xs={4}>
                                        <TextField
                                            // label= 'Type'
                                            fullWidth
                                            select
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`PhoneNumbersList[${index}].NumberType`)}
                                            defaultValue={phoneType[0]?.value}
                                        >
                                            {phoneType?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={index == 0 ? 8 : 7} >
                                        <TextField
                                            label= 'Phone number'
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`PhoneNumbersList[${index}].PhoneNumber`)}
                                            error={!!errors.PhoneNumbersList?.[index] ? !!errors.PhoneNumbersList?.[index].PhoneNumber: false}
                                            helperText={!!errors.PhoneNumbersList?.[index] ? errors.PhoneNumbersList?.[index].PhoneNumber?.message : ''}
                                        />
                                    </Grid>
                                    {
                                        index != 0 &&
                                        <Grid item xs={1}>
                                            <IconButton aria-label="delete" onClick={() => remove(index)} sx={{color: theme.palette.common.danger}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    }
                                </React.Fragment >
                            );
                        })}
                    </Grid>
                        
                    <Button
                        onClick={() => {
                            append({ PhoneNumber: "", NumberType: "" });
                        }}
                        sx={{textTransform:'uppercase', mb: 1}}
                    >
                        Add phone number 
                    </Button>

                    <Grid container spacing={0.5}>
                        {emailFields.map((val, index) => {
                            return (
                                <React.Fragment key={index}> 
                                    <Grid item  xs={4} sx={{mb: 1}} >
                                        <TextField
                                            // label= 'Type'
                                            fullWidth
                                            select
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`EmailList[${index}].EmailType`)}
                                            defaultValue={emailType[0]?.value}
                                        >
                                            {emailType?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={index == 0 ? 8 : 7}  >
                                        <TextField
                                            label= 'Email'
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`EmailList[${index}].Email`)}
                                            error={!!errors.EmailList?.[index] ? !!errors.EmailList[index].Email : false}
                                            helperText={!!errors.EmailList?.[index] ? errors.EmailList[index].Email?.message : ''}
                                        />
                                    </Grid>
                                    {
                                        index != 0 &&
                                        <Grid item xs={1}>
                                            <IconButton aria-label="delete" onClick={() => emailRemove(index)} sx={{color: theme.palette.common.danger}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                    }
                                </React.Fragment >
                            );
                        })}
                    </Grid>
                        
                    <Button
                        onClick={() => {
                            emailAppend({ Email: "", EmailType: "" });
                        }}
                        sx={{textTransform:'uppercase'}}
                    >
                        Add Email 
                    </Button>

                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                            Property Details
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12} sm={6}>
                            <TextField
                                label= 'Street 1'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.AddressLine1")}
                                error={!!errors?.Address?.AddressLine1}
                                helperText={errors?.Address?.AddressLine1?.message}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} sm={6}>
                            <TextField
                                label= 'Street 2'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.AddressLine2")}
                                error={!!errors.Address?.AddressLine2}
                                helperText={errors.Address?.AddressLine2?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= 'City'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.City")}
                                error={!!errors?.Address?.City}
                                helperText={errors?.Address?.City?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= 'State'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.State")}
                                error={!!errors?.Address?.State}
                                helperText={errors?.Address?.State?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= 'ZIP value'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.ZipCode")}
                                error={!!errors?.Address?.ZipCode}
                                helperText={errors?.Address?.ZipCode?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("Address.CountryId")}
                                error={!!errors?.Address?.CountryId}
                                helperText={errors?.Address?.CountryId?.message}
                                defaultValue={countries[0]?.value}
                            >
                                {countries?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <FormControlLabel
                                control={
                                    <Checkbox 
                                        {...register("IsBillingAddress")}
                                        defaultChecked={defaultValues.IsBillingAddress}
                                        sx={{color:theme.palette.secondary.dark}}
                                    />
                                }
                                label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Billing address is the same as property address</Typography>}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                {
                    !checkboxForBilling &&
                    <DialogContent dividers>
                        <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                            Billing Address
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item md={12} xs={12} sm={6}>
                                <TextField
                                    label= 'Street 1'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.AddressLine1")}
                                    error={!!errors?.BillingAddress?.AddressLine1}
                                    helperText={errors?.BillingAddress?.AddressLine1?.message}
                                />
                            </Grid>
                            <Grid item md={12} xs={12} sm={6}>
                                <TextField
                                    label= 'Street 2'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.AddressLine2")}
                                    error={!!errors.BillingAddress?.AddressLine2}
                                    helperText={errors.BillingAddress?.AddressLine2?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label= 'City'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.City")}
                                    error={!!errors?.BillingAddress?.City}
                                    helperText={errors?.BillingAddress?.City?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label= 'State'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.State")}
                                    error={!!errors?.BillingAddress?.State}
                                    helperText={errors?.BillingAddress?.State?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label= 'ZIP value'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.ZipCode")}
                                    error={!!errors?.BillingAddress?.ZipCode}
                                    helperText={errors?.BillingAddress?.ZipCode?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    select
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.CountryId")}
                                    error={!!errors?.BillingAddress?.CountryId}
                                    helperText={errors?.BillingAddress?.CountryId?.message}
                                    defaultValue={countries[0]?.value}
                                >
                                    {countries?.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                }
                <DialogContent>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        Get Automated Notifications
                    </Typography>
                    <Stack direction="row">
                        <Grid container spacing={1}>
                            <Grid item md={10} xs={10} sm={10}>
                                <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Appointment reminders
                                </Typography>
                                <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                                    Remind the client of an upcoming visit or assessment.
                                </Typography>
                            </Grid>
                            <Grid item md={2} xs={2} sm={2}>
                                <Switch 
                                    {...register("Notification.Appointment")}
                                    defaultChecked={defaultValues.Notification.Appointment}
                                    sx={{color:theme.palette.secondary.dark}}
                                />
                            </Grid>
                            <Grid item md={10} xs={10} sm={10}>
                                <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Invoice follow-up
                                </Typography>
                                <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                                    Follow up on an overdue invoice.
                                </Typography>
                            </Grid>
                            <Grid item md={2} xs={2} sm={2}>
                                <Switch 
                                    {...register("Notification.Invoice")}
                                    defaultChecked={defaultValues.Notification.Invoice}
                                    sx={{color:theme.palette.secondary.dark}}
                                />
                            </Grid>
                            <Grid item md={10} xs={10} sm={10}>
                                <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Quote follow-up
                                </Typography>
                                <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                                    Follow up on an outstanding quote.
                                </Typography>
                            </Grid>
                            <Grid item md={2} xs={2} sm={2}>
                                <Switch 
                                    {...register("Notification.Quote")}
                                    defaultChecked={defaultValues.Notification.Quote}
                                    sx={{color:theme.palette.secondary.dark}}
                                />
                            </Grid>
                            <Grid item md={10} xs={10} sm={10}>
                                <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Job follow-up
                                </Typography>
                                <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                                    Follow up when you open or close the job.
                                </Typography>
                            </Grid>
                            <Grid item md={2} xs={2} sm={2}>
                                <Switch 
                                    {...register("Notification.Job")}
                                    defaultChecked={defaultValues.Notification.Job}
                                    sx={{color:theme.palette.secondary.dark}}
                                />
                            </Grid>
                        </Grid>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='inherit' sx={{textTransform:'uppercase'}} >
                        Cancel
                    </Button>
                    <Button type='submit' autoFocus variant='contained' color='primary' sx={{textTransform:'uppercase'}}>
                        Create client
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddClient


const countries = [
    { value: '1', label: 'Andorra', phone: '376' },
    {
      value: '2',
      label: 'United Arab Emirates',
      phone: '971',
    },
    { value: '3', label: 'Afghanistan', phone: '93' },
    {
      value: '4',
      label: 'Antigua and Barbuda',
      phone: '1-268',
    },
    { value: '5', label: 'Anguilla', phone: '1-264' },
    { value: '6', label: 'Albania', phone: '355' },
    { value: '7', label: 'Armenia', phone: '374' },
    { value: '8', label: 'Angola', phone: '244' },
    { value: '9', label: 'Antarctica', phone: '672' },
    { value: '10', label: 'Argentina', phone: '54' }
]