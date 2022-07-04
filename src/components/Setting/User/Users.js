import React, {useState} from 'react'
import { Typography } from '@mui/material'
import AddNewButton from '../../Controls/AddNewButton'
import MuiDataTable from '../../Common/TabTable/MuiDataTable'
import AddNewUser from './AddNewUser'



const Users = () => {
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
            label: "Employee Name",
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
            {open && <AddNewUser open={open} setOpen={setOpen} />}
            <Typography  variant="h2" align="left" gutterBottom sx={{textTransform: 'capitalize'}}>
                {'Users'}
            </Typography>
            <AddNewButton title='Add New user' handleClick={handleOpen} />
            <MuiDataTable
                headers={columns}
                data={rows}
                setData={setRows} 
            /> 
        </React.Fragment>
    )
}
export default Users