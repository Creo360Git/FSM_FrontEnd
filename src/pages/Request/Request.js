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
    const [rows, setRows] = useState([
      {
        CustomerName: 'e',
        Title:" f",
        Phone: '4534',
        Email: 'f',
        Requested: '34'
      }
    ]);

    
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


    return (
        <DashboardLayout heading="Request">
            {/* <Container> */}
                <AddNewButton title="Add new request" redirectPath={'/request/new'} />
                <MuiDataTable 
                    headers={columns} 
                    data={rows} 
                    setData={setRows} 
                    toolBar={toolBar} 
                />
            {/* </Container> */}
        </DashboardLayout>
    );
};

export default Request;
