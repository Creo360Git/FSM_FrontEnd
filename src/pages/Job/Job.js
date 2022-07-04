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
    placeholder: "searchJobs",
  },
  {
    field: "Due",
    type: "select",
    placeholder: "due",
    options: sortByOptions,
  },
  {
    field: "SortBy",
    type: "select",
    placeholder: "sort",
    options: sortByOptions,
  },
  {
    field: "Type",
    type: "select",
    placeholder: "type",
    options: filterOptions,
  },
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchJobs",
  },
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchJobs",
  },
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchJobs",
  },
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchJobs",
  },
];

const Job = () => {

  const [rows, setRows] = useState([
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
      date: "2021-11-10T19:40:00",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
      date: "2021-11-10T19:40:00",
    },
    {
      CustomerName: "e",
      Title: " f",
      Phone: "4534",
      Email: "f",
      Requested: "34",
      date: "2021-11-10T19:40:00",
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
      label: "Client",
    },
    {
      name: "Title",
      label: "title / property",
    },
    {
      name: "date",
      label: "next visit / schedule",
      fieldRenderType: "date",
    },
    {
        name: "Title",
        label: "invoicing",
    },
    {
        name: "Requested",
        label: "total",
    },
  ];

  return (
    <DashboardLayout heading="Jobs">
      {/* <Container> */}
      <AddNewButton title="Add new job" redirectPath={"/jobs/new"} />
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

export default Job;
