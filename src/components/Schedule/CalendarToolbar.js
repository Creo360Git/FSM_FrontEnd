import React, {useState, useEffect} from 'react'
import { styled } from '@mui/material/styles'
import { 
    Stack, 
    Divider,
    Button, 
    Tooltip, 
    Typography, 
    IconButton, 
    ToggleButton,
    useMediaQuery,
    ButtonGroup
} from '@mui/material'
import { useTheme } from '@emotion/react';
import { fDate } from '../Controls/formatUtils';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";

const RootStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: theme.spacing(2.5),
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
}));

const viewOptions = [
    { value: 'dayGridMonth', label: 'Month', icon: <ViewModuleIcon width={20} height={20} /> },
    { value: 'timeGridWeek', label: 'Week', icon: <ViewWeekIcon width={20} height={20} /> },
    { value: 'timeGridDay', label: 'Day', icon: <ViewDayIcon width={20} height={20} /> },
    { value: 'listWeek', label: 'List', icon: <ViewAgendaIcon width={20} height={20} /> },
];

const CalendarToolbar = ({ date, view, onToday, onNextDate, onPrevDate, onChangeView }) => {
    const theme = useTheme()
    const isUpXs = useMediaQuery(theme.breakpoints.up('xs'));
    const {t} = useTranslation()

    return(
        <RootStyle>
            {isUpXs && 
                (
                    <Stack direction="row" spacing={0.5}>
                        {viewOptions.map((viewOption) => (
                            <Tooltip key={viewOption.value} title={viewOption.label}>
                                <ToggleButton
                                    value={view}
                                    selected={viewOption.value === view}
                                    onChange={() => onChangeView(viewOption.value)}
                                    sx={{ width: 32, height: 32, padding: 0, border: 0 }}
                                >
                                    {viewOption.icon}
                                </ToggleButton>
                            </Tooltip>
                        ))}
                    </Stack>
                )
            }
        
            <Stack direction="row" alignItems="center" spacing={2}>
                <IconButton onClick={onPrevDate}>
                    <ArrowBackIosIcon width={20} height={20} />
                </IconButton>
    
                <Typography component={'span'} variant="h5">{fDate(date)}</Typography>
    
                <IconButton onClick={onNextDate}>
                    <ArrowForwardIosIcon width={20} height={20} />
                </IconButton>
            </Stack>
    
            {isUpXs && 
                (
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Button  variant="contained" onClick={onToday}>
                            {t("buttons.today")}
                        </Button>
                        <Button variant="contained" endIcon={<ExpandMoreIcon />}>
                            {t("buttons.action")}
                        </Button>
                        <Button variant="contained" endIcon={<ExpandMoreIcon />} >
                            {t("buttons.filter")}
                        </Button>
                    </Stack>
                )
            }
        </RootStyle>
    )
}
export default CalendarToolbar