import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import DataTable from "../../components/Common/DataTable";
import AddNewButton from "../../components/Controls/AddNewButton";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";

function createData(CustomerName, Title, Phone, Email, Requested) {
  return {
    CustomerName,
    Title,
    Phone,
    Email,
    Requested,
  };
}

const rows = [
  createData(
    "Cupcake",
    "6351 Fringilla Avenue Gardena Colorado 37547",
    "0768677656",
    "ex@gmail.com",
    4.3
  ),
  createData("Donut", 452, 25.0, 51, 4.9),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
  createData("Honeycomb", 408, 3.2, 87, 6.5),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Jelly Bean", 375, 0.0, 94, 0.0),
  createData("KitKat", 518, 26.0, 65, 7.0),
  createData("Lollipop", 392, 0.2, 98, 0.0),
  createData("Marshmallow", 318, 0, 81, 2.0),
  createData("Nougat", 360, 19.0, 9, 37.0),
  createData("Oreo", 437, 18.0, 63, 4.0),
];

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
    name: "Title",
    label: "title",
  },
  {
    name: "Phone",
    label: "contact",
    options: {
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

const Request = () => {
  return (
    <DashboardLayout heading="Request">
      <Container>
        <AddNewButton title="Add new request" redirectPath={"/request/new"} />
        <DataTable
          columns={columns}
          rows={rows}
          toolBar={toolBar}
          options={{ selectableRows: false, sort: false }}
        />
      </Container>
    </DashboardLayout>
  );
=======
import AddNewButton from "../../components/Common/Button";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";

function createData(CustomerName, Title, Phone, Email, Requested) {
    return {
        CustomerName,
        Title,
        Phone,
        Email,
        Requested,
    };
}

const rows = [
    createData(
        "Cupcake",
        "6351 Fringilla Avenue Gardena Colorado 37547",
        "0768677656",
        "ex@gmail.com",
        4.3
    ),
    createData("Donut", 452, 25.0, 51, 4.9),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
    createData("Honeycomb", 408, 3.2, 87, 6.5),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Jelly Bean", 375, 0.0, 94, 0.0),
    createData("KitKat", 518, 26.0, 65, 7.0),
    createData("Lollipop", 392, 0.2, 98, 0.0),
    createData("Marshmallow", 318, 0, 81, 2.0),
    createData("Nougat", 360, 19.0, 9, 37.0),
    createData("Oreo", 437, 18.0, 63, 4.0),
];

const columns = [
    {
        name: "CustomerName",
        label: "lead",
        options:{
        customBodyRender:(value, tableMeta) => {
        return (
            <div key={tableMeta.rowIndex}>
                <Typography sx={{color: 'black'}}>{"#" + (tableMeta.rowIndex + 1).toString()}</Typography>
                {value}
            </div>
        );
        }
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
        customBodyRender: (value, tableMeta, updateValue) => {
            return (
            <div>
                {value} <br/>
                {rows[tableMeta.rowIndex].Email}
            </div>
            );
        }
        }
    },
    {
        name: "Requested",
        label: "requested",
    },
];

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

const Request = () => {

    return (
        <DashboardLayout heading="Request">
            <Container>
                <AddNewButton title="Add new request" redirectPath={'/request/new'} />
                <DataTable columns={columns} rows={rows} toolBar={toolBar} options={{selectableRows: false, sort: false}} />
            </Container>
        </DashboardLayout>
    );

};

export default Request;
