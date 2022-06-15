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
    rowsPerPageOptions = [10, 20, 30],
    isDownload,
    isPrint,
    toolBar,
  } = props;

  const classes = useStyles();

  const history = useNavigate();

  const { t } = useTranslation();

  const isStandardUnit = false;

  const [columns, setColumns] = useState([]);

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
                          moment(data[dataIndex]?.expiryDate).format(
                            "YYYY-MM-DD"
                          ) < moment().format("YYYY-MM-DD")
                        ? clsx(classes.tableCol, classes.tableDateCol)
                        : classes.tableCol
                    }
                    onClick={(e) => {
                      if (column?.idOnClick) {
                        const id = String(data[dataIndex]?.id);
                        const bid = Buffer.from(id).toString("base64");

                        history.push({
                          pathname: `/${column?.idOnClick}/${bid}`,
                          reservationId: data[dataIndex]?.id || 0,
                          agreementId: data[dataIndex]?.id || 0,
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
                                      ? data[dataIndex]
                                      : data[dataIndex]?.id
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
                          {data[dataIndex]?.date
                            ? formatDate(data[dataIndex]?.date) ||
                              t("date", {
                                value: Date.parse(data[dataIndex]?.date),
                              })
                            : "-"}
                        </div>
                        {column?.fieldRenderType === "datetime" && (
                          <div>
                            {data[dataIndex]?.date
                              ? formatTime(
                                  Date.parse(data[dataIndex]?.date),
                                  isStandardUnit
                                ) ||
                                t("time", {
                                  value: Date.parse(data[dataIndex]?.date),
                                })
                              : "-"}
                          </div>
                        )}
                      </>
                    ) : column?.fieldRenderType === "chip" ? (
                      <>
                        {data[dataIndex]?.statusName ? (
                          <Chip
                            label={
                              data[dataIndex]?.statusName &&
                              formatText(data[dataIndex]?.statusName)
                            }
                            variant="outlined"
                            style={{
                              width: "100%",
                              border: "none",
                              backgroundColor:
                                data[dataIndex]?.statusName === "New"
                                  ? "#66a103"
                                  : data[dataIndex]?.statusName === "Close"
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
                      <>{eval(`data[dataIndex]?.${column.name}`) || "-"}</>
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
  }, [headers]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const options = {
    viewColumns: false,
    filter: false,
    responsive: "vertical",
    download: isDownload || false,
    serverSide: true,
    print: isPrint || false,
    count: data?.length || 0,
    rowsPerpage: rowsPerPage,
    rowsPerPageOptions: rowsPerPageOptions,
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
              rowsPerPageOptions={rowsPerPageOptions}
              count={data?.length || 0}
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
                count={Math.ceil((data?.length || 0) / rowsPerPage)}
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
      {toolBar?.length > 0 && <CustomToolbar toolBar={toolBar} />}
      <MUIDataTable
        data={
          data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) ||
          []
        }
        columns={columns}
        options={options}
      />
    </>
  );
};

export default MuiDataTable;
