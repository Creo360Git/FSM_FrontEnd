import { Button, Menu, MenuItem,ButtonGroup } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import React from "react";
import { makeStyles } from "@mui/styles";


const useStyles =  makeStyles((theme)=>({
    userSelect:{
        height:'35px',
        width:'150px',
    },
    userDropdown:{
        margin:'auto',
        height:'35px',
    },
}))


const CustomButtonDropDown = ({lists, handleFunction,title,width,IsContained}) => {
    
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleType = (e)=>{
        setAnchorEl(e.currentTarget);
    }
    
    const handleClose = (props)=>{
       
        console.log(props)
        //const value = e.currentTarget.attributes?.value?.value;
        //
        handleFunction(props);
        setAnchorEl(null); 
             
    }
    
    return (
        <React.Fragment>
            
            <Button variant={IsContained?"contained":"outlined"} className={classes.userSelect} sx={{width:width}} onClick={handleType}>
                { title}
            </Button>
            <Button variant={IsContained?"contained":"outlined"} className={classes.userDropdown} onClick={handleType}>
                <ArrowDropDownIcon />
            </Button>
           
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                transformOrigin={{ 
                    horizontal: 'right', 
                    vertical: 'top' 
                }}
                anchorOrigin={{ 
                    horizontal: 'right', 
                    vertical: 'bottom' 
                }}
            >
                {
                    lists.map((prop)=>{
                        return(
                            <MenuItem 
                                value={prop.id}  
                                key = {prop.id}
                                className={classes.menuItem}
                                sx ={{ minWidth:`${width}`}}
                                onClick = {(e)=>{
                                    handleClose(prop)
                                 }}
                            > 
                                {prop.label}
                            </MenuItem>
                        )
                    })
                }
                
            </Menu>
    
        </React.Fragment>
    )
}
 
export default CustomButtonDropDown;