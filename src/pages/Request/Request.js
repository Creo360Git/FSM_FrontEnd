import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useTranslation } from "react-i18next";
import { fetchFilterRequests, fetchRequests, filtersToolBar } from "src/redux/Slices/Request";
import { useDispatch, useSelector } from "src/redux/Store";
import DataTable from "src/components/Common/DataTable";
import { buildAddress } from "src/components/Controls/formatUtils";

const filterOptions = [
  { label: "All", value: "All" },
  { label: "Leads and Active", value: "Leads and Active" },
  { label: "Leads", value: "Leads" },
  { label: "Active", value: "Active" },
  { label: "Archived", value: "Archived" },
];

const sortByOptions = [
  {label: 'Id', value: 'RequestNum'},
  { label: "First Name", value: "first" },
  { label: "Last Name", value: "Last" },
  { label: "Recent Active", value: "recent" },
];

const toolBar = [
  {
    field: "Parameter",
    type: "search",
    placeholder: "searchRequest",
  },
  {
    field: "SortBy",
    type: "select",
    placeholder: "sort",
    options: sortByOptions,
    initValue: 'RequestNum'
  },
  {
    field: "Filter",
    type: "select",
    placeholder: "filter",
    options: filterOptions,
    initValue: 'All'
  },
];

const Request = () => {
  
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const { requests,  isLoading, filters } = useSelector((state) => state.request);

  // useEffect(() => {
  //   dispatch(fetchRequests());
  // }, [dispatch]);

  const [rows, setRows] = useState(requests)
  useEffect(()=>{setRows(requests)},[requests])

  const columns = [
    {
      name: "CustomerName",
      label: "lead",
    },
    {
      name: "Title",
      label: "title",
    },
    {
      name: "Phone",
      label: "contact",
    },
    {
      name: "CreatedDate",
      label: "requested",
      fieldRenderType: 'date'
    },
    {
      name: "Email",
      label: "Email",
      isView: false
    },
    {
      name: "PhoneNumber",
      label: "PhoneNumber",
      isView: false
    },
    {
      name: "Type",
      label: "Type",
      isView: false
    },
    {
      name: "AppointmentDate",
      label: "Appointment Date",
      isView: false,
      fieldRenderType: 'date'
    },
    {
      name: 'Address',
      label: 'Customer Address',
      isView: false,
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
      name: "Description",
      label: "Description",
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
    <DashboardLayout heading="Requests">
      {/* <Container> */}
      <DataTable
        columns={columns}
        rows={requests}
        setRows={setRows}
        toolBar={toolBar}
        isLoading={isLoading}
        btnTitle={t("buttons.newRequest")}
        fn={fetchFilterRequests}
        redirectPath={"/requests/new"}
        filterUrl='/request'
        filtersToolBar={filtersToolBar}
        filters={filters}
      />
      {/* </Container> */}
    </DashboardLayout>
  );
};

export default Request;
