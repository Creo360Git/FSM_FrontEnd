import React, {
  useState,
  //   useEffect,
  // useContext
} from "react";
import { makeStyles} from "@mui/styles";
import {
  Grid,
  Typography,
  useTheme,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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

const Reports = ({ locations, types }) => {
  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  // const rows = [];

  const [reports, setReports] = useState(null);

  const list = [
    { label: "Upon Receipt", value: "uponReceipt" },
    { label: "Net 15", value: "net15" },
    { label: "Net 30", value: "net30" },
    { label: "Net 45", value: "net45" },
    { label: "Customize", value: "customize" },
  ];
  const title = [
    { label: "FINANCIAL REPORT", value: "financereport" },
    { label: "WORK REPORT", value: "workreport" },
    { label: "CLIENT REPORT", value: "clientreport" },
    { label: "EXPENSE REPORT", value: "expensereport" },
  ];
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={7}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.reports").toUpperCase()}
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
        <Grid item xs={8}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20}}>
            {title?.map((item, index) => {
                return (
                  <div style={{border:'1px 1px 1px 0 solid black',height:'50px',width:300,backgroundColor:'#E0E0E0'}}>
                    <MenuItem value={item?.value} key={index}>
                    {item?.label || ""}
                    </MenuItem>
                    {list?.map((item, index) => {
                              return (
                                <div style={{border:'1px 1px 1px 1px solid black',height:'50px',width:300,backgroundColor:'#FFFFFF'}}>
                                  <MenuItem value={item?.value} key={index}>
                                    {item?.label || ""}
                                  </MenuItem></div>
                                );
                          })}
                    </div>
                  );
            })}
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

// export default connect(mapStateToProps, null)(Reports);
export default Reports;
