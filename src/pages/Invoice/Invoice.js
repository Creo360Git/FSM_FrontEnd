import React, {
  useState,
  useEffect,
  // useContext
} from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import MuiDataTable from "../../components/Common/TabTable/MuiDataTable";
import MoreOptionsMenu from "../../components/Controls/MoreOptionsMenu";
import AddNewButton from "../../components/Controls/AddNewButton";
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

const Invoice = ({ locations, types }) => {
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

  const [invoices, setInvoices] = useState(null);

  useEffect(() => {
    const timer = setTimeout(
      () =>
        setInvoices([
          {
            id: 1287,
            number: null,
            idStr: "1287",
            name: "afvbhdfbvhgg",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2021-10-14T01:05:00",
            dateStr: null,
            notes: null,
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "employee rentall",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "null",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1307,
            number: null,
            idStr: "1307",
            name: "sdffd",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2021-11-10T19:40:00",
            dateStr: null,
            notes: null,
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: null,
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1324,
            number: null,
            idStr: "1324",
            name: "fdfdfd vehicle 3",
            priority: 0,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2021-11-23T07:21:00",
            dateStr: null,
            notes: null,
            isCompleted: false,
            status: 2,
            statusName: "InProgress",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: null,
            referenceType: 0,
            priorityStr: "High",
          },
          {
            id: 1325,
            number: null,
            idStr: "1325",
            name: "ddsdffd",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2021-11-23T09:00:00",
            dateStr: null,
            notes: "ddsd",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 84683,
            referenceNumber: "2",
            referenceType: 3,
            priorityStr: "Medium",
          },
          {
            id: 1376,
            number: null,
            idStr: "1376",
            name: "cv",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-15T17:30:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1377,
            number: null,
            idStr: "1377",
            name: "cbvvvb",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-09T17:30:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1378,
            number: null,
            idStr: "1378",
            name: "wqq",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-04T17:30:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1379,
            number: null,
            idStr: "1379",
            name: "mnn",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-01T17:30:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1380,
            number: null,
            idStr: "1380",
            name: "wa",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-05T17:30:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1381,
            number: null,
            idStr: "1381",
            name: "xcxc",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-02T17:31:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "New",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Medium",
          },
          {
            id: 1382,
            number: null,
            idStr: "1382",
            name: "www",
            priority: 1,
            type: 0,
            startDate: null,
            startDateStr: null,
            endDate: null,
            endDateStr: null,
            locationId: 0,
            locationName: null,
            vehicleNumber: null,
            licenseNumber: null,
            customerName: null,
            phone: null,
            email: null,
            date: "2022-06-06T17:31:00",
            dateStr: null,
            notes: "",
            isCompleted: false,
            status: 1,
            statusName: "Newest",
            assignedTo: null,
            assignee: "niruba sabesh",
            days: 0,
            multiplelocation: null,
            userId: 0,
            clientId: 0,
            referenceId: 0,
            referenceNumber: "",
            referenceType: 0,
            priorityStr: "Mediumet",
          },
        ]),
      1000
    );
    return () => clearTimeout(timer);
  }, []);

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
      placeholder: "searchClients",
    },
    {
      field: "SortBy",
      type: "select",
      placeholder: "sort",
      options: sortByOptions,
    },
    {
      field: "Filter",
      type: "select",
      placeholder: "filter",
      options: filterOptions,
    },
  ];

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container spacing={3}>
        <Grid item md={5} xs={7}>
          <Typography variant="h2" align="left" gutterBottom>
            {t("headings.invoice")}
          </Typography>
        </Grid>

        <Grid item md={7} xs={5}>
          <AddNewButton
            title={t("buttons.newInvoice")}
            redirectPath={"/invoice/newInvoice"}
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
            data={invoices}
            setData={setInvoices}
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

// export default connect(mapStateToProps, null)(Invoice);
export default Invoice;
