import React, { useState, useRef } from "react";
import { 
    Typography, 
    Grid, 
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
                    <Grid container  >
                        {
                            fileList.map((item, index) => (
                                <Grid item  xs={12} sm={6} md={4} lg={3} key={index} >
                                    <Grid item container spacing={1}>
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
                                    </Grid>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : null
            }
        </React.Fragment>
    )
}
export default PreviewList