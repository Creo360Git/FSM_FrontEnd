import React, {useState, useEffect} from 'react'
import { 
    Chip,
    List,
    ListItem,
    ListItemText,
    Typography,
    TextField
 } from '@mui/material';
 import { useTheme } from '@emotion/react';
 import { useTranslation } from "react-i18next";


const EmployeeList = () => {
    const theme = useTheme()
    const { t } = useTranslation();
    const [searchQuery, setSearchQuery]= useState('')
    const [employees, setEmployees] = useState([
        {name: 'name1', skill: 'Electrician'},
        {name: 'name2', skill: 'Cable Technicians'},
        {name: 'name1', skill: 'Electrician'},
        {name: 'name2', skill: 'Cable Technicians'},
        {name: 'name1', skill: 'Electrician'},
        {name: 'name2', skill: 'Cable Technicians'},
        {name: 'name1', skill: 'Electrician'},
        {name: 'name2', skill: 'Cable Technicians'},
        {name: 'name1', skill: 'Electrician'}
    ])
    const [filterEmployees, setFilterEmployees] = useState(employees)
    useEffect(()=>{
        if(!!searchQuery){
            setFilterEmployees(employees.filter(emp=>(emp.name).toLowerCase().match(searchQuery.toLowerCase()) || (emp.skill).toLowerCase().match(searchQuery.toLowerCase())))
        }
    },[searchQuery])

    return(
        <React.Fragment>
            <TextField 
                name='search'
                placeholder={t("labels.search")}
                onChange={(e)=>{setSearchQuery(e.target.value)}}
                sx={{boxShadow: 1, ml:1, mr:1}}
            />
            <List sx={{ bgcolor: 'background.paper', m: 1 }}>
                {
                    (!!searchQuery ? filterEmployees : employees).map((emp, index)=> {
                        return(
                            <ListItem key={index} sx={{boxShadow: 1,mb: 0.5, borderRadius: 1, cursor: 'pointer', '&:hover':{backgroundColor: theme.palette.background.button}}}>
                                <ListItemText
                                    primary={emp?.name}
                                    secondary={
                                        <Chip label={emp?.skill} size="small" component='span'/>
                                    }
                                />
                            </ListItem>
                        )
                    }) 
                }
                {
                    (filterEmployees.length == 0 && !!searchQuery) && 
                    <Typography ml={1} sx={{fontWeight: theme.typography.fontWeightBold}}>No data</Typography>
                }
            </List>
        </React.Fragment>
    )
}
export default EmployeeList