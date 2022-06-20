import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles, withStyles } from "@mui/styles";
import {
  Button,
  Tooltip,
  Paper,
  Typography,
  Toolbar,
  TableSortLabel,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Checkbox,
  NativeSelect,
  IconButton,
  Grid,
  CircularProgress,
  Chip,
  Box,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import SendIcon from "@mui/icons-material/Send";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link, useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import GetAppIcon from "@mui/icons-material/GetApp";
import ShareIcon from "@mui/icons-material/Share";
import { useTranslation } from "react-i18next";
// import { formatDate, formatTime } from "../../../services/datetime";
import { Buffer } from "buffer";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    headCells,
    showCb,
  } = props;

  const theme = useTheme();
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead style={{ width: "100%" }}>
      <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
        {!showCb ? null : (
          <>
            {headCells[0].id === "userID" ||
            headCells[0].id === "documentId" ||
            headCells[0].id === "agreementHistoryId" ? (
              <TableCell
                style={{
                  width: "calc(100%/12)",
                }}
              >
                {headCells[0].id === "userID"
                  ? "Reset Password"
                  : headCells[0].id === "agreementHistoryId"
                  ? "Select"
                  : "Mandatory"}
              </TableCell>
            ) : (
              <TableCell
                padding="checkbox"
                style={{
                  width: "calc(100%/24)",
                }}
              >
                <Checkbox
                  color="primary"
                  indeterminate={numSelected > 0 && numSelected < rowCount}
                  checked={rowCount > 0 && numSelected === rowCount}
                  onChange={onSelectAllClick}
                  inputProps={{ "aria-label": "select all" }}
                />
              </TableCell>
            )}
          </>
        )}
        {headCells.map((headCell) =>
          headCell.id !== headCells[0].id ? (
            <TableCell
              style={{
                width: "calc(100%/12)",
                paddingLeft:
                  headCell.id.match(new RegExp(`Extra`, "g")) ||
                  headCell.id.match(new RegExp(`status`, "g")) ||
                  headCell.id.match(new RegExp(`isMandatory`, "g")) ||
                  headCell.id.match(new RegExp(`isReservationEmail`, "g")) ||
                  (headCell.id.match(new RegExp(`locationNames`, "g")) &&
                    headCells[0].id === "qboId" &&
                    "2rem") ||
                  (headCell.id.match(new RegExp(`description`, "g")) &&
                    headCells[0].id === "id")
                    ? "2rem"
                    : headCell.id.match(new RegExp(`isActive`, "g"))
                    ? "4rem"
                    : "",
              }}
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              align={
                headCell.id.match(new RegExp(`Extra`, "g")) ||
                headCell.id.match(new RegExp(`status`, "g")) ||
                headCell.id.match(new RegExp(`isReservationEmail`, "g")) ||
                (headCell.id.match(new RegExp(`locationNames`, "g")) &&
                  headCells[0].id === "qboId" &&
                  "center") ||
                (headCell.id.match(new RegExp(`description`, "g")) &&
                  headCells[0].id === "id")
                  ? "center"
                  : headCell.id.match(new RegExp(`commission`, "g"))
                  ? "right"
                  : "left"
              }
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                className={classes.headingCellsLabel}
                classes={{
                  root: classes.rootLabel,
                  active: classes.active,
                  icon: classes.icon,
                }}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ) : null
        )}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
  headCells: PropTypes.array.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    color: theme.palette.primary.main,
  },
  title: {
    flex: "1 1 90%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, sendMessageOnClick, headCells } = props;

  return (
    <>
      {headCells[0].id !== "userID" &&
        headCells[0].id !== "documentId" &&
        headCells[0].id !== "agreementHistoryId" && (
          <Toolbar
            className={clsx(classes.root, {
              [classes.highlight]: numSelected > 0,
            })}
            id="tableToolbar"
          >
            {numSelected > 0 ? (
              <Typography
                className={classes.title}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                <b>{numSelected} selected</b>
              </Typography>
            ) : (
              ""
            )}

            {numSelected > 0 ? (
              <Tooltip title="Send">
                <Button
                  aria-label="send"
                  startIcon={<SendIcon />}
                  variant="contained"
                  color="secondary"
                  onClick={sendMessageOnClick}
                >
                  Send SMS
                </Button>
              </Tooltip>
            ) : (
              ""
            )}
          </Toolbar>
        )}
    </>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "absolute",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  tableContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    overflow: "hidden",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  circleIcon: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    transform: "scale(0.7)",
  },
  statusCell: {
    position: "relative",
    paddingLeft: "30px",
  },
  headingCells: {
    width: "calc(100%/20)",
    color: "#FFF",
  },
  headingCellsLabel: {
    "&:hover": {
      color: "#FFF",
    },
    "&:active": {
      color: "#FFF",
    },
  },
  rootLabel: {
    "&$active": {
      color: theme.palette.secondary.light,
    },
    "&:hover": {
      color: theme.palette.secondary.light,
    },
  },
  icon: {
    "& path": {
      fill: theme.palette.secondary.light,
    },
  },
  active: {}, // pseudo
  actions: {
    display: "none",
  },
  caption: {
    display: "none",
  },
  input: {
    marginLeft: -24,
  },
}));

