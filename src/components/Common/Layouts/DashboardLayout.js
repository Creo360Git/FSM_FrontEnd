import React, { useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.dark,
        padding: theme.spacing(3),
        minHeight: '100vh'
    },
    toolbar: theme.mixins.toolbar,
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 160,
    },
}));

const DashboardLayout = ({children}) => {
    const classes = useStyles();
    const {heading} = useSelector((state)=>state.common)
    
    return (
        <Box sx={{overflowX: 'auto'}} className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={3}>
                <Grid item md={5} sm={12} xs={12}>
                    <Typography variant="h2" align="left" gutterBottom sx={{textTransform: 'uppercase'}}>
                        {heading}
                    </Typography>
                </Grid>
            </Grid>
            <Outlet>
                {children}
            </Outlet>
        </Box>
    );
};

export default DashboardLayout;
