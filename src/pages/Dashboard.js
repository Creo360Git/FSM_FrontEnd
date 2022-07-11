import React, {
  useState,
  // useEffect, useContext
} from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Grid,
  Typography,
  IconButton,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Statistics from "../components/Dashboard/Statistics";
import Visits from "../components/Dashboard/Visits";
import Revenue from "../components/Dashboard/Revenue";
import InfoCards from "../components/Dashboard/InfoCards";
import PeopleIcon from "@mui/icons-material/People";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArticleIcon from "@mui/icons-material/Article";
import ConstructionIcon from "@mui/icons-material/Construction";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MoreOptionsMenu from "../components/Controls/MoreOptionsMenu";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
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
  const theme = useTheme();

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuItems = [
    {
      label: (
        <>
          <ListItemIcon>
            <PeopleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addClient")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <>
          <ListItemIcon>
            <RequestPageIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addQuote")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <>
          <ListItemIcon>
            <ArticleIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addInvoice")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <>
          <ListItemIcon>
            <ConstructionIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addJob")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <>
          <ListItemIcon>
            <FileDownloadIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addRequest")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: (
        <>
          <ListItemIcon>
            <LocationSearchingIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <Typography color="primary" variant="h4">
            {t("buttons.addTrack")}
          </Typography>
        </>
      ),
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
  ];

  return (
    // <main className={classes.content}>
    //   <div className={classes.toolbar} />
    //   <Grid container spacing={3}>
    //     <Grid item md={5} xs={10}>
    //       <Typography variant="h2" align="left" gutterBottom>
    //         {t("headings.dashboard")}
    //       </Typography>
    //     </Grid>
    <React.Fragment>
        <Grid item md={7} xs={2}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Grid
              item
              className={`${classes.buttonGridItem} ${classes.buttonShadow}`}
            >
              <IconButton
                color="primary"
                className={`${classes.buttonSmall}`}
                onClick={(e) => {
                  openMenu(e);
                }}
              >
                <MoreHorizIcon />
              </IconButton>

              {MoreOptionsMenu(menuItems, anchorEl, setAnchorEl)}
            </Grid>
          </Box>
        </Grid>
      {/* </Grid> */}

      <Statistics />

      <Visits />

      <Grid container spacing={3} style={{ marginTop: "1rem" }}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Revenue />
        </Grid>
      </Grid>

      <InfoCards />
      </React.Fragment>
    // </main>
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
