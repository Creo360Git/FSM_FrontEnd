import React, { useState } from "react";
import { Typography, Container } from "@mui/material";
import DataTable from "../components/Common/DataTable";
import AddNewButton from "../components/Controls/AddNewButton";
import DashboardLayout from "../components/Common/Layouts/DashboardLayout";
import AddClient from "../components/Client/AddClient";
import MuiDataTable from "../components/Common/TabTable/MuiDataTable";
import { useTranslation } from "react-i18next";

// function createData(CustomerName, Address, Phone, Email, carbs) {
//   return {
//     CustomerName,
//     Address,
//     Phone,
//     Email,
//     carbs,
//   };
// }

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
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePageWithoutPagination = (event, newPage) => {
    setPage(newPage - 1);
  };

  const handleChangeRowsPerPageWithoutPagination = (event) => {
    setRowsPerPage(parseInt(+event.target.value, 10));
    setPage(0);
  };

  const headCells = [
    {
      name: "name",
      label: t("tableHeadings.name"),
    },
    {
      name: "date",
      label: t("tableHeadings.date"),
      fieldRenderType: "date",
    },
    {
      name: "vehicleNo",
      label: t("tableHeadings.vehicleNo"),
    },
    {
      name: "priorityStr",
      label: t("tableHeadings.priority"),
    },
    {
      name: "notes",
      label: t("tableHeadings.notes"),
    },
    {
      name: "assignee",
      label: t("tableHeadings.assignee"),
    },
  ];

  const rows = [
    {
      id: 1287,
      number: null,
      idStr: "1287",
      name: "afvbhdfbvhgg",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-10-14T01:05:00",
      dateStr: null,
      notes: null,
      status: 1,
      statusName: "New",
      assignee: "employeer",
      priorityStr: "Medium",
    },
    {
      id: 1307,
      number: null,
      idStr: "1307",
      name: "sdffd",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-10T19:40:00",
      dateStr: null,
      notes: null,
      statusName: "New",
      assignedTo: null,
      assignee: "ADS",
      priorityStr: "Medium",
    },
    {
      id: 1324,
      number: null,
      idStr: "1324",
      name: "fdfdfd vehicle 3",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-23T07:21:00",
      notes: null,
      status: 2,
      statusName: "InProgress",
      assignee: "FBI",
      priorityStr: "High",
    },
    {
      id: 1325,
      number: null,
      idStr: "1325",
      name: "ddsdffd",
      startDate: null,
      startDateStr: null,
      endDate: null,
      endDateStr: null,
      vehicleNumber: null,
      date: "2021-11-23T09:00:00",
      notes: "ddsd",
      status: 1,
      statusName: "New",
      assignee: "CID",
      priorityStr: "Medium",
    },
  ];
  //   const [rows, setRows] = useState([
  //     createData(
  //       "Cupcake",
  //       "6351 Fringilla Avenue Gardena Colorado 37547",
  //       "0768677656",
  //       "ex@gmail.com",
  //       4.3
  //     ),
  //     createData("Donut", 452, 25.0, 51, 4.9),
  //     createData("Eclair", 262, 16.0, 24, 6.0),
  //     createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  //     createData("Gingerbread", 356, 16.0, 49, 3.9),
  //     createData("Honeycomb", 408, 3.2, 87, 6.5),
  //     createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  //     createData("Jelly Bean", 375, 0.0, 94, 0.0),
  //     createData("KitKat", 518, 26.0, 65, 7.0),
  //     createData("Lollipop", 392, 0.2, 98, 0.0),
  //     createData("Marshmallow", 318, 0, 81, 2.0),
  //     createData("Nougat", 360, 19.0, 9, 37.0),
  //     createData("Oreo", 437, 18.0, 63, 4.0),
  //   ]);

  // const columns = [
  //   {
  //     name: "CustomerName",
  //     label: "lead",
  //     options:{
  //       customBodyRender:(value, tableMeta) => {
  //       return (
  //         <div key={tableMeta.rowIndex}>
  //             <Typography sx={{color: 'black'}}>{"#" + (tableMeta.rowIndex + 1).toString()}</Typography>
  //             {value}
  //         </div>
  //       );
  //       }
  //     },
  //   },
  //   {
  //     name: "Address",
  //     label: "address",
  //   },
  //   {
  //     name: "Phone",
  //     label: "contact details",
  //     options: {
  //       customBodyRender: (value, tableMeta, updateValue) => {
  //         return (
  //           <div>
  //             {rows[tableMeta.rowIndex].Email} <br/>
  //             {value}
  //           </div>
  //         );
  //       }
  //     }
  //   },
  //   {
  //     name: "carbs",
  //     label: "status",
  //   },
  // ];

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <DashboardLayout heading="Clients">
      {open && <AddClient open={open} setOpen={setOpen} />}
      <Container>
        <AddNewButton title="Add new client" handleClick={handleOpen} />
        <MuiDataTable
          headers={headCells}
          data={rows}
          count={rows?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          onPageChange={handleChangePageWithoutPagination}
          onRowsPerPageChange={handleChangeRowsPerPageWithoutPagination}
          isDownload={false}
          isPrint={false}
          toolBar={toolBar}
        />
      </Container>
    </DashboardLayout>
  );
};

export default Clients;
