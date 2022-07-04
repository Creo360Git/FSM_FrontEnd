import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
import { useTranslation } from "react-i18next";

import { fetchClients } from "src/redux/Slices/Client";
import { useDispatch, useSelector } from "src/redux/Store";
import DataTable from "src/components/Common/DataTable";
import { Link } from "react-router-dom";

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

  const dispatch = useDispatch()
  const { clients, isLoading } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const [rows, setRows] = useState(clients)
  useEffect(()=>{setRows(clients)},[clients])
  

  const columns = [
    {
      name: "customerName",
      label: t("tableHeadings.lead"),
      render: (row, index) => {
        return(
          <div key={index}>
            <Typography sx={{ color: "black" }}>
              {"#" + (index + 1).toString()}
            </Typography>
            {row.customerName}
          </div>
        )
      }
    },
    {
      name: "customerAddress",
      label: t("tableHeadings.address"),
    },
    {
      name: "phoneNumber",
      label: t("tableHeadings.contactDetails"),
      render: (row, index) => {
        return(
          <div key={index}>
              {row.phoneList?.length > 0 ? row.phoneList[0] : '-'} <br/>
              {row.email}
          </div>
        )
      }
    },
    {
      name: "createdDate",
      label: 'Created Date',
      isView: false,
      fieldRenderType: 'date'
    },
    {
      name: "createdBy",
      label: 'Created By',
      isView: false
    },
    {
      name: "isActive",
      label: t("tableHeadings.status"),
      fieldRenderType: 'status'
    },
    {
      label: 'Job',
      render: (row, index) => {
        return(
          <Link to='/jobs/new' sx={{textDecoration: "none"}}>Create Job</Link>
        )
      }
    }
  ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <DashboardLayout heading="Clients">
        {open && <AddClient open={open} setOpen={setOpen} />}
        {/* <Container> */}
        <DataTable
            columns={columns}
            rows={clients}
            setRows={setRows}
            toolBar={toolBar}
            isLoading={isLoading}
            btnTitle={t("buttons.addNewClient")}
            handleBtnClick={handleOpen}
        />
        {/* </Container> */}
    </DashboardLayout>
  );
};

export default Clients;
