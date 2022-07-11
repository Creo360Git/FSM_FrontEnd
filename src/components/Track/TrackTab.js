import * as React from 'react';
import { useParams } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DashboardLayout from '../../components/Common/Layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box sx={{ pl:{sm: 3, xs:0} }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};


const useStyles = makeStyles((theme)=>({
    card:{
        height:'100vh',
        width:'192px',
        borderRadius:'4px',
        
        borderColor: theme.palette.secondary.dark,
        '& .MuiCardHeader-title':{
            color: '#000000',
            textAlign: 'center',
            fontWeight: 700,
            opacity: 0.42,
        },
        '& .MuiCardHeader-root':{
            backgroundColor: 'rgba(0, 0, 0, 0.1)'
        },
        '& .MuiCardContent-root':{
            padding:'0px'
        }

    },
    navItem:{
        height: '30px',
        padding:'5px 9px',
        verticalAlign:'middle',
        '&:hover':{
            backgroundColor: `${theme.palette.primary.dark}!important`,
            color:theme.palette.primary.contrastText,
        },
        
       
    },
    selected:{
        color: `${theme.palette.primary.dark}!important`,
        fontWeight: `${900}!important`,
       
        borderWidth: '1px',
        border: `1px solid ${theme.palette.primary.dark}!important`,
        
    },
    customDropdown: {
        height:'40px',
        margin: '20px 0px',
        '& .MuiSelect-select':{
            backgroundColor: 'white!important',
        }
       
    },
    navBar:{
        width:'100%',
        backgroundColor:'rgba(0,0,0,0.1)',
        padding: '16px'
    },
    Container:{
        position:'relative',
        [theme.breakpoints.down('sm')]: {
            position:'absolute',
            left:0,
            right:0,
            top:'220px',
        }
    },
    mobileHeaderContainer:{
        display:'none',
        width:'100%',
        position:'absolute',
        left:0,
        right:0,
        [theme.breakpoints.down('sm')]:{
            display: 'block'
        }
    },
    mobileHeader:{
        display:'flex',
        justifyContent: 'space-between',
        backgroundColor:'white',
        padding:'0px 10px',
    },

}))


const TrackTab = ({tabs=[],initialTabId,heading,title}) => {

    const classes = useStyles();

    const [value, setValue] = React.useState(initialTabId);

    const handleTabChange = (e)=>{
        setValue(e.target.value)
    }

    return ( 
        <Box sx={{display:{sm:'flex',xs:'block'}}}>
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{display:{xs:'none',sm:'block'}}}>
                    <Card className={classes.card}>
                        <CardHeader
                            title = {title}
                        />   
                        <CardContent>
                            <Box>
                                <MenuList 
                                    onClick={handleTabChange}
                                    value={value} 
                                >
                                    { 
                                        tabs && tabs.map(({label,id})=>{
                                            return(
                                                <MenuItem value={id} key={id} className={value !=id ? classes.navItem:classes.selected}> 
                                                    {label}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </MenuList>
                            </Box>
                        </CardContent>
                    </Card>  
                </Box>
                <Box className={classes.mobileHeaderContainer}>
                    <Grid className={classes.mobileHeader} >
                        <Grid sx={{ margin:'auto 0px'}}>
                            <Typography variant='h1'>
                                {
                                    tabs.map(({id, description,...values})=>{ return id==value? description:'' })
                                }
                            </Typography>
                        </Grid>
                        <Grid >
                            <FormControl  fullWidth>
                                <Select
                                    labelId="timetracker-label"
                                    id = "timetracker"
                                    value={value}
                                    onChange={handleTabChange} 
                                    className = {classes.customDropdown}
                                >
                                    { 
                                        tabs && tabs.map(({label,id,...values})=>{
                                            return(
                                                <MenuItem value={id} key={id} className={value !=id ? classes.navItem:classes.selected}> 
                                                    {label}
                                                </MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
               
            </Box>
            <Box sx={{width:'100%'}} className={classes.Container}>
                {
                    tabs && tabs.map(({id,component,...values})=>{
                        return(
                            <TabPanel value={value} index={id} key={id}>
                                {component}
                            </TabPanel>
                        )
                    })
                }
            </Box>
        </Box>
     );
}
 
export default TrackTab;