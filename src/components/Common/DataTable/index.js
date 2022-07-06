import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Card from '@mui/material/Card';
import { Typography, Chip, Fab, Stack, TableFooter, Pagination, TablePagination, Divider, Button, ButtonGroup, CircularProgress } from '@mui/material';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import { makeStyles } from "@mui/styles";
import {useMediaQuery} from '@mui/material';
import {useTheme} from '@mui/material';
import CsvExport from './CsvExport';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import ColumnViewer from './ColumnViewer';
import TableHeader from './TableHeader';
import { fDateShort, fDateShortTime, formatText } from 'src/components/Controls/formatUtils';
import CustomToolbar from '../TabTable/CustomToolbar';
import AddNewButton from 'src/components/Controls/AddNewButton';
import AddCircle from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    actions: {
        display: "none",
    },
    caption: {
        display: "none",
    },
    input: {
        marginLeft: -24,
    },
    tableCol: {
        color: "rgba(0, 0, 0, 0.87)",
        fontWeight: 525,
        fontSize: "1rem",
    },
    tableIdCol: {
        cursor: "pointer",
        color: "rgb(3, 25, 129)",
        fontWeight: 600,
    },
    tableDateCol: {
        color: "red",
    },
}));


export default function DataTable(
    {
        columns, 
        rows,
        rowsPerPageOptions = [10, 20, 30],
        toolBar,
        filename,
        setRows,
        isLoading,
        handleBtnClick,
        btnTitle,
        redirectPath='#',
        filterUrl,
        fn
    }
) {
    const classes = useStyles()
    const theme = useTheme()
    const isUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
    const handleChangePage = (event, newPage) => {
        setPage(newPage -1);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const [renderColumns, setRenderColumns] = useState(columns.filter((col)=>typeof col.isView === 'boolean' ? col.isView : true))
    const handleClickExportCsv = () => {
        CsvExport(renderColumns,rows, filename)
    }
    return (
        <React.Fragment>
            <Stack direction='row' justifyContent='flex-end'>
                <ButtonGroup size='medium' >
                    <Button
                        variant="contained"
                        sx={{ mr: 1, textTransform: "capitalize" }}
                        onClick={handleClickExportCsv}
                        size='medium'
                        startIcon={<DocumentScannerIcon  />}
                    >
                        Export as csv
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ textDecoration: "none", mr: 1, textTransform: "capitalize" }}
                        size='medium'
                        startIcon={<AddCircle  />}
                        onClick={handleBtnClick}
                        component={Link}
                        to={redirectPath}
                    >
                        {btnTitle}
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleClick}
                        size='medium'
                    >
                        <VerticalSplitIcon  />
                    </Button>
                </ButtonGroup>
            </Stack>
            <ColumnViewer anchorEl={anchorEl} setAnchorEl={setAnchorEl} columns={columns} setRenderColumns={setRenderColumns} />
            {toolBar?.length > 0 && (
                <CustomToolbar filterUrl={filterUrl} toolBar={toolBar} rows={rows} setRows={setRows} fn={fn} />
            )}
            <TableContainer component={Card} sx={{boxShadow: 2}}>
                <Table sx={{ minWidth: isUpMd ? 650 : '' }} aria-label="simple table">
                    { isUpMd ? 
                    <React.Fragment>
                        <TableHeader columns={renderColumns} />
                        
                        <TableBody>
                        { isLoading ? 
                        <TableRow ><TableCell align='center'  colSpan={renderColumns.length}><CircularProgress color="primary" disableShrink size={30} /></TableCell></TableRow>
                        :
                            rows.length > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    {
                                        renderColumns?.map((column, dataIndex) => (
                                            <TableCell 
                                                key={dataIndex}
                                                align={!!column.bodyDataAlign ? column.bodyDataAlign : 'left'}
                                            >
                                                {
                                                    !!column.fieldRenderType ? 
                                                        column.fieldRenderType === 'chip' ? 
                                                            <Chip
                                                                label={
                                                                    row[column.name] &&
                                                                    formatText(row[column.name])
                                                                }
                                                                variant="outlined"
                                                                style={{
                                                                    width: "100%",
                                                                    border: "none",
                                                                    backgroundColor:
                                                                    row[column.name] === "New"
                                                                        ? "#66a103"
                                                                        : row[column.name] === "Close"
                                                                        ? "red"
                                                                        : "orange",
                                                                    color: "#FFF",
                                                                }}
                                                            />
                                                        : 
                                                            column.fieldRenderType === 'status' ? 
                                                                <Chip
                                                                    label={
                                                                        row[column.name] &&
                                                                        formatText(row[column.name] ? 'true' : 'false')
                                                                    }
                                                                    variant="outlined"
                                                                    style={{
                                                                        width: "100%",
                                                                        border: "none",
                                                                        backgroundColor:
                                                                        row[column.name]
                                                                            ? "#66a103"
                                                                            : "red",
                                                                        color: "#FFF",
                                                                    }}
                                                                />
                                                            :
                                                            column.fieldRenderType === 'date' ? 
                                                                fDateShort(row[column.name]) : column.fieldRenderType === 'dateTime' ? 
                                                                fDateShortTime(row[column.name]) : ''
                                                    : 
                                                        !!column.render ? column.render(row, index) : row[column.name] || '-'
                                                }
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))
                            : 
                            <TableRow ><TableCell align='center' sx={{color: theme.palette.primary.main}}  colSpan={renderColumns.length}>No records found</TableCell></TableRow>
                            }
                        </TableBody>
                        
                    </React.Fragment>
                    : 
                        <TableBody style={{width: '100%'}}>
                        { isLoading ? 
                            <TableRow ><TableCell align='center'  colSpan={renderColumns.length}><CircularProgress color="primary" disableShrink size={30} /></TableCell></TableRow>
                        :
                            rows.length > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index)=>(
                                <React.Fragment>
                                    {
                                        renderColumns.map((column, id)=>(
                                            <TableRow key={index+id}>
                                                <TableCell>{column.label}</TableCell>
                                                <TableCell 
                                                    key={index}
                                                    align={!!column.bodyDataAlign ? column.bodyDataAlign : 'left'}
                                                >
                                                    {
                                                        !!column.fieldRenderType ? 
                                                            column.fieldRenderType === 'chip' ? 
                                                                <Chip
                                                                    label={
                                                                        row[column.name] &&
                                                                        formatText(row[column.name])
                                                                    }
                                                                    variant="outlined"
                                                                    style={{
                                                                        width: "100%",
                                                                        border: "none",
                                                                        backgroundColor:
                                                                        row[column.name] === "New"
                                                                            ? "#66a103"
                                                                            : row[column.name] === "Close"
                                                                            ? "red"
                                                                            : "orange",
                                                                        color: "#FFF",
                                                                    }}
                                                                />
                                                            : 
                                                                column.fieldRenderType === 'status' ? 
                                                                <Chip
                                                                    label={
                                                                        row[column.name] &&
                                                                        formatText(row[column.name] ? 'true' : 'false')
                                                                    }
                                                                    variant="outlined"
                                                                    style={{
                                                                        width: "100%",
                                                                        border: "none",
                                                                        backgroundColor:
                                                                        row[column.name]
                                                                            ? "#66a103"
                                                                            : "red",
                                                                        color: "#FFF",
                                                                    }}
                                                                />
                                                            :
                                                            column.fieldRenderType === 'date' ? 
                                                                fDateShort(row[column.name]) : column.fieldRenderType === 'dateTime' ? 
                                                                fDateShortTime(row[column.name]) : ''
                                                        : 
                                                            !!column.render ? column.render(row, id) : row[column.name] || '-'
                                                    }
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                    <TableRow ><TableCell align='center' sx={{p: 0}} colSpan={2}><Divider  key={index} /></TableCell></TableRow>
                                </React.Fragment>
                            ))
                            : 
                            <TableRow ><TableCell  align='center' sx={{color: theme.palette.primary.main}} colSpan={renderColumns.length}>No records found</TableCell></TableRow>
                            }
                        </TableBody>
                    }
                </Table>
                <TableFooter style={{display: "flex", justifyContent: "flex-end",}}>
                    <TableRow
                        style={{
                            borderBottomLeftRadius: "5px",
                            borderBottomRightRadius: "5px",
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <TablePagination
                            rowsPerPageOptions={rowsPerPageOptions}
                            count={rows.length || 0}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            classes={{
                                actions: classes.actions,
                                caption: classes.caption,
                                input: classes.input,
                            }}
                            style={{ padding: 6 }}
                            SelectProps={{
                                native: true,
                            }}
                        />

                        <TableCell>
                            <Pagination
                                count={Math.ceil((rows.length || 0) / rowsPerPage)}
                                showFirstButton
                                showLastButton
                                onChange={handleChangePage}
                                page={page + 1}
                            />
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </TableContainer>
        </React.Fragment>
    );
}
