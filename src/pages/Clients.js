import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
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

const Clients = () => {
  const {t} = useTranslation()

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
      label: t("tableHeadings.lead"),
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
      name: "Address",
      label: t("tableHeadings.address"),
    },
    {
      name: "Phone",
      label: t("tableHeadings.contactDetails"),
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
              {rows[tableMeta.rowIndex].Email} <br />
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "carbs",
      label: t("tableHeadings.status")
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
        <AddNewButton title={t("buttons.addNewClient")} handleClick={handleOpen} />
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
