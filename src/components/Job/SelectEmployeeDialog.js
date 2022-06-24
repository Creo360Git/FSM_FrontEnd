import React, {useState, useEffect} from 'react';
import { 
    Button,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    Dialog,
    Typography
} from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

const employees = ['emp1', 'emp2', 'emp3', 'emp4', 'emp5', 'emp6', 'emp7', 'emp8'];

export default function SelectEmployeeDialog(props) {
    const { setOpen, selectedEmployee, open, theme } = props;

    const handleClose = () => {
        setOpen(false)
    };

    const handleListItemClick = (value) => {
        selectedEmployee.push(value)
        handleClose()
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth="xs">
            <DialogTitle variant='h3' sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                Choose employee account
            </DialogTitle>
            <List sx={{ pt: 0 }}>
                {employees.map((employee) => (
                    !selectedEmployee.includes(employee) && 
                    <ListItem button onClick={() => handleListItemClick(employee)} key={employee}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={employee} />
                    </ListItem>
                ))}

                <ListItem autoFocus button onClick={() => handleListItemClick('addAccount')}>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}

