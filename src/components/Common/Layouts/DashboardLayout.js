import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.dark,
        padding: theme.spacing(3),
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

const DashboardLayout = ({children, heading}) => {
    const classes = useStyles();

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container spacing={3}>
                <Grid item md={5} sm={12} xs={12}>
                    <Typography variant="h2" align="left" gutterBottom sx={{textTransform: 'uppercase'}}>
                        {heading}
                    </Typography>
                </Grid>
            </Grid>
            {children}
        </main>
    );
};

export default DashboardLayout;
