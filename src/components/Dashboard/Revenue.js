import React, {
  // useContext, useEffect,
  useState,
} from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { AuthContext } from "../../auth/AuthProvider";
import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  Area,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  closeButton: {
    color: "#5E6C84",
  },
  card: { height: "100%" },
}));

const Revenue = (props) => {
  //   const auth = useContext(AuthContext);

  const [revenueStatuses, setRevenueStatuses] = useState([
    {
      total: 0,
      monthName: "Jul",
      previousTotal: 0,
    },
    {
      total: 0,
      monthName: "Aug",
      previousTotal: 0,
    },
    {
      total: 44,
      monthName: "Sep",
      previousTotal: 0,
    },
    {
      total: 0,
      monthName: "Oct",
      previousTotal: 0,
    },
    {
      total: 497.99,
      monthName: "Nov",
      previousTotal: 0,
    },
    {
      total: 285.18,
      monthName: "Dec",
      previousTotal: 0,
    },
    {
      total: 3290.2,
      monthName: "Jan",
      previousTotal: 0,
    },
    {
      total: 1753.85,
      monthName: "Feb",
      previousTotal: 0,
    },
    {
      total: 115.5,
      monthName: "Mar",
      previousTotal: 0,
    },
    {
      total: 125,
      monthName: "Apr",
      previousTotal: 0,
    },
    {
      total: 4077.6,
      monthName: "May",
      previousTotal: 0,
    },
    {
      total: 0,
      monthName: "Jun",
      previousTotal: 0,
    },
  ]);
  const { t } = useTranslation();

  const classes = useStyles();

  //   useEffect(() => {
  //     async function fetchData() {
  //       const profile = auth.getProfile();
  //       if (profile) {
  //         let stats = await getSalesStatuses(
  //           {
  //             clientId: profile.clientId,
  //             userId: profile.userId,
  //             locationId: props.locationId,
  //           },
  //           auth.getToken()
  //         );

  //         setRevenueStatuses(stats);
  //       }
  //     }
  //     fetchData();
  //   }, [auth, props.locationId]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-start" alignItems="center">
              <Typography variant="h3">{t("headings.revenue")}</Typography>
            </Box>
          </Grid>
          {/* <Grid item xs={2}>
            <Box display="flex" justifyContent="flex-end" alignItems="center">
              <HighlightOffIcon
                onClick={props.onClose}
                className={classes.closeButton}
              />
            </Box>
          </Grid> */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            ></Box>
          </Grid>
          <Grid item xs={12}>
            {revenueStatuses && (
              <ResponsiveContainer width="98%" height={300}>
                <AreaChart
                  data={revenueStatuses}
                  margin={{
                    top: 25,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#80d4ff" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#80d4ff" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="monthName" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid vertical={false} stroke="#DDD" />

                  <Area
                    // name={t("labels.total")}
                    name="Total"
                    type="monotone"
                    dataKey="total"
                    strokeWidth={2}
                    fillOpacity={1}
                    stroke="#80d4ff"
                    fill="url(#colorUv)"
                  />

                  <Legend
                    iconType="circle"
                    verticalAlign="top"
                    layout="horizontal"
                    align="left"
                    wrapperStyle={{
                      marginLeft: 100,
                      marginTop: -30,
                    }}
                    formatter={(value) => {
                      return (
                        <span
                          style={{
                            display: "inline-block",
                            marginBottom: 10,
                          }}
                        >
                          <span
                            style={{
                              width: 100,
                              display: "inline-block",
                            }}
                          >
                            {value}
                          </span>
                          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        </span>
                      );
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Revenue;
