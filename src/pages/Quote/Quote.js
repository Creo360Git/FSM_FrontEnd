import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useTranslation } from "react-i18next";
import { fetchFilterQuotes, fetchQuotes, filtersToolBar } from "src/redux/Slices/Quote";
import { useDispatch, useSelector } from "src/redux/Store";
import DataTable from "src/components/Common/DataTable";
import { buildAddress } from "src/components/Controls/formatUtils";
import { changePageHeading } from "src/redux/Slices/Common";

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  { label: "Quote Id", value: "QUOTENUM" },
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
    placeholder: "searchQuotes",
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
    initValue: 'QUOTENUM'
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
const Request = () => {
  
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const { quotes,  isLoading, filters } = useSelector((state) => state.quote);

  useEffect(()=>{
    dispatch(changePageHeading('Quotes'))
  },[dispatch])
  // useEffect(() => {
  //   dispatch(fetchQuotes());
  // }, [dispatch]);

  const [rows, setRows] = useState(quotes)
  useEffect(()=>{setRows(quotes)},[quotes])

  const columns = [
    {
      name: "CustomerName",
      label: "Client",
    },
    {
      name: "Title",
      label: "title",
      isView: false
    },
    {
      name: "CreatedDate",
      label: "Quoted On",
      fieldRenderType: 'date'
    },
    {
      name: 'Address',
      label: 'Address',
      render: (row, index) => {
        return(
          <div key={index}>
            {buildAddress({
              AddressLine1: row?.AddressLine1, 
              AddressLine2: row?.AddressLine2, 
              City: row?.City,
              State: row?.State,
              Country: row?.Country,
              ZipCode: row?.ZipCode
            })}
          </div>
        )
      }
    },
    {
      name: 'Total',
      label: 'Total'
    },
    {
      name: "Email",
      label: "Email",
      isView: false
    },
    {
      name: "PhoneNumber",
      label: "Phone Number",
      isView: false
    },
    {
      name: "QuoteDescription",
      label: "Quote Description",
      isView: false
    },
    {
      name: "CreatedBy",
      label: 'Created By',
      isView: false
    },
    {
      name: "IsActive",
      label: t("tableHeadings.status"),
      fieldRenderType: 'status',
      isView: false
    },
  ];

  return (
    <DataTable
      columns={columns}
      rows={quotes}
      setRows={setRows}
      toolBar={toolBar}
      isLoading={isLoading}
      btnTitle={t("buttons.newQuote")}
      fn={fetchFilterQuotes}
      redirectPath={"/quotes/new"}
      filterUrl='/quote'
      filtersToolBar={filtersToolBar}
      filters={filters}
    />
  );
};

export default Request;
