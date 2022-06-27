import React, {useState} from 'react'
import { 
    Stack 
} from '@mui/material'
import Edit from '@mui/icons-material/Edit'
import Delete from '@mui/icons-material/Delete'
import FileUploadArea from '.'



const PreviewImage = ({fileList, setValue, setCustomSnackbarData}) => {
    const [open, setOpen] = useState(false)
    const [index, setIndex] = useState(0)
    const handleDeleteClick = (index) => {
        const newFileList = [...fileList]
        const deletedFile = newFileList.splice(index, 1)
        setValue('fileList', newFileList)
        setCustomSnackbarData({view: true, variant: 'error', message: `File ${deletedFile[0].name} successfully deleted.`})
    }

    const handleEditClick = (index) => {
        setIndex(index)
        setOpen(true)
    }

    return(
        <React.Fragment>
            <FileUploadArea isDialogArea={true} open={open} setOpen={setOpen} setValue={setValue}  fileList={fileList} isEdit= {true} index={index}/>
            {
                fileList.map((item, index)=>{
                    return(
                        <Stack direction={'row'} key={index}>
                            <img
                                src={URL.createObjectURL(item)}
                                key={index}
                                alt='upload'
                                style={{
                                    height: '109px',
                                    width: '100%',
                                    objectFit: 'fill',
                                }}
                            />
                            <Stack direction={'column'} justifyContent={'space-around'} sx={{backgroundColor: '#f4f4f4', p: 1}}>
                                <Edit color="success" onClick={()=>{handleEditClick(index)}} sx={{cursor: 'pointer'}} />
                                <Delete color="error" onClick={()=>{handleDeleteClick(index)}} sx={{cursor: 'pointer'}} />
                            </Stack>
                        </Stack>
                    )
                })
            }
        </React.Fragment>
    )
}
export default PreviewImage 