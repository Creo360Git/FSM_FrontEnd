import React, {useState} from 'react'
import { Typography } from '@mui/material'
import AddNewButton from '../../Controls/AddNewButton'
import MuiDataTable from '../../Common/TabTable/MuiDataTable'
import AddUSerRole from './AddUserRole'



const PermissionManagement = () => {
    const [rows, setRows] = useState([
        {
          CustomerName: "e",
          Title: " f",
          Phone: "4534",
          Email: "f",
          Requested: "34",
        },
        {
          CustomerName: "e",
          Title: " f",
          Phone: "4534",
          Email: "f",
          Requested: "34",
        },
    ])

    const columns = [
        {
            name: "CustomerName",
            label: "lead",
        },
        {
            name: "Title",
            label: "title",
        },
        {
            name: "Phone",
            label: "contact",
        },
        {
            name: "Requested",
            label: "requested",
        },
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };

    return(
        <React.Fragment>
            {open && <AddUSerRole open={open} setOpen={setOpen} />}
            <Typography  variant="h2" align="left" gutterBottom sx={{textTransform: 'capitalize'}}>
                {'Permission management'}
            </Typography>
            <AddNewButton title='Add user role' handleClick={handleOpen} />
            <MuiDataTable
                headers={columns}
                data={rows}
                setData={setRows} 
            /> 
        </React.Fragment>
    )
}
export default PermissionManagement