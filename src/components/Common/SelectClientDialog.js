import React, {useState} from 'react'
import { 
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    Divider,
    TextField,
    Button,
    Grid,
    Radio
} from '@mui/material'
import AddClient from '../Client/AddClient'

const data=[
    {name: 'SND pvt ltd. (John doe)', address: [''], phone: '0778983456', activity: 'Activity 4 minutes ago'},
    {name: 'SND pvt ltd. (John doe)', address: ['', '', '', ''], phone: '0778983456', activity: 'Activity 4 minutes ago'}
]

const SelectClientDialog = ({show, setShow, setClient, theme, title ='request'}) => {
    const handleClose = () => {
        setShow(false)
    }
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        handleClose()
    };
    const handleSelect = (item) => {
        handleClose()
        setClient(item)
    }
    return(
        <>
            {open && <AddClient open={open} setOpen={setOpen} setClientValue={setClient} />}
            <Dialog
                onClose={handleClose}
                open={show}
                scroll="body"
                maxWidth="sm"
            >
                <DialogTitle variant='h3' onClose={handleClose} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                    SELECT OR CREATE A CLIENT
                </DialogTitle>
                <DialogContent dividers>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular, mb: 2}}>
                        {`Which client you would like to create ${title} for ?`}
                    </Typography>
                    <Grid container spacing={2} direction='row' alignItems="center" justify="center">
                        <Grid item xs={5}>
                            <TextField
                                label= 'Search clients...'
                                fullWidth
                                type="text"
                                variant="outlined"
                                size="small"
                                // {...register("LastName")}
                                // error={!!errors.LastName}
                                // helperText={errors.LastName?.message}
                            />
                        </Grid>
                        <Grid item xs='auto'>
                            OR
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant='contained' key="two" sx={{textTransform: 'uppercase', width: '100%'}} onClick={handleOpen}>
                                create new client
                            </Button>  
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogContent dividers sx={{minHeight:'400px'}}>
                    <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightBold, mb: 2, textTransform: 'uppercase'}}>
                        leads
                    </Typography>
                    {
                        data.map((item, index)=>{
                            return(
                                <Grid container onClick={()=>{handleSelect(item)}} spacing={2} key={index} mb={2} sx={{cursor: 'pointer', '&:hover': {background: "#e9ecff"}, borderRadius: 2 }}>
                                    <Grid xs={6} item >
                                        <Grid container item spacing={0} alignItems="center" justify="center">
                                            <Grid xs={12} item>
                                            <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                                {item.name}
                                            </Typography>
                                            </Grid>
                                            <Grid xs='auto' item mr={1}>
                                                {item.address.length + ' ' + 'Property'}
                                            </Grid>
                                            <Divider orientation="vertical" variant="middle" flexItem  style={{height: '10px'}} />
                                            <Grid xs item ml={1}>
                                                {item.phone}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid xs={6} item >
                                        {item.activity}
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
export default SelectClientDialog