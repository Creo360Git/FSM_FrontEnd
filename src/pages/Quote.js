import React, {
  useState,
  // useEffect, useContext
} from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
import MoreOptionsMenu from "../components/Controls/MoreOptionsMenu";
import AddNewButton from "../components/Controls/AddNewButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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

  // const rows = [];

  const rows = [
    {
      id: 1287,
      number: null,
      idStr: "1287",
      name: "afvbhdfbvhgg",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-10-14T01:05:00",
      dateStr: null,
      notes: null,
      status: 1,
      statusName: "New",
      assignee: "employeer",
      priorityStr: "Medium",
    },
    {
      id: 1307,
      number: null,
      idStr: "1307",
      name: "sdffd",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-10T19:40:00",
      dateStr: null,
      notes: null,
      statusName: "New",
      assignedTo: null,
      assignee: "ADS",
      priorityStr: "Medium",
    },
    {
      id: 1324,
      number: null,
      idStr: "1324",
      name: "fdfdfd vehicle 3",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-23T07:21:00",
      notes: null,
      status: 2,
      statusName: "InProgress",
      assignee: "FBI",
      priorityStr: "High",
    },
    {
      id: 1325,
      number: null,
      idStr: "1325",
      name: "ddsdffd",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-23T09:00:00",
      notes: "ddsd",
      status: 1,
      statusName: "New",
      assignee: "CID",
      priorityStr: "Medium",
    },
  ];

  const [openQuote, setOpenQuote] = useState(false);

  const handleOpen = () => {
    setOpenQuote(true);
  };

  const filterOptions = [
    { label: "All", value: "All" },
    { label: "Leads and Active", value: "Leads and Active" },
    { label: "Leads", value: "Leads" },
    { label: "Active", value: "Active" },
    { label: "Archived", value: "Archived" },
  ];

  const sortByOptions = [
    { label: "First Name", value: "first" },
    { label: "Last Name", value: "Last" },
    { label: "Recent Active", value: "recent" },
  ];

  const toolBar = [
    {
      field: "Parameter",
      type: "search",
      placeholder: "Search clients",
    },
    {
      field: "SortBy",
      type: "select",
      placeholder: "Sort",
      options: sortByOptions,
    },
    {
      field: "Filter",
      type: "select",
      placeholder: "Filter",
      options: filterOptions,
    },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={7}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.quotes")}
          </Typography>
        </Grid>

        <Grid item md={7} xs={5}>
          <AddNewButton
            title={t("buttons.newQuote")}
            handleClick={handleOpen}
            icon={<AddCircleIcon />}
          />
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
            // count={rows?.length || 0}
            // rowsPerPage={rowsPerPage}
            // page={page}
            // setPage={setPage}
            // setRowsPerPage={setRowsPerPage}
            // onPageChange={handleChangePageWithoutPagination}
            // onRowsPerPageChange={handleChangeRowsPerPageWithoutPagination}
            isDownload={false}
            isPrint={false}
            toolBar={toolBar}
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
