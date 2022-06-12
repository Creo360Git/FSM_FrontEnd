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
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
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

const Quote = ({ locations, types }) => {
  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePageWithoutPagination = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPageWithoutPagination = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [idValue, setIdValue] = useState(null);

  const handleClickOpenMoreOption = (event, idValue) => {
    setAnchorEl(event.currentTarget);
    setIdValue(idValue);
  };

  const menuItems = [
    {
      label: "Update",
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: "Delete",
      //   onClick: handleClickOpenDeleteConfirm,
      color: "#FF0000",
    },
  ];

  const headCells = [
    {
      name: "name",
      label: t("tableHeadings.name"),
    },
    {
      name: "date",
      label: t("tableHeadings.date"),
      fieldRenderType: "date",
    },
    {
      name: "vehicleNo",
      label: t("tableHeadings.vehicleNo"),
    },
    {
      name: "priorityStr",
      label: t("tableHeadings.priority"),
    },
    {
      name: "notes",
      label: t("tableHeadings.notes"),
    },
    {
      name: "assignee",
      label: t("tableHeadings.assignee"),
    },
    {
      name: "status",
      label: t("tableHeadings.status"),
      fieldRenderType: "chip",
      headerLabelAlign: "center",
    },
    {
      name: "actions",
      label: t("tableHeadings.actions"),
      headerLabelAlign: "center",
      fieldRenderType: "actions",
      fieldStyles: null,
      actionsOnClick: (event, id) => {
        handleClickOpenMoreOption(event, id);
      },
      actionsChildren: MoreOptionsMenu(menuItems, anchorEl, setAnchorEl),
    },
  ];

  const rows = [];

  // const rows = [
  //   {
  //     id: 1287,
  //     number: null,
  //     idStr: "1287",
  //     name: "afvbhdfbvhgg",
  //     priority: 1,
  //     type: 0,
  //     startDate: null,
  //     startDateStr: null,
  //     endDate: null,
  //     endDateStr: null,
  //     locationId: 0,
  //     locationName: null,
  //     vehicleNumber: null,
  //     licenseNumber: null,
  //     customerName: null,
  //     phone: null,
  //     email: null,
  //     date: "2021-10-14T01:05:00",
  //     dateStr: null,
  //     notes: null,
  //     isCompleted: false,
  //     status: 1,
  //     statusName: "New",
  //     assignedTo: null,
  //     assignee: "employee rentall",
  //     days: 0,
  //     multiplelocation: null,
  //     userId: 0,
  //     clientId: 0,
  //     referenceId: 0,
  //     referenceNumber: "null",
  //     referenceType: 0,
  //     priorityStr: "Medium",
  //   },
  //   {
  //     id: 1307,
  //     number: null,
  //     idStr: "1307",
  //     name: "sdffd",
  //     priority: 1,
  //     type: 0,
  //     startDate: null,
  //     startDateStr: null,
  //     endDate: null,
  //     endDateStr: null,
  //     locationId: 0,
  //     locationName: null,
  //     vehicleNumber: null,
  //     licenseNumber: null,
  //     customerName: null,
  //     phone: null,
  //     email: null,
  //     date: "2021-11-10T19:40:00",
  //     dateStr: null,
  //     notes: null,
  //     isCompleted: false,
  //     status: 1,
  //     statusName: "New",
  //     assignedTo: null,
  //     assignee: "niruba sabesh",
  //     days: 0,
  //     multiplelocation: null,
  //     userId: 0,
  //     clientId: 0,
  //     referenceId: 0,
  //     referenceNumber: null,
  //     referenceType: 0,
  //     priorityStr: "Medium",
  //   },
  //   {
  //     id: 1324,
  //     number: null,
  //     idStr: "1324",
  //     name: "fdfdfd vehicle 3",
  //     priority: 0,
  //     type: 0,
  //     startDate: null,
  //     startDateStr: null,
  //     endDate: null,
  //     endDateStr: null,
  //     locationId: 0,
  //     locationName: null,
  //     vehicleNumber: null,
  //     licenseNumber: null,
  //     customerName: null,
  //     phone: null,
  //     email: null,
  //     date: "2021-11-23T07:21:00",
  //     dateStr: null,
  //     notes: null,
  //     isCompleted: false,
  //     status: 2,
  //     statusName: "InProgress",
  //     assignedTo: null,
  //     assignee: "niruba sabesh",
  //     days: 0,
  //     multiplelocation: null,
  //     userId: 0,
  //     clientId: 0,
  //     referenceId: 0,
  //     referenceNumber: null,
  //     referenceType: 0,
  //     priorityStr: "High",
  //   },
  //   {
  //     id: 1325,
  //     number: null,
  //     idStr: "1325",
  //     name: "ddsdffd",
  //     priority: 1,
  //     type: 0,
  //     startDate: null,
  //     startDateStr: null,
  //     endDate: null,
  //     endDateStr: null,
  //     locationId: 0,
  //     locationName: null,
  //     vehicleNumber: null,
  //     licenseNumber: null,
  //     customerName: null,
  //     phone: null,
  //     email: null,
  //     date: "2021-11-23T09:00:00",
  //     dateStr: null,
  //     notes: "ddsd",
  //     isCompleted: false,
  //     status: 1,
  //     statusName: "New",
  //     assignedTo: null,
  //     assignee: "niruba sabesh",
  //     days: 0,
  //     multiplelocation: null,
  //     userId: 0,
  //     clientId: 0,
  //     referenceId: 84683,
  //     referenceNumber: "2",
  //     referenceType: 3,
  //     priorityStr: "Medium",
  //   },
  // ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={10}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.quotes")}
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
                // onClick={(e) => {
                //   openMenu(e);
                // }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={3}
        style={{
          marginTop: theme.spacing(3),
        }}
      >
        <Grid item xs={12}>
          <MuiDataTable
            headers={headCells}
            data={rows}
            count={rows?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            setPage={setPage}
            setRowsPerPage={setRowsPerPage}
            onPageChange={handleChangePageWithoutPagination}
            onRowsPerPageChange={handleChangeRowsPerPageWithoutPagination}
            isDownload={false}
            isPrint={false}
          />
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

// export default connect(mapStateToProps, null)(Quote);
export default Quote;
