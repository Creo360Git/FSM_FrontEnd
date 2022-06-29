import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
import { useTranslation } from "react-i18next";

import useFetch from "../hooks/useFetch";

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  { label: "First Name", value: "CLIENTNAME" },
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
  const [data, error, loading] = useFetch('https://localhost:44367/api/v1/Customer?ClientId=1')
 
  const [rows, setRows] = useState(data)
  useEffect(()=>{setRows(data)},[data])

  console.log(rows)
  // const [rows, setRows] = useState([
  //   {
  //     CustomerName: 'e1',
  //     Address:" f",
  //     Phone: '245345',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e2',
  //     Address:" f",
  //     Phone: '657678',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "245345",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "657678",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "245345",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "657678",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "245345",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {
  //     CustomerName: "e",
  //     Address: " f",
  //     Phone: "657678",
  //     Email: "f",
  //     carbs: "g",
  //   },
  //   {

  //     CustomerName: 'e9',
  //     Address:" f",
  //     Phone: '245345',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e10',
  //     Address:" f",
  //     Phone: '657678',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e11',
  //     Address:" f",
  //     Phone: '245345',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e12',
  //     Address:" f",
  //     Phone: '657678',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e13',
  //     Address:" f",
  //     Phone: '245345',
  //     Email: 'f',
  //     carbs: 'g'
  //   },
  //   {
  //     CustomerName: 'e14',
  //     Address:" f14",
  //     Phone: '657678',
  //     Email: 'f',
  //     carbs: 'g14'
  //   }
  // ])
  

  const columns = [
    {
      name: "customerName",
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
      name: "customerAddress",
      label: t("tableHeadings.address"),
    },
    {
      name: "phoneNumber",
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
              {rows[tableMeta.rowIndex]?.email} <br />
              {value}
            </div>
          );
        },
      },
    },
    {
      name: "isActive",
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
            url='https://localhost:44367/api/v1/Customer?ClientId=1'
        />
        {/* </Container> */}
    </DashboardLayout>
  );
};

export default Clients;
