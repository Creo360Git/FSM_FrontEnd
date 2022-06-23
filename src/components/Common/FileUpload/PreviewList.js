import React, { useState, useRef } from "react";
import { 
    Typography, 
    Container, 
    Grid, 
    Stack, 
    TextField ,
    FormControlLabel,
    Checkbox,
    FormGroup,
    ButtonGroup,
    Button,
    useMediaQuery,
    Box,
    Card,
    IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";
import { previewIocn } from "./PreviewIcon";
import { formatBytes } from "../../Controls/formatUtils";

const useStyles = makeStyles((theme) => ({
    deleteBtn: {
        background: "#f8e8eb",
        "&:hover": {
            background: "#f8e8eb",
        },
    },
    deleteIcon: {
        color: theme.palette.common.danger,
    },
}));



const PreviewList = ({fileList, fileRemove, theme}) => {
    const classes=useStyles()
    return(
        <React.Fragment>
            {
                fileList.length > 0 ? (
                    <React.Fragment>
                        {
                            fileList.map((item, index) => (
                                // <Card sx={{boxShadow: 2, p: 1}} key={index}> 
                                    <Grid container spacing={5}  item xs={12} sm={12} md={6} lg={4} key={index} >
                                        {/* <Card sx={{boxShadow: 2, p: 1}} key={index}> */}
                                            <Grid item xs={2} alignItems="stretch">
                                                {previewIocn[item.type.split('/')[1]] || previewIocn['default']}
                                            </Grid>
                                            
                                            <Grid item xs={8} sx={{whiteSpace: 'nowrap'}}>
                                                <Typography variant="h5" sx={{fontWeight: theme.typography.fontWeightBold, textOverflow: 'ellipsis', overflow:'hidden'}} >{item.name}</Typography>
                                                <Typography variant="h6" sx={{fontWeight: theme.typography.fontWeightBold}} >{formatBytes(item.size)}</Typography>
                                            </Grid>
                                            <Grid item xs={1} >
                                                <IconButton
                                                    className={classes.deleteBtn}
                                                    onClick={() => fileRemove(item)}
                                                >
                                                    <DeleteIcon className={classes.deleteIcon} />
                                                </IconButton>
                                            </Grid>
                                        {/* </Card> */}
                                    </Grid>
                            ))
                        }
                    </React.Fragment>
                ) : null
            }
        </React.Fragment>
    )
}
export default PreviewList