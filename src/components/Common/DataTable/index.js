import MUIDataTable, { TableToolbar } from "mui-datatables";
import { TableRow, TableCell, Typography, TableHead, Box } from "@mui/material";
import useTheme from "@mui/styles/useTheme";

import { createTheme, ThemeProvider } from "@mui/material";
import CustomToolbar from "../TabTable/CustomToolbar";

const DataTables = (props) => {
  const { rows, columns, options, title, toolBar, setRows } = props;
  console.log(rows);
  const theme = useTheme();
  const muiTheme = () =>
    createTheme({
      components: {
        MUIDataTableHeadCell: {
          styleOverrides: {
            fixedHeader: {
              color: "black",
              textTransform: "uppercase",
              fontWeight: theme.typography.fontWeightBold,
              backgroundColor: "#fff",
              "@media print": {
                color: "black  !important",
              },
            },
          },
        },
        MuiTableCell: {
          styleOverrides: {
            root: {
              color: "#818EA1",
            },
          },
        },
      },
    });

  const Tool = () => {
    return <CustomToolbar toolBar={toolBar} setRows={setRows} rows={rows} />;
  };

  return (
    <ThemeProvider theme={muiTheme()}>
      <CustomToolbar toolBar={toolBar} setRows={setRows} rows={rows} />
      <MUIDataTable
        title={title}
        data={rows}
        columns={columns}
        options={options}
        // components={{
        //     TableToolbar: Tool
        // }}
      />
    </ThemeProvider>
  );
};

export default DataTables;
