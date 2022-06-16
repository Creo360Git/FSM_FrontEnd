import React, { useState, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import {
  Box,
  Chip,
  IconButton,
  TablePagination,
  Typography,
  Pagination,
  TableFooter,
  TableRow,
  TableCell,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import clsx from "clsx";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { formatDate, formatTime } from "../../../services/datetime";
import { formatText } from "../../Controls/formatUtils";
// import { useFeature } from "../../auth/permissions";
import { Buffer } from "buffer";
import CustomToolbar from "./CustomToolbar";

const useStyles = makeStyles((theme) => ({
  actions: {
    display: "none",
  },
  caption: {
    display: "none",
  },
  input: {
    marginLeft: -24,
  },
  tableCol: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: 525,
    fontSize: "1rem",
  },
  tableIdCol: {
    cursor: "pointer",
    color: "rgb(3, 25, 129)",
    fontWeight: 600,
  },
  tableDateCol: {
    color: "red",
  },
}));

const MuiDataTable = (props) => {
  const {
    headers,
    data,
    // count,
    // rowsPerPage,
    // page,
    // setPage,
    // setRowsPerPage,
    // onPageChange,
    // onRowsPerPageChange,
    isDownload,
    isPrint,
    toolBar,
    setData
  } = props;

  const classes = useStyles();

  const history = useNavigate();

  const { t } = useTranslation();

  const isStandardUnit = false;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState(data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
  useEffect(()=>{setRows(data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))},[page, rowsPerPage,data])

  useEffect(() => {
    if (headers?.length > 0) {
      let columnsData = [];

      headers.forEach((column) => {
        if (!column?.options) {
          const columnObj = {
            name: column.name,
            label: column.label,
            options: {
              filter: column?.filter || false,
              customHeadLabelRender: (columnMeta) => {
                return (
                  <span>
                    <Typography
                      align={
                        column?.headerLabelAlign
                          ? column?.headerLabelAlign
                          : "left"
                      }
                    >
                      {columnMeta.label}
                    </Typography>
                  </span>
                );
              },
              customBodyRenderLite: (dataIndex) => {
                return (
                  <span
                    className={
                      column?.fieldRenderType === "id"
                        ? clsx(classes.tableCol, classes.tableIdCol)
                        : column?.fieldRenderType === "expiryDate" &&
                          moment(rows[dataIndex]?.expiryDate).format(
                            "YYYY-MM-DD"
                          ) < moment().format("YYYY-MM-DD")
                        ? clsx(classes.tableCol, classes.tableDateCol)
                        : classes.tableCol
                    }
                    onClick={(e) => {
                      if (column?.idOnClick) {
                        const id = String(rows[dataIndex]?.id);
                        const bid = Buffer.from(id).toString("base64");

                        history.push({
                          pathname: `/${column?.idOnClick}/${bid}`,
                          reservationId: rows[dataIndex]?.id || 0,
                          agreementId: rows[dataIndex]?.id || 0,
                        });
                      }
                    }}
                    style={
                      column?.fieldStyles ? { ...column?.fieldStyles } : {}
                    }
                  >
                    {["actionsExpiryDate", "actions"].includes(
                      column?.fieldRenderType
                    ) ? (
                      <Box width="100%" display="flex" justifyContent="center">
                        <IconButton
                          color="secondary"
                          size="small"
                          onClick={
                            column?.actionsOnClick
                              ? (e) =>
                                  column?.actionsOnClick(
                                    e,
                                    column.fieldRenderType ===
                                      "actionsExpiryDate"
                                      ? rows[dataIndex]
                                      : rows[dataIndex]?.id
                                  )
                              : () => {}
                          }
                        >
                          <MoreHorizIcon />
                        </IconButton>

                        {column?.actionsChildren || ""}
                      </Box>
                    ) : ["expiryDate", "date", "datetime"].includes(
                        column?.fieldRenderType
                      ) ? (
                      <>
                        <div>
                          {rows[dataIndex]?.date
                            ? formatDate(rows[dataIndex]?.date) ||
                              t("date", {
                                value: Date.parse(rows[dataIndex]?.date),
                              })
                            : "-"}
                        </div>
                        {column?.fieldRenderType === "datetime" && (
                          <div>
                            {rows[dataIndex]?.date
                              ? formatTime(
                                  Date.parse(rows[dataIndex]?.date),
                                  isStandardUnit
                                ) ||
                                t("time", {
                                  value: Date.parse(rows[dataIndex]?.date),
                                })
                              : "-"}
                          </div>
                        )}
                      </>
                    ) : column?.fieldRenderType === "chip" ? (
                      <>
                        {rows[dataIndex]?.statusName ? (
                          <Chip
                            label={
                              rows[dataIndex]?.statusName &&
                              formatText(rows[dataIndex]?.statusName)
                            }
                            variant="outlined"
                            style={{
                              width: "100%",
                              border: "none",
                              backgroundColor:
                                rows[dataIndex]?.statusName === "New"
                                  ? "#66a103"
                                  : rows[dataIndex]?.statusName === "Close"
                                  ? "red"
                                  : "orange",
                              color: "#FFF",
                            }}
                          />
                        ) : (
                          "-"
                        )}
                      </>
                    ) : (
                      <>{eval(`rows[dataIndex]?.${column.name}`) || "-"}</>
                    )}
                  </span>
                );
              },
            },
          };

          columnsData.push(columnObj);
        } else {
          columnsData.push(column);
        }
      });

      setColumns(columnsData);
    }
  }, [headers, rows]);


  let count = data.length
  const options = {
    viewColumns: false,
    filter: false,
    responsive: "vertical",
    download: isDownload || false,
    serverSide: true,
    print: isPrint || false,
    count: count || 0,
    rowsPerpage: rowsPerPage,
    rowsPerPageOptions: [10, 20, 30],
    selectableRowsHideCheckboxes: false,
    selectableRows: "none",
    selectableRowsHeader: false,
    rowHover: false,
    search: false,
    pagination: false,
    sort: false,
    textLabels: {
      body: {
        noMatch: !data ? (
          <Typography variant="h2" color="primary" align="center">
            <CircularProgress color="secondary" disableShrink size={30} />
          </Typography>
        ) : (
          <Typography variant="h3" color="primary" align="center">
            {t("messages.noRecordsFound")}
          </Typography>
        ),
      },
    },
    customFooter: () => {
      return (
        <TableFooter>
          <TableRow
            style={{
              borderBottomLeftRadius: "5px",
              borderBottomRightRadius: "5px",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              count={count || 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              classes={{
                actions: classes.actions,
                caption: classes.caption,
                input: classes.input,
              }}
              style={{ padding: 6 }}
              SelectProps={{
                native: true,
              }}
            />

            <TableCell>
              <Pagination
                count={Math.ceil((count || 0) / rowsPerPage)}
                showFirstButton
                showLastButton
                onChange={handleChangePage}
                page={page + 1}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      );
    },
    onChangeRowsPerPage: (numberOfRows) => {
      setRowsPerPage(parseInt(numberOfRows));
      setPage(0);
    },
    onChangePage: (currentPage) => {
      setPage(currentPage);
    },
  };

  return (
    <>
      {toolBar?.length > 0 && <CustomToolbar toolBar={toolBar} rows={data} setRows={setRows} />}
      <MUIDataTable data={rows || []} columns={columns} options={options} />
    </>
  );
};

export default MuiDataTable;
