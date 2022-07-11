import React, {useEffect, useState} from 'react';
import {
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';


const TableHeader = ({columns}) => {
    return(
        <TableHead>
            <TableRow>
                {
                    columns?.map(({name, label, headerLabelAlign, disablePadding}, index)=>{
                        return(
                            <TableCell 
                                padding={disablePadding ? 'none' : 'normal'} 
                                align={!!headerLabelAlign ? headerLabelAlign : 'left'} 
                                key={index}
                            >
                                <Typography sx={{textTransform: 'capitalize'}}>{label}</Typography>
                            </TableCell>
                        )
                    })
                }
            </TableRow>
        </TableHead>
    )
}
export default TableHeader