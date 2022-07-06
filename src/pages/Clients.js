import React, { useState, useEffect } from "react";
import { Typography, Container } from "@mui/material";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
import { useTranslation } from "react-i18next";

import { fetchClients, GetClient, fetchFilterClients } from "src/redux/Slices/Client";
import { useDispatch, useSelector } from "src/redux/Store";
import DataTable from "src/components/Common/DataTable";
import { Link } from "react-router-dom";
import { buildAddress } from "src/components/Controls/formatUtils";

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  { label: "Client Name", value: "CLIENTNAME" },
  { label: "Phone", value: "PHONE" },
  { label: "Email", value: "EMAIL" },
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
  const { clients,  isLoading } = useSelector((state) => state.client);
  const { client } = useSelector((state) => state.client);

  useEffect(() => {
    dispatch(fetchClients('/Customer'));
    // dispatch(GetClient(5))
  }, [dispatch]);

  const [rows, setRows] = useState(clients)
  useEffect(()=>{setRows(clients)},[clients])
  

  const columns = [
    {
      name: "CustomerName",
      label: t("tableHeadings.lead"),
      render: (row, index) => {
        return(
          <div key={index}>
            <Typography sx={{ color: "black" }}>
              {"#" + (index + 1).toString()}
            </Typography>
            {row.CustomerName}
          </div>
        )
      }
    },
    {
      name: "CustomerAddress",
      label: t("tableHeadings.address"),
      render: (row, index) => {
        return(
          <div key={index}>
             {row.CustomerAddress ? buildAddress(row.CustomerAddress) : '-'}
          </div>
        )
      }
    },
    {
      name: "PhoneNumber",
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
      name: "IsActive",
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
            fn={fetchFilterClients}
        />
        {/* </Container> */}
    </DashboardLayout>
  );
};

export default Clients;
