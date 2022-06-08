import React, {
  useState,
  // useContext, useEffect,
} from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import PaymentIcon from "@mui/icons-material/Payment";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import CloseIcon from "@mui/icons-material/Close";
// import { AuthContext } from "../../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Statistics = ({ locationId }) => {
  //   const auth = useContext(AuthContext);
  const [statistics, setStatistics] = useState({});

  const theme = useTheme();

  //   const history = useNavigate();

  const { t } = useTranslation();

  //   useEffect(() => {
  //     async function fetchData() {
  //       const profile = auth.getProfile();
  //       if (profile) {
  //         const profile = auth.getProfile();
  //         let stats = await getStatistics(
  //           {
  //             clientId: profile.clientId,
  //             userId: profile.userId,
  //             locationId: locationId,
  //           },
  //           auth.getToken()
  //         );
  //         setStatistics(stats);
  //       }
  //     }
  //     fetchData();
  //   }, [locationId, auth, getStatistics]);

  //   const handleClick = (label, stat) => {
  //     switch (label) {
  //       case t("labels.reservations"):
  //         history.push("/reservations", {
  //           fromDashboard: true,
  //           createdDateFrom: moment().format("YYYY-MM-DDT00:00"),
  //           createdDateTo: moment().format("YYYY-MM-DDT00:00"),
  //           status: 2,
  //           locationId,
  //         });
  //         break;
  //       case t("labels.returns"):
  //         history.push("/agreements", {
  //           fromDashboard: true,
  //           endDate: moment().format("YYYY-MM-DDT00:00"),
  //           status: 2,
  //           locationId,
  //         });
  //         break;
  //       case t("labels.onRent"):
  //         history.push("/agreements", {
  //           fromDashboard: true,
  //           status: 2,
  //           locationId,
  //         });
  //         break;
  //       case t("labels.overdues"):
  //         history.push("/agreements", {
  //           fromDashboard: true,
  //           status: 2,
  //           overdues: true,
  //           locationId,
  //         });
  //         break;
  //       case t("labels.pendingPayment"):
  //         history.push("/agreements", {
  //           fromDashboard: true,
  //           status: 5,
  //           locationId,
  //         });
  //         break;
  //       case t("labels.serviceAlert"):
  //         history.push("/servicealerts", {
  //           fromDashboard: true,
  //           locationId,
  //         });
  //         break;
  //     }
  //   };

  const getStatCard = (stat, label, icon) => {
    return (
      <Grid item lg={3} md={3} sm={6} xs={12}>
        <Card>
          <CardContent>
            <Grid container spacing={3} flex>
              <Grid item xs={3} sm={5} md={4} lg={3} xl={4}>
                <Avatar
                  sx={{
                    width: theme.spacing(8),
                    height: theme.spacing(8),
                    color: theme.palette.primary.main,
                  }}
                >
                  {icon}
                </Avatar>
              </Grid>
              <Grid item xs={9} sm={7} md={8} lg={9} xl={8}>
                <Box
                  display="flex"
                  alignItems="flex-start"
                  flexDirection="column"
                  //   onClick={() => handleClick(label, stat)}
                  style={{ cursor: "pointer" }}
                >
                  <Typography color="textPrimary" gutterBottom variant="h1">
                    {stat}
                  </Typography>
                  <Typography color="textPrimary" variant="h5" noWrap>
                    {label}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Grid container spacing={3} style={{ marginTop: "1rem" }}>
      {getStatCard(
        statistics?.todayJobs || 0,
        t("labels.todayJobs"),
        <ConstructionIcon />
      )}
      {getStatCard(
        statistics?.cancelledJobs || 0,
        t("labels.cancelledJobs"),
        <CloseIcon />
      )}
      {getStatCard(
        statistics?.approvedJobs || 0,
        t("labels.approvedJobs"),
        <DoneAllIcon />
      )}
      {getStatCard(
        statistics?.paidInvoice || 0,
        t("labels.paidInvoice"),
        <PaymentIcon />
      )}
    </Grid>
  );
};

export default Statistics;
