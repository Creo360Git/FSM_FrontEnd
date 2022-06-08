import {
    Stack,
    Button,
    Typography
} from "@mui/material"
import {Link} from 'react-router-dom'
import { useTheme } from "@emotion/react";


const AddNewButton = (props) => {
    const theme = useTheme()
    const {title ='Add New', redirectPath ='#', handleClick, ...rest} = props
    return(
        <Stack direction="row" alignItems="center" justifyContent="flex-end" mb={2}>
            <Button
                variant="contained"
                component={Link}
                to={redirectPath}
                // sx={{backgroundColor: theme.palette.primary.light}}
                onClick={handleClick}
                {...rest}
            >
                <Typography variant='h6' sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightRegular}}>{title}</Typography>
            </Button>
		</Stack>
    )
}
export default AddNewButton