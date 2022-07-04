import React, {useEffect, useState} from 'react';
import { 
    Box, 
    FormControl, 
    FormControlLabel, 
    Checkbox, 
    FormGroup, 
    Menu, 
    MenuItem
} from '@mui/material';
import { useTheme } from '@emotion/react';



const ColumnViewer = ({columns, setAnchorEl, anchorEl, setRenderColumns}) => {
    const theme = useTheme()
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const [viewColumns, setViewColumns] = useState(columns)
    const handleChange = (e, index) => {
        setViewColumns(({...viewColumns})=>{
            viewColumns[index].isView = e.target.checked
            return Object.values(viewColumns)
        })
    }
    useEffect(()=>{setRenderColumns(viewColumns.filter((col)=>typeof col.isView === 'boolean' ? col.isView : true))},[viewColumns])

    return(
        <Box sx={{ display: 'flex' }}>
            <FormControl sx={{ m: 1 }} component="fieldset" variant="standard">
                <FormGroup>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        // onClick={handleClose}
                        component='ul'
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 110,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        {
                            viewColumns.map((column, index)=>(
                                <MenuItem key={index} >
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={typeof column.isView === 'boolean' ? column.isView : true} 
                                                onChange={(e)=>{handleChange(e, index)}} 
                                                name={column.name} 
                                                sx={{color: theme.palette.primary.main}}
                                            />
                                        }
                                        label={column.label}
                                    />
                                </MenuItem>
                            ))
                        }
                    </Menu>
                </FormGroup>
            </FormControl>
        </Box>
    )
}
export default ColumnViewer