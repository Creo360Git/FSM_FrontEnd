import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import MuiDataTable from "../../components/Common/TabTable/MuiDataTable";
import AddNewButton from "../../components/Controls/AddNewButton";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useTranslation } from "react-i18next";

import DataTable from "src/components/Common/DataTable";
import { fetchJobs, fetchFilterJobs } from "src/redux/Slices/Job";
import { useDispatch, useSelector } from "src/redux/Store";

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  { label: "First Name", value: "NAME" },
  { label: "Job Id", value: "JOBNUM" },
  { label: "Recent Active", value: "recent" },
];

const dueOptions = [
  {label: 'Last 30 Days', value: 'LAST30'},
  {label: 'Current Month', value: 'CURMONTH'},
  {label: 'Previous Month', value: 'PREMONTH'},
  {label: 'Current Year', value: 'CURYEAR'},
]
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
    options: dueOptions,
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
  }
];

const Job = () => {

  const dispatch = useDispatch()
  const { jobs,  isLoading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const [rows, setRows] = useState(jobs)
  useEffect(()=>{setRows(jobs)},[jobs])

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
        name: "Total",
        label: "total",
        render: (row, index) => {
          return(
            row.Total.toString()
          )
        }
    },
    {
      name: "StartDate",
      label: 'Start Date',
      isView: false,
      fieldRenderType: 'date'
    },
    {
      name: "EndDate",
      label: 'End Date',
      isView: false,
      fieldRenderType: 'date'
    },
    {
      name: "Instruction",
      label: 'Instruction',
      isView: false
    },
    {
      name: "CreatedDate",
      label: 'Created Date',
      isView: false,
      fieldRenderType: 'date'
    },
    {
      name: "CreatedBy",
      label: 'Created By',
      isView: false
    },
    {
      name: 'IsScheduled',
      label: 'is scheduled',
      fieldRenderType: 'status'
    },
    {
      name: "IsActive",
      label: 'Is active',
      fieldRenderType: 'status'
    },
  ];

  return (
    <DashboardLayout heading="Jobs">
      {/* <Container> */}
      <DataTable
        columns={columns}
        rows={jobs}
        setRows={setRows}
        toolBar={toolBar}
        isLoading={isLoading}
        btnTitle={'Add new job'}
        redirectPath={"/jobs/new"}
        filterUrl='/job'
        fn={fetchFilterJobs}
      />
      {/* </Container> */}
    </DashboardLayout>
  );
};

export default Job;
