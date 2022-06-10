import React, {
  useState,
  // useContext, useEffect,
} from "react";
import {
  Grid,
  useTheme,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
// import { AuthContext } from "../../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MoreOptionsMenu from "../Controls/MoreOptionsMenu";
import MuiDataTable from "./MuiDataTable";

const Visits = () => {
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

  const rows = [
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
  ];

  return (
    <Grid
      container
      style={{
        marginTop: theme.spacing(3),
      }}
    >
      <Grid item xs={12}>
        {rows?.length > 0 ? (
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
            isDownload={true}
            isPrint={true}
          />
        ) : rows?.length === 0 ? (
          <Box width="100%" display="flex" justifyContent="center" p={2}>
            <Typography variant="h2" color="primary" align="center">
              {t("messages.noRecordsFound")}
            </Typography>
          </Box>
        ) : (
          <Box width="100%" display="flex" justifyContent="center" p={2}>
            <Typography variant="h2" color="primary" align="center">
              <CircularProgress color="secondary" disableShrink size={30} />
            </Typography>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default Visits;
