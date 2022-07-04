import React, {useState, useEffect} from 'react'
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    Grid,
    TextField,
    Typography,
    FormControlLabel,
    Checkbox,
    Button,
    Autocomplete,
    Switch,
    FormGroup
} from '@mui/material'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from '@emotion/react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useTranslation } from 'react-i18next';

const languages = [
    {key: "", value: "-Please Select-"},
    {key: "ar-AE", value: "Arabic"},
    {key: "sr-Cyrl-RS", value: "Serbian"},
    {key: "fr-FR", value: "France"}
]

const locations = [
    {locationId: 16942, stateName: "Manitoba", countryName: "Canada", locationName: "a", address1: "test1"},
    {locationId: 16783, stateName: "Manitoba", countryName: "Canada", locationName: "bc", address1: "hjgj"},
    {locationId: 16859, stateName: "ARKANSAS", countryName: "USA", locationName: "dc", address1: "bjj"}
]

const AddNewUser = ({open, setOpen, setClientValue}) => {
    const theme = useTheme()
    const {t} = useTranslation()
   const [selectedLocations, setSelectedLocations]=useState([])

    const defaultValues = {
        ClientId: '',
        FirstName: '',
        LastName: '',
        CompanyName: '',
        IsPrimaryName: false,
        IsBillingAddress: true,
        
        CreatedBy: '',
        IsActive: true,
        
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

   

    const onSubmit = (values) => {
        const data = {...values, CustomerName: values.FirstName+ ' ' + values.LastName, name:  values.FirstName+ ' ' + values.LastName}
        delete(data['FirstName'])
        delete(data['LastName'])
        handleClose()
    }


    return(
        <Dialog
            onClose={handleClose}
            open={open}
            scroll="body"
            maxWidth="sm"
        >
            <DialogTitle variant='h3' onClose={handleClose} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                {'Add new user'}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label= {'User Name'}
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
                                label= {'Password'}
                                fullWidth
                                type="[password]"
                                variant="outlined"
                                size="small"
                                {...register("FirstName")}
                                error={!!errors.FirstName}
                                helperText={errors.FirstName?.message}
                            />
                        </Grid>
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
                        <Grid item xs={6}>
                            <TextField
                                label= {'Email'}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {'Phone No.'}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={languages}
                                size={'small'}
                                getOptionLabel={(option) => option.value}
                                renderInput={(params) => <TextField size="small" variant="outlined" {...params} label="Language" />}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {'Scan Access Key'}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={languages}
                                size={'small'}
                                getOptionLabel={(option) => option.value}
                                renderInput={(params) => <TextField size="small" variant="outlined" {...params} label="Roles" />}
                            />
                        </Grid>
                        <Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightBold, mt: 2, mb: -1, ml: 1}}>
                            {'Locations'}
                        </Typography>
                        <Grid item xs={12} container sx={{ml: 1}}>
                            {
                                locations.map((location, id)=>(
                                    <Grid item xs={6} key={location.locationId}>
                                        <FormControlLabel
                                            label={location.locationName}
                                            control={
                                                <Checkbox 
                                                    checked={false} 
                                                    onChange={(e)=>{
                                                        console.log(!!selectedLocations.includes(location.locationId))
                                                        if(e.target.checked){
                                                            setSelectedLocations(selectedLocations.push(location.locationName))
                                                        }
                                                        else{

                                                        }
                                                    }} 
                                                    sx={{color: theme.palette.primary.main}}
                                                />
                                            }
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel labelPlacement='start' control={<Switch defaultChecked />} label="Active" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel labelPlacement='start' control={<Switch defaultChecked />} label="Is Reservation Email" />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel labelPlacement='start' control={<Switch defaultChecked={false} />} label="Lock" />
                        </Grid>
                    </Grid>
                </DialogContent>
                {console.log(selectedLocations)}
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='inherit' sx={{textTransform:'uppercase'}} >
                        {t("buttons.cancel")}
                    </Button>
                    <Button type='submit' autoFocus variant='contained' color='primary' sx={{textTransform:'uppercase'}}>
                        {'Create user'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default AddNewUser


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