import React, {useState, useEffect} from 'react'
import { 
    Chip,
    List,
    ListItem,
    ListItemText,
    Alert,
    Collapse,
    ListItemButton
 } from '@mui/material';
 import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 import ExpandLessIcon from '@mui/icons-material/ExpandLess';
 import { useTheme } from '@emotion/react';


const UnscheduledItems = () => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {setOpen(!open)}
    return(
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', boxShadow: 2 }}
        >
            <ListItemButton onClick={handleClick}>
                <ListItemText primary="Unscheduled Items" />
                {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText 
                            primary={
                                <Alert icon={false} variant="outlined" >
                                    Job #3 <br/>
                                    TV repair 
                                </Alert>
                            } 
                        />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText 
                            primary={
                                <Alert icon={false} variant="outlined" severity='error'>
                                    Job #3 <br/>
                                    TV repair 
                                </Alert>
                            } 
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>
    )
}
export default UnscheduledItems