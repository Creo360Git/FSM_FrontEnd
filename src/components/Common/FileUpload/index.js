import React, { useState, useRef } from "react";
import { 
    Typography, 
    Stack, 
    Box,
    Dialog,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import PreviewList from "./PreviewList";
import CustomSnackbar from "./CustomSnackbar";
import PreviewImage from "./PreviewImage";
import { useTheme } from "@emotion/react";


const FileUploadArea = ({setValue, isEdit= false, fileList, isDialogArea= false, index=0, setCustomSnackbarData, open, setOpen }) => {
    const theme= useTheme()
    const [dragging, setDragging] = useState(false)
    const [view, setView] = React.useState(false);
    const [data, setData] = useState({
        variant: '',
        message: ''
    })



    const wrapperRef = useRef(null);
    const onDragEnter = (e) => {
        wrapperRef.current?.classList.add('dragover');
        setDragging(true)
    }
    const onDragLeave = (e) => {
        wrapperRef.current?.classList.remove('dragover');
        setDragging(false)
    }

    const onFileDrop = (e) => {
        const target = e.target;
        if (!target.files) return;

        const newFile = Object.values(target.files).map((file) => file)
        const fileListValue= fileList //getValues('fileList')
        if (newFile && !isEdit) {
            const updatedList = [...fileListValue, ...newFile];
            setView(true);
            setData({variant: 'success', message: newFile.length > 1 ? 'Files successfully added.' : `File ${newFile[0].name} successfully added.`})
            setValue('fileList',updatedList);
            if(isDialogArea){
                handleCloseDialog()
                setCustomSnackbarData({view: view, variant: data.variant, message: data.message})
            }
        }
        if (newFile && isEdit) {
            const newFileList = [...fileList]
            newFileList[index]= newFile[0]
            setView(true);
            setData({variant: 'success', message: newFile.length > 1 ? 'Files successfully updated.' : `File ${newFile[0].name} successfully updated.`})
            setValue('fileList', newFileList)
            if(isDialogArea){
                handleCloseDialog()
                setCustomSnackbarData({view: view, variant: data.variant, message: data.message})
            }
        }
    }

    const fileRemove = (file) => {
        const fileListValue= fileList //getValues('fileList')
        const updatedList = [...fileListValue];
        const deletedFile =updatedList.splice(fileListValue.indexOf(file), 1);
        setView(true);
        setData({variant: 'error', message: `File ${deletedFile[0].name} successfully deleted.`})
        setValue('fileList',updatedList);
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }
    

    return(
        <React.Fragment>
            <CustomSnackbar open={view} setOpen={setView} variant={data.variant} message={data.message} />
            {!isDialogArea ?
                <React.Fragment>
                    <PreviewList fileList={fileList} fileRemove={fileRemove} theme={theme} />
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        sx={{
                            position: 'relative',
                            width: '100%',
                            height: '6rem',
                            border: dragging ? '2px dashed green' : '2px dashed #4267b2',
                            borderRadius: '20px',
                            backgroundColor: dragging ? '#81B622' : '#e9ecff'
                        }}
                        ref={wrapperRef}
                        onDragEnter={onDragEnter}
                        onDragLeave={onDragLeave}
                        onDrop={onDragLeave}
                    >
                        <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center' }}>
                            <Typography sx={{fontWeight: theme.typography.fontWeightBold }}>
                                {'Browse files to upload'}
                            </Typography>
                        </Stack>
                        
                        <input
                            type='file'
                            name={'files'}
                            // onBlur={onBlur}
                            // ref={ref}
                            onChange={onFileDrop}
                            multiple = {true}
                            accept='image/jpg, image/png, image/jpeg'
                            style={{
                                opacity: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                            }}
                        /> 
                    </Box>
                </React.Fragment>
                :
                <Dialog
                    onClose={handleCloseDialog}
                    open={open}
                    scroll="body"
                    maxWidth="sm"
                >
                    <DialogTitle variant='h3' onClose={handleCloseDialog} sx={{textTransform:'uppercase', fontWeight: theme.typography.fontWeightBold, backgroundColor: '#f4f4f4'}}>
                        File upload
                    </DialogTitle>
                    <DialogContent dividers>
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                                position: 'relative',
                                width: '100%',
                                height: '6rem',
                                border: dragging ? '2px dashed green' : '2px dashed #4267b2',
                                borderRadius: '20px',
                                backgroundColor: dragging ? '#81B622' : '#e9ecff'
                            }}
                            ref={wrapperRef}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDrop={onDragLeave}
                        >
                            <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center' }}>
                                <Typography sx={{fontWeight: theme.typography.fontWeightBold }}>
                                    {'Browse files to upload'}
                                </Typography>
                            </Stack>
                            
                            <input
                                type='file'
                                name={'files'}
                                // onBlur={onBlur}
                                // ref={ref}
                                onChange={onFileDrop}
                                multiple = {true}
                                accept='image/jpg, image/png, image/jpeg'
                                style={{
                                    opacity: 0,
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                }}
                            /> 
                        </Box>
                    </DialogContent>
                </Dialog>
            }
        </React.Fragment>
    )
}
export default FileUploadArea