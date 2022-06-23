import React, { useState, useRef } from "react";
import { 
    Typography, 
    Container, 
    Grid, 
    Stack, 
    TextField ,
    FormControlLabel,
    Checkbox,
    FormGroup,
    ButtonGroup,
    Button,
    useMediaQuery,
    Box,
    Card,
    IconButton
} from "@mui/material";
import PreviewList from "./PreviewList";


const FileUploadArea = ({theme, setValue, getValues, fileList}) => {
    const [dragging, setDragging] = useState(false)

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
        const fileListValue= getValues('fileList')
        if (newFile) {
            const updatedList = [...fileListValue, ...newFile];
            setValue('fileList',updatedList);
        }
        
    }

    const fileRemove = (file) => {
        const fileListValue= getValues('fileList')
        const updatedList = [...fileListValue];
        updatedList.splice(fileListValue.indexOf(file), 1);
        setValue('fileList',updatedList);
    }

    return(
        <>
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
            
                {/* <Typography variant='body1' component='span'>
                    <strong>Supported Files</strong>
                </Typography>
                <Typography variant='body2' component='span'>
                    JPG, JPEG, PNG
                </Typography> */}
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
        </>
    )
}
export default FileUploadArea