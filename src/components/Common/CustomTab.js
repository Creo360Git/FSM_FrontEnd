import React, {useState, useEffect} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { makeStyles, useTheme } from '@mui/styles';
import { useLocation, Link, Navigate, useNavigate } from 'react-router-dom';

const tabHeight = '24px' // default: '48px'
const useStyles = makeStyles(theme => ({
  tabsRoot: {
    minHeight: tabHeight,
    height: tabHeight
  },
  tabRoot: {
    minHeight: tabHeight,
    height: tabHeight

  }
}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function CustomTab({tabs=[], panelComponents=[], currentTab, tabUrls, parentPath, childPath='', ...rest}) {
    const theme = useTheme()
    const [value, setValue] = React.useState(tabUrls.indexOf(currentTab));
    const location = useLocation()
    const navigate = useNavigate()

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=>{
        setValue(tabUrls.indexOf(currentTab))
    },[currentTab])

    useEffect(()=>{
        navigate(`/${parentPath}/${tabUrls[value]}/${childPath}`, { replace: true })
    },[value])

    const classes = useStyles()

    return (
        <Box sx={{ width: '100%', mb: 2 }} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs 
                    value={value} 
                    onChange={handleChange} 
                    aria-label="basic tabs example" 
                    variant="fullWidth"
                    TabIndicatorProps={{
                        sx:{display: 'none'}
                    }}
                    sx={{...rest}}
                    // orientation="vertical"
                    // style={{height: "32px"}}
                >
                    {
                        tabs.map((tab, index)=>(
                            // <Link to={`/${parentPath}/${tabUrls[index]}`}>
                                <Tab 
                                    key={index}
                                    label={<Typography component='span'  variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>{tab}</Typography>} 
                                    {...a11yProps(index)} 
                                    sx={{color: index == value ? 'white !important' : 'black', boxShadow: 2, width: '100%', backgroundColor: index == value ? '#08134a' : 'rgba(14, 165, 233, 0.28)',border: "1px solid #CACACA"}}
                                />
                            // </Link>
                        ))
                    }
                </Tabs>
            </Box>
            {
                panelComponents.map((panel, index)=>(
                    <TabPanel value={value} index={index} key={index}>
                        {panel}
                    </TabPanel>
                ))
            }
        </Box>
    );
}