export default function EnhancedTable({
  rows,
  headCells,
  filterData,
  setfilterData,
  showCb,
  totalCount,
  page,
  rowsPerPage,
  handleChangePageWithoutPagination,
  handleChangeRowsPerPageWithoutPagination,
  sendMessageOnClick,
  selectedList,
  getSingleRecord,
  getMultipleRecord,
  MoreOptionsMenu,
  getRowData,
  handleClickOpenMoreOption,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [active, setActive] = React.useState(true);
  const history = useNavigate();
  const { t } = useTranslation();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event, expression) => {
    if (selected.length > 0) {
      setSelected([]);
      return;
    }
    if (event.target.checked) {
      const newSelecteds = rows.map((row) => eval(expression));
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const totalPages = filterData
    ? Math.ceil(totalCount / filterData?.PageSize)
    : 0;

  const handleClick = (event, elementId) => {
    const selectedIndex = selected.indexOf(elementId);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, elementId);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);

    headCells[0].id === "documentId" &&
      getSingleRecord(event.target.checked, elementId);
    headCells[0].id === "userID" && getMultipleRecord(newSelected);
    headCells[0].id === "agreementHistoryId" && getMultipleRecord(newSelected);
  };

  const handleChangePage = (event, btnType) => {
    if (btnType === "changePage") {
      setfilterData({
        ...filterData,
        Page: parseInt(event.target.innerText, 10),
      });
    } else if (btnType === "firstPage") {
      setfilterData({
        ...filterData,
        Page: 1,
      });
    } else if (btnType === "lastPage") {
      setfilterData({
        ...filterData,
        Page: totalPages,
      });
    } else if (btnType === "movePrev") {
      setfilterData({
        ...filterData,
        Page: parseInt(
          filterData?.Page !== 0 ? filterData?.Page - 1 : filterData?.Page,
          10
        ),
      });
    } else if (btnType === "moveNext") {
      setfilterData({
        ...filterData,
        Page: parseInt(filterData?.Page + 1, 10),
      });
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setfilterData({
      ...filterData,
      PageSize: event.target.value,
      Page: parseInt(1, 10),
    });
  };

  const isSelected = (AgreementNumber) =>
    selected.indexOf(AgreementNumber) !== -1;

  useEffect(() => {
    var toolbar = document.getElementById("tableToolbar");
    if (toolbar !== null) {
      if (selected.length > 0) {
        toolbar.style.display = "flex";
      }

      if (selected.length === 0) {
        toolbar.style.display = "none";
      }
    }
  }, [selected]);

  var options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  var keys = [];
  headCells.forEach((headCell) => {
    keys.push("row." + headCell.id);
  });

  let stableSortedRows = stableSort(rows || [], getComparator(order, orderBy));

  function sliceRows(stableSortedRows) {
    if (!filterData?.Page && !filterData?.PageSize) {
      return stableSortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );
    } else {
      return stableSortedRows;
    }
  }

  const StyledMenu = withStyles({
    paper: {
      border: "1px solid #d3d4d5",
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
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
  ));

  useEffect(() => {
    selectedList != null && setSelected(selectedList);
  }, [selectedList]);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          sendMessageOnClick={sendMessageOnClick}
          headCells={headCells}
        />
        <TableContainer style={{ borderRadius: "4px" }}>
          <Table
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
            className={
              !rows
                ? `${classes.tableContainer} ${classes.table}`
                : classes.table
            }
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={(e) => {
                handleSelectAllClick(e, keys[0]);
              }}
              onRequestSort={handleRequestSort}
              rowCount={rows?.length || 0}
              headCells={headCells}
              showCb={showCb}
            />

            {rows?.length === 0 ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={headCells.length}>
                    <Typography align="center" variant="h4" color="primary">
                      No records found
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : null}

            {rows ? (
              <TableBody>
                {sliceRows(stableSortedRows).map((row, index) => {
                  const isItemSelected = isSelected(eval(keys[0]));
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const encodedId = Buffer.from(String(eval(keys[0]))).toString(
                    "base64"
                  );
                  return (
                    <TableRow
                      hover
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      {!showCb ? null : (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            onClick={(event) =>
                              handleClick(event, eval(keys[0]))
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                          />
                        </TableCell>
                      )}

                      <TableCell component="th" id={labelId} scope="row">
                        {keys[0] === "row.CustomerId" ? (
                          <Link
                            name="CustomerDetails"
                            style={{
                              color: "black",
                            }}
                            to={{
                              pathname: `/CustomerDetails/${encodedId}`,
                              customerId: eval(keys[0]),
                            }}
                          >
                            {eval(keys[1])}
                          </Link>
                        ) : keys[0] === "row.ReserveId" ? (
                          <Link
                            style={{
                              color: "black",
                            }}
                            to={`/ReservationDetails/${encodedId}`}
                          >
                            {eval(keys[1])}
                          </Link>
                        ) : keys[0] === "row.AgreementId" ? (
                          <Link
                            style={{
                              color: "black",
                            }}
                            to={`/AgreementDetails/${encodedId}`}
                          >
                            {eval(keys[1])}
                          </Link>
                        ) : keys[0] === "row.VehicleId" ? (
                          <Link
                            name="VehicleDetails"
                            style={{
                              color: "black",
                            }}
                            to={{
                              pathname: `/VehicleDetails/${encodedId}`,
                              vehicleId: eval(keys[0]),
                            }}
                          >
                            {eval(keys[1])}
                          </Link>
                        ) : (
                          eval(keys[1])
                        )}
                      </TableCell>

                      {keys.map((e, index) => {
                        if (e.match(new RegExp(`VehicleStatus`, "g"))) {
                          return (
                            <TableCell
                              key={index}
                              align="left"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={eval(e)}
                                variant="filled"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  backgroundColor:
                                    row.VehicleStatus === "Available"
                                      ? "#66a103"
                                      : row.VehicleStatus === "Sold"
                                      ? "#9C6137"
                                      : row.VehicleStatus === "Accident"
                                      ? "red"
                                      : row.VehicleStatus === "On Rent"
                                      ? "#ff6600"
                                      : row.VehicleStatus === "In Repair"
                                      ? "#008db0"
                                      : !row.VehicleStatus
                                      ? "#FFF"
                                      : "#000",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        } else if (
                          e.match(new RegExp(`ReservationStatus`, "g"))
                        ) {
                          return (
                            <TableCell
                              key={index}
                              align="left"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={row.ReservationStatusName}
                                variant="outlined"
                                style={{
                                  border: "none",
                                  width: "100%",
                                  backgroundColor:
                                    row.ReservationStatusName === "Open"
                                      ? "#66a103"
                                      : row.ReservationStatusName === "Canceled"
                                      ? "red"
                                      : row.ReservationStatusName ===
                                        "Check Out"
                                      ? "#ff6600"
                                      : row.ReservationStatusName === "New"
                                      ? "#9C6137"
                                      : "#008db0",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        } else if (
                          e.match(new RegExp(`AgreementStatusName`, "g")) ||
                          e.match(new RegExp(`Status`, "gi")) ||
                          e.match(new RegExp(`isSuccess`, "g"))
                        ) {
                          return (
                            <TableCell
                              key={index}
                              align="center"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={
                                  eval(e) === 0 || eval(e) === 1
                                    ? eval(e) === 0
                                      ? "False"
                                      : "True"
                                    : eval(e) === true || eval(e) === false
                                    ? eval(e) === false
                                      ? "Unsuccessful"
                                      : "Successful"
                                    : String(eval(e))
                                }
                                variant="outlined"
                                style={{
                                  border: "none",
                                  width: "8rem",
                                  backgroundColor:
                                    row.AgreementStatusName === "Open"
                                      ? "#66a103"
                                      : row.AgreementStatusName === "Close"
                                      ? "red"
                                      : row.AgreementStatusName ===
                                        "Pending Payment"
                                      ? "#ff6600"
                                      : row.AgreementStatusName ===
                                        "Pending Deposit"
                                      ? "#008db0"
                                      : row.status === "Open"
                                      ? "#66a103"
                                      : row.status === "Close"
                                      ? "red"
                                      : row.status === 0
                                      ? "red"
                                      : row.status === 1
                                      ? "#66a103"
                                      : row.isSuccess === true
                                      ? "#66a103"
                                      : row.isSuccess === false
                                      ? "red"
                                      : "#9C6137",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        } else if (e.match(new RegExp(`isMandatory`, "g"))) {
                          return (
                            <TableCell
                              key={index}
                              align="left"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={
                                  eval(e) === true || eval(e) === false
                                    ? eval(e) === false
                                      ? "False"
                                      : "True"
                                    : String(eval(e))
                                }
                                variant="outlined"
                                style={{
                                  border: "none",
                                  width: "8rem",
                                  backgroundColor:
                                    row.isMandatory === true
                                      ? "#66a103"
                                      : row.isMandatory === false
                                      ? "red"
                                      : "#9C6137",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        } else if (
                          e.match(new RegExp(`isReservationEmail`, "g"))
                        ) {
                          return (
                            <TableCell
                              key={index}
                              align="left"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={
                                  eval(e) === true || eval(e) === false
                                    ? eval(e) === false
                                      ? "False"
                                      : "True"
                                    : String(eval(e))
                                }
                                variant="outlined"
                                style={{
                                  border: "none",
                                  width: "8rem",
                                  backgroundColor:
                                    row.isReservationEmail === true
                                      ? "#66a103"
                                      : row.isReservationEmail === false
                                      ? "red"
                                      : "#9C6137",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        } else if (e.match(new RegExp(`isActive`, "g"))) {
                          return (
                            <TableCell
                              key={index}
                              align="left"
                              className={`${classes.statusCell}`}
                            >
                              <Chip
                                label={
                                  eval(e) === true || eval(e) === false
                                    ? eval(e) === false
                                      ? "False"
                                      : "True"
                                    : String(eval(e))
                                }
                                variant="outlined"
                                style={{
                                  border: "none",
                                  width: "8rem",
                                  backgroundColor:
                                    row.isActive === true
                                      ? "#66a103"
                                      : row.isActive === false
                                      ? "red"
                                      : "#9C6137",
                                  color: "#FFF",
                                }}
                              />
                            </TableCell>
                          );
                        }

                        // if (
                        //   e.match(new RegExp(`checkIn`, "gi")) ||
                        //   e.match(new RegExp(`checkOut`, "gi")) ||
                        //   (e.match(new RegExp(`date`, "gi")) &&
                        //     keys[0] !== "row.ruleId")
                        // ) {
                        //   return (
                        //     <TableCell align="left" key={index}>
                        //       <div>
                        //         {eval(e)
                        //           ? formatDate(Date.parse(eval(e))) ||
                        //             t("date", { value: Date.parse(eval(e)) })
                        //           : "-"}
                        //       </div>
                        //       <div>
                        //         {eval(e)
                        //           ? formatTime(
                        //               Date.parse(eval(e)),
                        //               isStandardUnit
                        //             ) ||
                        //             t("time", {
                        //               value: Date.parse(eval(e)),
                        //             })
                        //           : ""}
                        //       </div>
                        //     </TableCell>
                        //   );
                        // }

                        // if (e.match(new RegExp(`date`, "gi"))) {
                        //   return (
                        //     <TableCell align="left" key={index}>
                        //       {eval(e)
                        //         ? formatDate(Date.parse(eval(e))) ||
                        //           t("date", { value: Date.parse(eval(e)) })
                        //         : "-"}
                        //     </TableCell>
                        //   );
                        // }

                        if (e.match(new RegExp("MoreOptionsMenu", "g"))) {
                          return (
                            <TableCell key={index} align="center">
                              <MoreHorizIcon
                                onClick={(e) => {
                                  if (getRowData) {
                                    getRowData(row);
                                  }
                                  handleClickOpenMoreOption(e, eval(keys[0]));
                                }}
                              />
                              {MoreOptionsMenu}
                            </TableCell>
                          );
                        }

                        // if (e.match(new RegExp(`locationExtra`, "g"))) {
                        //   return (
                        //     <TableCell key={index} align="center">
                        //       {keys[0] === "row.locationId" ? (
                        //         <IconButton
                        //           color="secondary"
                        //           size="small"
                        //           onClick={(e) => {
                        //             moreBtnClick(e);
                        //             setIdValue(eval(keys[0]));
                        //             setActive(row.active);
                        //           }}
                        //         >
                        //           <MoreHorizIcon />
                        //         </IconButton>
                        //       ) : (
                        //         ""
                        //       )}
                        //       <StyledMenu
                        //         id="long-menu"
                        //         anchorEl={anchorEl}
                        //         keepMounted
                        //         open={Boolean(anchorEl)}
                        //         onClose={moreBtnClose}
                        //         PaperProps={{
                        //           style: {
                        //             minWidth: "10rem",
                        //           },
                        //         }}
                        //         style={{ borderRadius: 20 }}
                        //       >
                        //         <MenuItem
                        //           key={"shareLocation"}
                        //           onClick={() => {
                        //             moreBtnClose();
                        //             setOpenShared(true);
                        //           }}
                        //         >
                        //           <Typography color="secondary" variant="h4">
                        //             Share Locations
                        //           </Typography>
                        //         </MenuItem>
                        //         <MenuItem
                        //           key={"editLocation"}
                        //           onClick={() => {
                        //             moreBtnClose();
                        //             setOpen(true);
                        //           }}
                        //         >
                        //           <Typography color="secondary" variant="h4">
                        //             Edit Location
                        //           </Typography>
                        //         </MenuItem>
                        //         {active && (
                        //           <MenuItem
                        //             key={"deleteLocation"}
                        //             onClick={() => {
                        //               moreBtnClose();
                        //               setOpenDelete(true);
                        //             }}
                        //           >
                        //             <Typography color="error" variant="h4">
                        //               Delete Location
                        //             </Typography>
                        //           </MenuItem>
                        //         )}
                        //         <MenuItem
                        //           key={"uploadImage"}
                        //           onClick={() => {
                        //             moreBtnClose();
                        //             setOpenUpload(true);
                        //           }}
                        //         >
                        //           <Typography color="secondary" variant="h4">
                        //             Upload Image
                        //           </Typography>
                        //         </MenuItem>
                        //       </StyledMenu>
                        //     </TableCell>
                        //   );
                        // }

                        if (e.match(new RegExp(`description`, "g"))) {
                          return (
                            <TableCell
                              key={index}
                              align={keys[0] === "row.id" ? "center" : "left"}
                              style={{
                                width: keys[0] === "row.id" && "calc(40%)",
                              }}
                            >
                              {eval(e) !== null && eval(e) !== ""
                                ? String(eval(e))
                                : "-"}
                            </TableCell>
                          );
                        }

                        if (e.match(new RegExp(`commission`, "g"))) {
                          return (
                            <TableCell align="right" key={index}>
                              {eval(e) !== null && eval(e) !== ""
                                ? String(eval(e))
                                : "-"}
                            </TableCell>
                          );
                        }

                        if (
                          e !== keys[1] &&
                          !e.match(new RegExp(`id`, "gi")) &&
                          !e.match(new RegExp(`date`, "gi")) &&
                          !e.match(new RegExp(`status`, "gi"))
                        ) {
                          return (
                            <TableCell align="left" key={index}>
                              {eval(e) !== null && eval(e) !== ""
                                ? String(eval(e))
                                : "-"}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            ) : (
              <TableBody style={{ marginTop: 30 }}>
                <TableRow>
                  <TableCell>
                    <CircularProgress
                      color="secondary"
                      disableShrink
                      size={30}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </TableContainer>
        {!filterData?.Page && !filterData?.PageSize && rows && rows.length > 0 && (
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Box style={{ fontSize: "0.9rem", fontWeight: 450 }}>
              Rows per Page
            </Box>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePageWithoutPagination}
              onRowsPerPageChange={handleChangeRowsPerPageWithoutPagination}
              classes={{
                actions: classes.actions,
                caption: classes.caption,
                input: classes.input,
              }}
              style={{ padding: 0 }}
            />
            <Pagination
              count={Math.ceil(rows.length / rowsPerPage)}
              showFirstButton
              showLastButton
              onChange={handleChangePageWithoutPagination}
              page={page + 1}
            />
          </Box>
        )}

        {filterData?.Page && filterData?.PageSize && rows && (
          <Paper>
            <Grid
              container
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Grid item>
                <Typography variant="h6" display="inline">
                  Rows per Page:
                </Typography>
                <NativeSelect
                  disableUnderline
                  style={{
                    backgroundColor: "#fff",
                    marginLeft: 1,
                  }}
                  onChange={(e) => {
                    handleChangeRowsPerPage(e);
                  }}
                  variant="filled"
                  value={filterData?.PageSize}
                >
                  <option value={10} default>
                    10
                  </option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </NativeSelect>
              </Grid>
              <Grid item style={{ margin: "0 1rem" }}>
                <Typography variant="h6" display="inline">
                  Current Page: {filterData?.Page}
                </Typography>
              </Grid>

              {totalPages !== 0 && totalPages > 1 ? (
                <>
                  <Grid item>
                    {filterData?.Page > 1 ? (
                      <IconButton
                        disabled={rows ? false : true}
                        color="primary"
                        component="span"
                        onClick={(e) => {
                          handleChangePage(e, "firstPage");
                        }}
                      >
                        <FirstPageIcon color="secondary" />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item>
                    {filterData?.Page > 1 ? (
                      <IconButton
                        disabled={rows ? false : true}
                        color="primary"
                        component="span"
                        onClick={(e) => {
                          handleChangePage(e, "movePrev");
                        }}
                      >
                        <ArrowBackIosIcon
                          color="secondary"
                          style={{
                            transform: "scale(0.65)",
                          }}
                        />
                      </IconButton>
                    ) : (
                      ""
                    )}
                  </Grid>
                  <Grid item>
                    <Pagination
                      count={totalPages}
                      hidePrevButton
                      hideNextButton
                      page={filterData?.Page}
                      onChange={(e) => {
                        handleChangePage(e, "changePage");
                      }}
                    />
                  </Grid>
                  <Grid item>
                    {filterData?.Page === totalPages ? null : (
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={(e) => {
                          handleChangePage(e, "moveNext");
                        }}
                      >
                        <ArrowForwardIosIcon
                          color="secondary"
                          style={{
                            transform: "scale(0.65)",
                          }}
                        />
                      </IconButton>
                    )}
                  </Grid>
                  <Grid item>
                    {filterData?.Page === totalPages ? null : (
                      <IconButton
                        color="primary"
                        component="span"
                        onClick={(e) => {
                          handleChangePage(e, "lastPage");
                        }}
                      >
                        <LastPageIcon color="secondary" />
                      </IconButton>
                    )}
                  </Grid>
                </>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
        )}
      </Paper>
    </div>
  );
}

EnhancedTable.propTypes = {
  rows: PropTypes.array,
  headCells: PropTypes.array.isRequired,
  filterData: PropTypes.object,
  setfilterData: PropTypes.func,
  showCb: PropTypes.bool.isRequired,
  totalCount: PropTypes.number,
  page: PropTypes.number,
  setPage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  setRowsPerPage: PropTypes.func,
  handleChangePageWithoutPagination: PropTypes.func,
  handleChangeRowsPerPageWithoutPagination: PropTypes.func,
};
