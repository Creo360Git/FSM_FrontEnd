import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";

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

const Clients = () => {
  // const [page, setPage] = useState(0);
  // const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleChangePageWithoutPagination = (event, newPage) => {
  //   setPage(newPage - 1);
  // };

  // const handleChangeRowsPerPageWithoutPagination = (event) => {
  //   setRowsPerPage(parseInt(+event.target.value, 10));
  //   setPage(0);
  // };

  const [rows, setRows] = useState([
    {
      CustomerName: 'e1',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e2',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "245345",
      Email: "f",
      carbs: "g",
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "657678",
      Email: "f",
      carbs: "g",
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "245345",
      Email: "f",
      carbs: "g",
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "657678",
      Email: "f",
      carbs: "g",
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "245345",
      Email: "f",
      carbs: "g",
    },
    {
      CustomerName: "e",
      Address: " f",
      Phone: "657678",
      Email: "f",
      carbs: "g",
    },
    {

      CustomerName: 'e9',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e10',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e11',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e12',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e13',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e14',
      Address:" f14",
      Phone: '657678',
      Email: 'f',
      carbs: 'g14'
    }
  ])
  

  const columns = [
    {
      name: "CustomerName",
      label: "lead",
      options: {
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
      name: "Address",
      label: "address",
    },
    {
      name: "Phone",
      label: "contact details",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              {rows[tableMeta.rowIndex].Email} <br />
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "carbs",
      label: "status"
    },
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <DashboardLayout heading="Clients">
        {open && <AddClient open={open} setOpen={setOpen} />}
        {/* <Container> */}
        <AddNewButton title="Add new client" handleClick={handleOpen} />
        <MuiDataTable
            headers={columns}
            data={rows}
            setData={setRows}
            isDownload={false}
            isPrint={false}
            toolBar={toolBar}
        />
        {/* </Container> */}
    </DashboardLayout>
  );
};

export default Clients;
