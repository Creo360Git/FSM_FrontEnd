import React, {
  useState,
  //   useEffect,
  // useContext
} from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, useTheme, Card } from "@mui/material";
import { useTranslation } from "react-i18next";
import ScheduleItems from "../components/Map/ScheduleItems";
import GoogleMapReact from "google-map-react";
import MyMarker from "../components/Map/MyMarker";

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

const Map = ({ locations, types }) => {
  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      // return distance between the marker and mouse pointer
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };

  const points = [
    { id: 1, title: "Round Pond", lat: 51.506, lng: -0.184 },
    { id: 2, title: "The Long Water", lat: 51.508, lng: -0.175 },
    { id: 3, title: "The Serpentine", lat: 51.505, lng: -0.164 },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={7}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.map")}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: theme.spacing(3),
        }}
      >
        <Grid item lg={3} sm={4} xs={12}>
          <Card>
            <ScheduleItems />
          </Card>
        </Grid>

        <Grid item lg={7} sm={8} xs={12}>
          <div style={{ height: "100%", width: "100%" }}>
            <GoogleMapReact
              // bootstrapURLKeys={{
              //   // remove the key if you want to fork
              //     key: "AIzaSyDiKc4HxX5G7EfneIZBN_Hlk2_luoT_yvo",
              //   language: "en",
              //   region: "US",
              // }}
              defaultCenter={{ lat: 6.932, lng: 79.864 }}
              defaultZoom={8}
              distanceToMouse={distanceToMouse}
            >
              {points.map(({ lat, lng, id, title }) => {
                return (
                  <MyMarker
                    key={id}
                    lat={lat}
                    lng={lng}
                    text={id}
                    tooltip={title}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
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

// export default connect(mapStateToProps, null)(Map);
export default Map;
