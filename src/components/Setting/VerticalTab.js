import React, {useState} from 'react';
import { styled} from '@mui/material/styles';
import {Divider, Grid, Accordion, AccordionSummary, Typography, AccordionDetails} from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import {useMediaQuery, useTheme} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';



const CustomList = styled(List)({
    '& .MuiListItemButton-root': {
        paddingLeft: 24,
        paddingRight: 24,
    },
    '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: 16,
    },
    '& .MuiSvgIcon-root': {
        fontSize: 20,
    },
});

const VerticalTab = ({panels=[], data}) => {
    const [value, setValue] = useState(0)
    const theme = useTheme()
    const isUpMd =  useMediaQuery(theme.breakpoints.up("md"))
    const [isExpanded, setIsExpanded] = useState(false)
    const NavChild = () => {
        return(
            <CustomList component="nav" disablePadding>
                {
                    data.map((item, id) => (
                        <React.Fragment key={item.label}>
                            <ListItemButton
                                key={item.label}
                                sx={{ py: 0, minHeight: 32,backgroundColor: value===id ? '#e9ecff' : ''  }}
                                onClick={
                                    ()=>setValue(id)
                                }
                                component='span'
                            >
                                {
                                    item.icon &&
                                    <ListItemIcon sx={{ color: value===id ? '#08134a' : 'black' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                }
                                
                                <ListItemText
                                    component='span'
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium', color: value===id ? '#08134a' : 'black', textTransform: 'capitalize' }}
                                />
                            </ListItemButton>
                            <Divider sx={{height:'1px'}} />
                        </React.Fragment>
                    ))
                }
            </CustomList>
        )
    }
    return(
        <Grid container spacing={2}>
            <Grid item md={3} xs={12}>
                { isUpMd ?
                <Paper elevation={0} sx={{ maxWidth: 300, boxShadow: 2 }}>
                    <NavChild />
                </Paper>
                :
                <Accordion expanded={isExpanded} onClick={()=>setIsExpanded((isExpanded)=>!isExpanded)}>
                    <AccordionSummary
                        expandIcon={<MenuIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>Menu</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <NavChild />
                    </AccordionDetails>
                </Accordion>
                }
            </Grid>
            
            {
                panels.map((panel, index)=>(
                    value === index &&
                    <Grid item md={9} xs={12} key={index}>
                        {panel}
                    </Grid>
                ))
            }
            
        </Grid>
    )
}
export default VerticalTab