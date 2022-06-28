import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import MuiDataTable from "../../components/Common/TabTable/MuiDataTable";
import AddNewButton from "../../components/Controls/AddNewButton";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useTranslation } from "react-i18next";

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
    placeholder: "searchRequest",
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

const Request = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePageWithoutPagination = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPageWithoutPagination = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const [rows, setRows] = useState([
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "9",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "10",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "11",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "12",
    },
  ]);

  const columns = [
    {
      name: "CustomerName",
      label: "lead",
      options: {
        customHeadLabelRender: (columnMeta) => {
          return (
            <span>
              <Typography
                align={
                  "left"
                }
              >
                {columnMeta.label}
              </Typography>
            </span>
          );
        },
        customBodyRender: (value, tableMeta) => {
          return (
            <div key={tableMeta.rowIndex}>
              <Typography sx={{ color: "black" }}>
                {"#" + (tableMeta.rowIndex + 1).toString()}
              </Typography>
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "Title",
      label: "title",
    },
    {
      name: "Phone",
      label: "contact",
      options: {
        customHeadLabelRender: (columnMeta) => {
          return (
            <span>
              <Typography
                align={
                  "left"
                }
              >
                {columnMeta.label}
              </Typography>
            </span>
          );
        },
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {value} <br />
              {rows[tableMeta.rowIndex].Email}
            </div>
          );
        },
      },
    },
    {
      name: "Requested",
      label: "requested",
    },
  ];

  return (
    <DashboardLayout heading="Request">
      {/* <Container> */}
      <AddNewButton title="Add new request" redirectPath={"/request/new"} />
      <MuiDataTable
        headers={columns}
        data={rows}
        setData={setRows}
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
      {/* </Container> */}
    </DashboardLayout>
  );
};

export default Request;
