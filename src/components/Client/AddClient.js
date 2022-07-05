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
    FormGroup,
    CircularProgress
} from '@mui/material'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

import { useDispatch, useSelector } from 'src/redux/Store';
import { fetchTypes } from 'src/redux/Slices/Type';
import { CreateClient } from "src/redux/Slices/Client";
import { createClientSuccess } from 'src/redux/Slices/Client';


const AddClient = ({open, setOpen, setClientValue}) => {
    const theme = useTheme()
    const {t} = useTranslation()

    const dispatch = useDispatch()
    const {types, isLoading, error} = useSelector(state=>state.type)
    useEffect(()=>{dispatch(fetchTypes('phone'))},[dispatch])

    const [phoneType, setPhoneType] = useState([])

    useEffect(()=>{
        setPhoneType(types.map((val)=>({value: val.TypeId, label: val.TypeName})))
    },[types])
    console.log(phoneType)



    const [client, setClient] = useState({})

    const defaultValues = {
        ClientId: 1,
        FirstName: '',
        LastName: '',
        CompanyName: '',
        IsPrimaryName: false,
        IsBillingAddress: true,
        email: '',
        // EmailList: [{Email: '', EmailType: emailType[0].value}],
        CreatedBy: '',
        IsActive: true,
        PhoneNumbersList: [{phoneNumber: '', numberType: ''}],
        CustomerAddress: {
            AddressLine1: '',
            AddressLine2: '',
            countryId: countries[0]?.value,
            ZipCode: '',
            StateId: 1,
            City: '',
            CreatedBy: '',
            AddressType: 12
        },
        BillingAddress: {
            AddressLine1: '',
            AddressLine2: '',
            AddressType: '',
            countryId: countries[0]?.value,
            ZipCode: '',
            StateId: 1,
            City: '',
            CreatedBy: ''
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
        email: yup.string().email('Not a valid email').required('required'),
        // EmailList: yup.array()
        //     .of(
        //         yup.object().shape({
        //             Email: yup.string().email('Not a valid number').required('required'),
        //             EmailType: yup.number().typeError('must be a email').positive().integer().nullable(false).required('required')
        //         })
        //     )
        //     .min(1, 'Atleast one'),
        CreatedBy: yup.string(),
        IsActive: yup.boolean(),
        PhoneNumbersList: yup.array()
            .of(
                yup.object().shape({
                    phoneNumber: yup.string().matches(phoneReg, 'Not a valid number'),
                    numberType: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required')
                })
            )
            .min(1, 'Atleast one'),
        CustomerAddress:  yup.object().shape({
            AddressLine1: yup.string().required('required 1'),
            AddressLine2: yup.string().notRequired(),
            countryId: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
            ZipCode: yup.string().required('required'),
            StateId: yup.number().required('required'),
            City: yup.string().required('required')
        }),
        BillingAddress: yup.object()
            .when([], {
                is: () => !getValues('IsBillingAddress'),
                then: yup.object().shape({
                        AddressLine1: yup.string().required('required 1'),
                        AddressLine2: yup.string().notRequired(),
                        countryId: yup.number().typeError('must be a number').positive().integer().nullable(false).required('required'),
                        ZipCode: yup.string().required('required'),
                        StateId: yup.number().required('required'),
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

    // const [data, setData] = useState([])
    // useEffect(()=>{
    //     dispatch(CreateClient(data))
    // },[dispatch, data])

    const onSubmit = (values) => {
        const data = ({...values, CustomerName: values.FirstName+ ' ' + values.LastName})
        delete(data['FirstName'])
        delete(data['LastName'])
        console.log('in')
        fetch(process.env.REACT_APP_API+`/customer`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(()=>{
            dispatch(createClientSuccess(data))
            handleClose()
            if(typeof setClientValue === 'function') {
                setClientValue(data)
            }
        })
        .catch((error)=>{
            console.log(error)
        })
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
                {t("headings.newClient")}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        {t("subHeadings.clientDetails")}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                label= {t("labels.firstName")}
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
                                label= {t("labels.lastName")}
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
                                label= {t("labels.companyName")}
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
                                label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>{t("labels.companyNameAsPrimaryName")}</Typography>}

                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        {t("subHeadings.contactDetails")}
                    </Typography>
                    <Grid container spacing={0.5}>
                        {fields.map((val, index) => {
                            return (
                                <React.Fragment key={index}> 
                                    <Grid item sx={{mb: 1}} xs={4}>
                                        { isLoading ? <CircularProgress /> :
                                        <TextField
                                            // label= 'Type'
                                            fullWidth
                                            select
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`PhoneNumbersList[${index}].numberType`)}
                                            defaultValue={phoneType[0]?.value}
                                        >
                                            {phoneType?.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        }
                                    </Grid>
                                    <Grid item xs={index == 0 ? 8 : 7} >
                                        <TextField
                                            label= {t("labels.phoneNumber")}
                                            fullWidth
                                            type="text"
                                            variant="outlined"
                                            size="small"
                                            {...register(`PhoneNumbersList[${index}].phoneNumber`)}
                                            error={!!errors.PhoneNumbersList?.[index] ? !!errors.PhoneNumbersList?.[index].phoneNumber: false}
                                            helperText={!!errors.PhoneNumbersList?.[index] ? errors.PhoneNumbersList?.[index].phoneNumber?.message : ''}
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
                            append({ phoneNumber: "", numberType: "" }, { shouldFocus: false });
                        }}
                        sx={{textTransform:'uppercase', mb: 1}}
                    >
                        {t("buttons.addPhoneNumber")} 
                    </Button>
                    <Grid container >
                        <Grid item xs={12}>
                            <TextField
                                label= {t("labels.email")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                    </Grid>

                    {/* <Grid container spacing={0.5}>
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
                                            label= {t("labels.email")}
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
                    </Grid> */}
                        
                    {/* <Button
                        onClick={() => {
                            emailAppend({ Email: "", EmailType: "" });
                        }}
                        sx={{textTransform:'uppercase'}}
                    >
                        {t("buttons.addEmail")}
                    </Button> */}

                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        {t("subHeadings.propertyDetails")}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12} sm={6}>
                            <TextField
                                label= {t("labels.street1")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.AddressLine1")}
                                error={!!errors?.CustomerAddress?.AddressLine1}
                                helperText={errors?.CustomerAddress?.AddressLine1?.message}
                            />
                        </Grid>
                        <Grid item md={12} xs={12} sm={6}>
                            <TextField
                                label= {t("labels.street2")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.AddressLine2")}
                                error={!!errors.CustomerAddress?.AddressLine2}
                                helperText={errors.CustomerAddress?.AddressLine2?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {t("labels.City")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.City")}
                                error={!!errors?.CustomerAddress?.City}
                                helperText={errors?.CustomerAddress?.City?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {t("labels.state")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.StateId")}
                                error={!!errors?.CustomerAddress?.StateId}
                                helperText={errors?.CustomerAddress?.StateId?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {t("labels.ZipCode")}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.ZipCode")}
                                error={!!errors?.CustomerAddress?.ZipCode}
                                helperText={errors?.CustomerAddress?.ZipCode?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                select
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("CustomerAddress.countryId")}
                                error={!!errors?.CustomerAddress?.countryId}
                                helperText={errors?.CustomerAddress?.countryId?.message}
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
                                label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>{t("labels.billingAddressSameAsproPertyAddress")}</Typography>}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                {
                    !checkboxForBilling &&
                    <DialogContent dividers>
                        <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                            {t("subHeadings.billingAddress")}
                        </Typography>
                        <Grid container spacing={1}>
                            <Grid item md={12} xs={12} sm={6}>
                                <TextField
                                    label= {t("labels.street1")}
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
                                    label= {t("labels.street2")}
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
                                    label= {t("labels.City")}
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
                                    label= {t("labels.state")}
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("BillingAddress.StateId")}
                                    error={!!errors?.BillingAddress?.StateId}
                                    helperText={errors?.BillingAddress?.StateId?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label= {t("labels.ZipCode")}
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
                                    {...register("BillingAddress.countryId")}
                                    error={!!errors?.BillingAddress?.countryId}
                                    helperText={errors?.BillingAddress?.countryId?.message}
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
                        {t("subHeadings.getAutomatedNotifications")}
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
                        {t("buttons.cancel")}
                    </Button>
                    <Button type='submit' autoFocus variant='contained' color='primary' sx={{textTransform:'uppercase'}}>
                        {t("buttons.createClient")}
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