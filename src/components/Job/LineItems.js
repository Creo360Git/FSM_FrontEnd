import React, {useState, useEffect} from "react"
import { 
    InputAdornment,
    Grid,
    IconButton,
    TextField
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"



const LineItems = ({theme, index, remove, register}) => {
    return(
        <Grid container spacing={2} mt={0.1}>
            <Grid item xs={6}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder='Name'
                    {...register(`LineItems[${index}].name`)}
                    size="small"
                />
                <TextField 
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder='Description'
                    {...register(`LineItems[${index}].describtion`)}
                    size="small"
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder='1'
                    {...register(`LineItems[${index}].qty`)}
                    size="small"
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder='0.00'
                    {...register(`LineItems[${index}].unitPrice`)}
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField 
                    fullWidth
                    variant="outlined"
                    placeholder='0.00'
                    {...register(`LineItems[${index}].total`)}
                    size="small"
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                    }}
                />
                {
                    <Grid item xs={1} alignItems='flex-start'>
                        <IconButton aria-label="delete" onClick={() => remove(index)} sx={{color: theme.palette.common.danger}}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                } 
            </Grid>
        </Grid>
    )
}
export default LineItems