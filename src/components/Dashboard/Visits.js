import React, {
  useState,
  // useContext, useEffect,
} from "react";
import {
  Grid,
  useTheme,
  Menu,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import EnhancedTable from "./EnhancedTable";
import { styled } from "@mui/styles";
// import { AuthContext } from "../../auth/AuthProvider";
// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
      label: "update",
      //   onClick: handleClickOpen,
      color: theme.palette.primary.main,
    },
    {
      label: "delete",
      //   onClick: handleClickOpenDeleteConfirm,
      color: "#FF0000",
    },
  ];

  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      {...props}
    />
  ))(() => ({
    "& .MuiPaper-root": {
      borderRadius: 2,
      boxShadow:
        "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

      "&:hover": {
        boxShadow:
          "0px 3px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
      },
    },
  }));

  const closeMenu = () => {
    setAnchorEl(null);
  };

  // const MoreOptionsMenu = () => {
  //   return (
  //     <StyledMenu
  //       id="long-menu"
  //       anchorEl={anchorEl}
  //       keepMounted
  //       open={Boolean(anchorEl)}
  //       onClose={closeMenu}
  //       PaperProps={{
  //         style: {
  //           minWidth: "10rem",
  //         },
  //       }}
  //       style={{ borderRadius: 20 }}
  //     >
  //       {menuItems.map((menuItem, i) => (
  //         <MenuItem
  //           key={i}
  //           // onClick={menuItem.onClick}
  //           style={{
  //             color: menuItem.color,
  //           }}
  //         >
  //           {menuItem.label}
  //         </MenuItem>
  //       ))}
  //     </StyledMenu>
  //   );
  // };

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
      actionsChildren: (
        <StyledMenu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          PaperProps={{
            style: {
              minWidth: "10rem",
            },
          }}
          style={{ borderRadius: 20 }}
        >
          {menuItems.map((menuItem, i) => (
            <MenuItem
              key={i}
              // onClick={menuItem.onClick}
              style={{
                color: menuItem.color,
              }}
            >
              {menuItem.label}
            </MenuItem>
          ))}
        </StyledMenu>
      ),
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
      <Grid
        item
        xs={12}
        style={{
          marginBottom: theme.spacing(2),
        }}
      >
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.2rem",
              "@media (min-width:1536px)": {
                fontSize: "1.4rem",
              },
            }}
          >
            {t("tableHeadings.visits")}
          </Typography>
        </Box>
      </Grid>

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
        {/* <EnhancedTable
          rows={[]}
          headCells={headCells}
          showCb={false}
          totalCount={0}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePageWithoutPagination={handleChangePageWithoutPagination}
          handleChangeRowsPerPageWithoutPagination={
            handleChangeRowsPerPageWithoutPagination
          }
          handleClickOpenMoreOption={handleClickOpenMoreOption.bind(this)}
          MoreOptionsMenu={MoreOptionsMenu}
        /> */}
      </Grid>
    </Grid>
  );
};

export default Visits;
