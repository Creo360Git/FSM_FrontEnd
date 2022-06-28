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
 import { useTranslation } from 'react-i18next';
 import { useTheme } from '@emotion/react';


const UnscheduledItems = ({maxWidth=360, initialOpen= false}) => {
    const [open, setOpen] = useState(initialOpen)
    const handleClick = () => {setOpen(!open)}
    const {t} = useTranslation()
    return(
        <List
            sx={{ width: '100%', maxWidth: maxWidth, bgcolor: 'background.paper', boxShadow: 2 }}
        >
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={t("buttons.unScheduledItems")} />
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