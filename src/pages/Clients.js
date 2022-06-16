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


  const [rows, setRows]= useState([
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '245345',
      Email: 'f',
      carbs: 'g'
    },
    {
      CustomerName: 'e',
      Address:" f",
      Phone: '657678',
      Email: 'f',
      carbs: 'g'
    }
  ])
  


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
              {rows[tableMeta.rowIndex].Email} <br/>
              {value}
            </div>
          );
        }
      }
    },
    {
      name: "carbs",
      label: "status",
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
				toolBar={toolBar} 
			/>
		{/* </Container> */}
    </DashboardLayout>
  );
};

export default Clients;
