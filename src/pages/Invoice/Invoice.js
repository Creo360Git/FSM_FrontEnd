import React, {
  useState,
  useEffect,
  // useContext
} from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Typography, useTheme, Container } from "@mui/material";
import { useTranslation } from "react-i18next";

import { fetchFilterInvoices, fetchInvoices, filtersToolBar } from "src/redux/Slices/Invoice";
import { useDispatch, useSelector } from "src/redux/Store";
import DataTable from "src/components/Common/DataTable";
import { changePageHeading } from "src/redux/Slices/Common";
import { buildAddress } from "src/components/Controls/formatUtils";
import DashboardLayout from "src/components/Common/Layouts/DashboardLayout";
import {Link}  from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  buttonGridItem: {
    margin: theme.spacing(1),
    textAlign: "center",
  },
  buttonShadow: {
    borderRadius: "2px",
    boxShadow:
      "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",

    "&:hover": {
      boxShadow:
        "0px 3px 1px -1px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
    },
  },
  buttonSmall: {
    padding: theme.spacing(1),
    borderRadius: "5px",
    backgroundColor: theme.palette.background.button,
  },
}));


const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  { label: "Id", value: "INVOICENUM" },
  { label: "Customer Name", value: "NAME" },
  { label: "Due Date", value: "DUEDATE" },
  { label: "Status", value: "STATUS" },
];

const dueOptions = [
  {label: 'All', value: 'All'},
  {label: 'Last 30 Days', value: 'LAST30'},
  {label: 'Current Month', value: 'CURMONTH'},
  {label: 'Previous Month', value: 'PREMONTH'},
  {label: 'Current Year', value: 'CURYEAR'},
]

const toolBar = [
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchInvoices",
  },
  {
    field: "Due",
    type: "select",
    placeholder: "due",
    options: dueOptions,
    initValue: 'All'
  },
  {
    field: "SortBy",
    type: "select",
    placeholder: "sort",
    options: sortByOptions,
    initValue: 'INVOICENUM'
  },
  {
    field: "Filter",
    type: "select",
    placeholder: "filter",
    options: filterOptions,
    initValue: 'All'
  },
  {
    field: 'Start',
    type: 'date',
    placeholder: 'Start Date'
  },
  {
    field: 'End',
    type: 'date',
    placeholder: 'End Date'
  }
];

const Invoice = ({ locations, types }) => {
  const classes = useStyles();

  const theme = useTheme();

  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [idValue, setIdValue] = useState(null);

  const handleClickOpenMoreOption = (event, idValue) => {
    setAnchorEl(event.currentTarget);
    setIdValue(idValue);
  };

  const dispatch = useDispatch()
  const { invoices,  isLoading, filters } = useSelector((state) => state.invoice);

  useEffect(()=>{
    dispatch(changePageHeading('Invoices'))
  },[dispatch])
  // useEffect(() => {
  //   dispatch(fetchInvoices());
  // }, [dispatch]);

  const [rows, setRows] = useState(invoices)
  useEffect(()=>{setRows(invoices)},[invoices])


  const columns = [
    {
      name: "CustomerName",
      label: 'Client',
      render: (row, index) => {
        return(
          <div key={index}>
            <Typography sx={{ color: "black" }}>
              {"#" + (index + 1).toString()}
            </Typography>
            {row.CustomerName || 'Customer'}
          </div>
        )
      }
    },
    {
      name: "DueDate",
      label: 'Date',
      fieldRenderType: 'date'
    },
    {
      name: "Title",
      label: 'Subject',
    },
    {
      name: "Total",
      label: 'Total'
    },
    {
      name: "Balance",
      label: 'Balance'
    },
    {
      name: "ServiceAddress",
      label: 'Service Address',
      isView: false
    },
    {
      name: 'Phone',
      label: 'Phone',
      isView: false
    },
    {
      name: 'Email',
      label: 'Email',
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
      name: "UpdatedDate",
      label: 'Last Updated Date',
      isView: false,
      fieldRenderType: 'date'
    },
  ];



  return (
    <DataTable
      columns={columns}
      rows={invoices}
      setRows={setRows}
      toolBar={toolBar}
      isLoading={isLoading}
      btnTitle={t("buttons.newInvoice")}
      fn={fetchFilterInvoices}
      redirectPath={"/invoices/new"}
      filterUrl='/invoice'
      filtersToolBar={filtersToolBar}
      filters={filters}
    />
  );
};

// const mapStateToProps = (state) => {
//   return {
//     locations: state.lookupLists.locations,
//     types: state.lookupLists.agreementTypes,
//   };
// };

// export default connect(mapStateToProps, null)(Invoice);
export default Invoice;
