// import React, { useState, useEffect, useContext } from "react";
import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
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
  buttonGridItem: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  buttonShadow: {
    borderRadius: "2px",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

    "&:hover": {
      boxShadow:
        "0px 3px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
  },
  buttonSmall: {
    padding: theme.spacing(1),
    borderRadius: "5px",
    backgroundColor: theme.palette.background.button,
  },
}));

const Dashboard = ({ locations, types }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={10}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.dashboard")}
          </Typography>
        </Grid>

        <Grid item md={7} xs={2}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Grid
              item
              className={`${classes.buttonGridItem} ${classes.buttonShadow}`}
            >
              <IconButton
                color="primary"
                className={`${classes.buttonSmall}`}
                // onClick={handleClickDisplaycc}
              >
                <MoreHorizIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </main>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     locations: state.lookupLists.locations,
//     types: state.lookupLists.agreementTypes,
//   };
// };

// export default connect(mapStateToProps, null)(Dashboard);
export default Dashboard;
