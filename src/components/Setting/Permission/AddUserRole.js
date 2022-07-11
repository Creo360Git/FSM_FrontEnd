import React, {useState, useEffect} from 'react'
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    Typography,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Box,
    Collapse,
    Alert,
    IconButton,
    DialogActions,
    Button
} from '@mui/material'
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useTheme } from '@emotion/react';


const permissionGroup = [
    {value:'a', label: '1st gp'},
    {value:'b', label: '2nd gp'},
    {value:'c', label: '3rd gp'},
    {value:'d', label: '4th gp'},
    {value:'e', label: '5th gp'}
]

const AddUSerRole = ({open, setOpen}) => {
    const theme = useTheme()
    const [checked, setChecked] = useState([true, false]);
    const handleChange1 = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };
    
    const handleChange2 = (event) => {
        setChecked([event.target.checked, checked[1]]);
    };
    
    const handleChange3 = (event) => {
        setChecked([checked[0], event.target.checked]);
    };

    const defaultValues = {
        roleName: '',
        description: ''
    }
    const validationSchema = yup.object().shape({
        roleName: yup.string().required(),
        description: yup.string().required()
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

    const [customerPermissions, setCustomerPermissions] = useState([
        {value: false, label: 'Add Customer'},
        {value: false, label: 'Delete Customer'},
        {value: false, label: 'Edit Customer'}
    ])

    const [adminPermissions, setAdminPermissions] = useState([
        {value: false, label: 'Hide User'},
        {value: false, label: 'View Location'},
        {value: false, label: 'Hide Tax  Button'}
    ])

    const [allPermissions, setAllPermissions] = useState(false)
    const [permissionArray, setPermissionArray] = useState([
        {value: customerPermissions, label: 'Customer Permissions', collapseOpen: false, setValue: setCustomerPermissions},
        {value: adminPermissions, label: 'Admin Permissions', collapseOpen: false, setValue: setAdminPermissions}
    ])

    const [collapseOpen, setCollapseOpen] =  useState(false)
    const handleCollpaseOpen = (index) => {
        setPermissionArray(({...permissionArray})=>{
            permissionArray[index].collapseOpen = !permissionArray[index].collapseOpen
            return Object.values(permissionArray)
        })
    }

    useEffect(() => {
        const val = (!!customerPermissions.find(e=>e.value === false) || !!adminPermissions.find(e=>e.value === false))
        if(!val) {
            setAllPermissions(true)
            setPermissionArray([
                {value: customerPermissions, label: 'Customer Permissions', collapseOpen: permissionArray[0].collapseOpen, setValue: setCustomerPermissions},
                {value: adminPermissions, label: 'Admin Permissions', collapseOpen: permissionArray[1].collapseOpen, setValue: setAdminPermissions}
            ])
        }
        else if(val){
            setAllPermissions(false)
            setPermissionArray([
                {value: customerPermissions, label: 'Customer Permissions', collapseOpen: permissionArray[0].collapseOpen, setValue: setCustomerPermissions},
                {value: adminPermissions, label: 'Admin Permissions', collapseOpen: permissionArray[1].collapseOpen, setValue: setAdminPermissions}
            ])
        }
    }, [customerPermissions, adminPermissions])
    

    const handleClickAll = (e) => {
        setAllPermissions(e.target.checked)
        if(e.target.checked){
            setCustomerPermissions(customerPermissions.map(({label})=>(
                {label:label, value:true}
            )))
            setAdminPermissions(adminPermissions.map(({label})=>(
                {label:label, value:true}
            )))
        }
        else{
            setCustomerPermissions(customerPermissions.map(({label})=>(
                {label:label, value:false}
            )))
            setAdminPermissions(adminPermissions.map(({label})=>(
                {label:label, value:false}
            )))
        }
    }

    const children = (
        permissionArray.map((arr, index)=>(
            <React.Fragment key={index}>
                <Alert 
                    icon={true} 
                    sx={{mb: 1, cursor: 'pointer', color: '#818EA1'}} 
                    severity="success" 
                    onClick={()=>handleCollpaseOpen(index)}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                        >
                            {arr.collapseOpen ? <ExpandLessIcon  /> : <ExpandMoreIcon  />}
                        </IconButton>
                    }
                >
                    {arr.label}
                </Alert>
                <Collapse in={arr.collapseOpen}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        {
                            arr.value.map((permission, id)=>(
                                <FormControlLabel
                                    key={id}
                                    label={permission.label}
                                    control={
                                        <Checkbox 
                                            checked={permission.value} 
                                            onChange={(e)=>{
                                                arr.setValue(({...values})=>{
                                                    values[id].value = e.target.checked
                                                    return Object.values(values)
                                                })
                                            }} 
                                            sx={{color: theme.palette.primary.main}}
                                        />
                                    }
                                />
                            ))
                        }
                    </Box>
                </Collapse>
            </React.Fragment>
        ))
    );

    return(
        <Dialog
            onClose={handleClose}
            open={open}
            scroll="body"
            maxWidth="md"
        >
            <DialogTitle variant='h3' onClose={handleClose} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                {'Add New User Role'}
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <DialogContent dividers>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                label= {'Role Name'}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("roleName")}
                                error={!!errors.roleName}
                                helperText={errors.roleName?.message}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label= {'Description'}
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        {'Define the permissions faster by selecting a group or go through the list'}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <TextField
                                label= {'Permission Group'}
                                fullWidth
                                select
                                type="text"
                                variant="outlined"
                                size="small"
                                {...register("permissionGroup")}
                                error={!!errors.permissionGroup}
                                helperText={errors.permissionGroup?.message}
                                defaultValue={'a'}
                            >
                                {permissionGroup?.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers>
                    <FormControlLabel
                        label={<Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}} >All Permissions</Typography>}
                        control={
                        <Checkbox
                            checked={allPermissions}
                            indeterminate={!allPermissions}
                            onChange={(e)=>handleClickAll(e)}
                            sx={{color: theme.palette.primary.main}}
                        />
                        }
                    />
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='contained' color='inherit' sx={{textTransform:'uppercase'}} >
                        {'Cancel'}
                    </Button>
                    <Button type='submit' autoFocus variant='contained' color='primary' sx={{textTransform:'uppercase'}}>
                        {'Save'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}
export default AddUSerRole