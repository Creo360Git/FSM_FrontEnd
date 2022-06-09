import React, {useState} from 'react'
import { Typography, Container } from "@mui/material";
import DataTable from '../../components/Common/DataTable'
import AddNewButton from '../../components/Common/Button';
import DashboardLayout from '../../components/Common/Layouts/DashboardLayout';
import AddClient from './AddClient';


function createData(CustomerName, Address, Phone, Email, carbs) {
    return {
        CustomerName,
        Address,
        Phone,
        Email,
        carbs,
    };
}

const rows = [
    createData('Cupcake', '6351 Fringilla Avenue Gardena Colorado 37547', '0768677656', 'ex@gmail.com', 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];


const columns = [
        {
            field: 'CustomerName',
            label: 'lead',
            render: (row, id) => {
                return (
                    <div key={id}>
                        {'#' + (id+1).toString()}
                        <Typography key={row.CustomerName} sx={{color:'#818EA1',}}>{row.CustomerName}</Typography>
                    </div>
                )
            }
        },
        {
            field: 'Address',
            label: 'address',
        },
        {
            field: 'Phone Email',
            label: 'contact details',
            render: (row, id) => {
                return (
                    <div key={id}>
                        <Typography sx={{color:'#818EA1',}}>{row.Phone }</Typography>
                        <Typography sx={{color:'#818EA1',}}>{row.Email}</Typography>
                    </div>
                )
            }
        },
        {
            field: 'carbs',
            label: 'status',
        }
];

const filterOptions = [
    {label:'All' , value:'All' },
    {label:'Leads and Active' , value:'Leads and Active' },
    {label:'Leads' , value:'Leads' },
    {label:'Active' , value:'Active' },
    {label:'Archived' , value:'Archived' },
]

const sortByOptions = [
    {label:'First Name' , value:'first' },
    {label:'Last Name' , value:'Last' },
    {label:'Recent Active' , value:'recent' }
]

const toolBar=[
    {
        field: 'Parameter',
        type: 'search',
        placeholder: 'Search clients'
    },
    {
        field: 'SortBy',
        type: 'select',
        placeholder: 'Sort',
        options: sortByOptions
    },
    {
        field: 'Filter',
        type: 'select',
        placeholder: 'Filter',
        options: filterOptions
    },

]

const Clients = () => {
    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setOpen(true) 
    }

    return(
        <DashboardLayout heading='Clients'>
            {open && <AddClient open={open} setOpen={setOpen} />}
            <Container>
                <AddNewButton 
                    title= 'Add new client'
                    handleClick={handleOpen}
                />
                <DataTable 
                    columns={columns}
                    rows={rows}
                    toolBar={toolBar}
                />
            </Container>
        </DashboardLayout>
    )
}

export default Clients