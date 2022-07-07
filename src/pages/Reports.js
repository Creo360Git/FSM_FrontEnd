import React, {
  useState,
  useEffect,
  // useContext
} from "react";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "src/redux/Store";
import { changePageHeading } from "src/redux/Slices/Common";

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

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(changePageHeading('Reports'))
  },[dispatch])

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
    // <main className={classes.content}>
    //   <div className={classes.toolbar} />
    //   <Grid container spacing={3}>
    //     <Grid item md={5} xs={7}>
    //       <Typography variant="h2" align="left" gutterBottom>
    //         {t("headings.reports").toUpperCase()}
    //       </Typography>
    //     </Grid>
    //   </Grid>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: theme.spacing(3),
        }}
      >
        {/* <Grid item xs={12}> */}
          {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridGap: 20 }}> */}
            {title?.map((item, index) => {
              return (
                <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                <div style={{
                  border: '1px solid #C9C9C9', backgroundColor: '#E0E0E0', width: '100%', display: 'table'
                }}>
                  <tr height='50px'>
                    <td style={{ fontSize: 18, fontWeight: 'bold', verticalAlign: 'middle', paddingLeft: '15px' }}
                      value={item?.value} key={index} >
                      {item?.label || ""}
                    </td></tr>
                  {list?.map((item, index) => {
                    return (
                      <div style={{ borderTop: '1px solid #C9C9C9', height: '50px', width: '100%', backgroundColor: '#FFFFFF' }} key={index}>
                        <MenuItem style={{ fontSize: 16, fontWeight: 'bold', marginTop: '10px' }} value={item?.value} key={index}>
                          {item?.label || ""}
                        </MenuItem></div>
                    );
                  })}
                </div>
                </Grid>
              );
            })}
          {/* </div> */}
        {/* </Grid> */}
      </Grid>
    // </main>
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
