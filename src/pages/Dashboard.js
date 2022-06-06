// import React, { useState, useEffect, useContext } from "react";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.dark,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  margin: {
    margin: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
}));

const Dashboard = ({ locations, vehicleTypes, agreementTypes }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} sm={12} xs={12}>
          <Typography variant="h2" align="left" gutterBottom>
            {/* {t("headings.dashboard")} */}
            Dash Board
          </Typography>
        </Grid>
      </Grid>
    </main>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     locations: state.lookupLists.locations,
//     agreementTypes: state.lookupLists.agreementTypes,
//     vehicleTypes: state.lookupLists.vehicleTypes,
//   };
// };

// export default connect(mapStateToProps, null)(Dashboard);
export default Dashboard;
