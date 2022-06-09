import React, {
  useState,
  // useContext, useEffect,
} from "react";
import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import Divider from "@mui/material/Divider";
// import { AuthContext } from "../../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const InfoCards = ({ locationId }) => {
  //   const auth = useContext(AuthContext);
  const [statistics, setStatistics] = useState({});

  //   const history = useNavigate();

  const { t } = useTranslation();

  const getInfoCard = (title, label, stat) => {
    return (
      <Card>
        <CardContent>
          <Grid container spacing={3} flex>
            <Grid item xs={6}>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Typography color="textPrimary" variant="h3">
                  {title}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box
                display="flex"
                alignItems="flex-end"
                flexDirection="column"
                //   onClick={() => handleClick(label, stat)}
                style={{ cursor: "pointer" }}
              >
                <Typography color="textPrimary" variant="h3">
                  {t("labels.seeMore")}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={3} sm={5} md={4} lg={3} xl={4}>
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
              >
                <Typography color="textPrimary" variant="h5">
                  {label}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={9} sm={7} md={8} lg={9} xl={8}>
              <Box display="flex" alignItems="flex-end" flexDirection="column">
                <Typography color="textPrimary" variant="h5">
                  {stat}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  return (
    <Grid container spacing={3} style={{ marginTop: "1rem" }}>
      <Grid item md={4} xs={12}>
        {getInfoCard(
          t("headings.upcomingJobs"),
          t("labels.todayJobs"),
          statistics?.todayJobs || 0
        )}
      </Grid>

      <Grid item md={4} xs={12}>
        {getInfoCard(
          t("headings.quotation"),
          t("labels.cancelledJobs"),
          statistics?.cancelledJobs || 0
        )}
      </Grid>

      <Grid item md={4} xs={12}>
        {getInfoCard(
          t("headings.invoicePastDue"),
          t("labels.approvedJobs"),
          statistics?.approvedJobs || 0
        )}
      </Grid>
    </Grid>
  );
};

export default InfoCards;
