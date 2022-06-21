import React, {useState, useEffect} from 'react'
import { 
    Grid,
    Card,
    Chip,
    Typography,
    TextField,
    FormControlLabel,
    Checkbox,
    Stack,
    Button,
    Fab
} from '@mui/material'
import { useTheme } from '@emotion/react'
import AddIcon from '@mui/icons-material/Add';
import SelectEmployeeDialog from './SelectEmployeeDialog';
import { styled } from '@mui/material/styles';

const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));


const AssignEmployees = ({errors, register, defaultValues, mt}) => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [selectedEmployee, setSelectedEmployee] = useState([])
    const handleOpen = () => setOpen(true)

    const handleDelete = (emp) => {
        setSelectedEmployee(selectedEmployee.filter(e=>e!=emp))
    }

    return(
        <Card sx={{p:3, mt}}>
            {open && <SelectEmployeeDialog open={open} setOpen={setOpen} selectedEmployee={selectedEmployee} theme={theme} />}
            <Stack direction='row' justifyContent='space-between' mb={1} sx={{backgroundColor:'#D2E0F3', p: 1, fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                <Typography  variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                    Employees
                </Typography>
                <Typography onClick={handleOpen} size="small" variant='h6'  aria-label="add" sx={{backgroundColor: theme.palette.primary.main, color: 'white', p: 0.5, borderRadius: 1, cursor: 'pointer'}}>
                    Assign +
                </Typography>
            </Stack>
            <Grid container  alignItems='flex-start'>
                {
                    selectedEmployee.length > 0 ? 
                    <React.Fragment>
                        <Grid xs={12} item>
                            <Stack
                                direction="row"
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                }}
                                component="ul"
                            >
                                {
                                    selectedEmployee.map((emp, index)=>{
                                        return(
                                            <ListItem key={index}>
                                                <Chip key={index} label={emp} onDelete={()=>{handleDelete(emp)}} />
                                            </ListItem>
                                        )
                                    })
                                }
                            </Stack>
                        </Grid>
                        <Grid item md={12} >
                            <FormControlLabel
                                sx={{height: '25px', mt: 2}}
                                control={
                                    <Checkbox 
                                        {...register("a")}
                                        defaultChecked={false}
                                        sx={{color:theme.palette.secondary.dark}}
                                    />
                                }
                                label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>
                                    Email employees about the jobs
                                </Typography>}
                            />
                        </Grid>
                    </React.Fragment>
                    :
                    'No users are currently assigned'
                }
            </Grid>
        </Card>
    )
}
export default AssignEmployees