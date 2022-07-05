import React, {useState, useEffect, useRef} from 'react'
import { 
    Card,
    Grid,
    useMediaQuery,
    Button,
    Icon,
    Stack,
    Drawer,
    Container,
    Dialog
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from '@mui/styles';
import DashboardLayout from '../components/Common/Layouts/DashboardLayout';
import CalendarToolbar from "../components/Schedule/CalendarToolbar"

import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarEventForm from '../components/Schedule/CalendarEventForm';
import EmployeeList from '../components/Schedule/EmployeeList';

import ArrowForward from '@mui/icons-material/ArrowForwardIos';
import ArrowBackward from '@mui/icons-material/ArrowBackIos';
import UnscheduledItems from '../components/Schedule/UnscheduledItems';
import StyleWrapper from '../components/Schedule/StyleWrapper';
import { useTranslation } from 'react-i18next';

import { dispatch } from 'src/redux/Store';
import { useSelector } from 'src/redux/Store';
import { fetchJobs } from 'src/redux/Slices/Job';
// import { jobsLoaded } from 'src/redux/Slices/Job';

const colorOptions = {
    calendarEvent: '#00AB55', // theme.palette.primary.main,
    job: '#1890FF', // theme.palette.info.main,
    request: '#54D62C', // theme.palette.success.main,
    task: '#FFC107', // theme.palette.warning.main,
    visit: '#FF4842', // theme.palette.error.main
    reminder: '#04297A'
};

const useStyles = makeStyles({
    drawer: {
        zIndex: 100,
        position: "relative",
        marginLeft: "auto",
        //width: 200,
        "& .MuiBackdrop-root": {
            display: "none"
        },
        "& .MuiDrawer-paper": {
            // width: 200,
            position: "absolute",
            height: (props) => props.height,
            transition: "none !important"
        }
    }
  });

const Schedule = () => {
    const theme = useTheme()

    const containerRef = useRef()
    const [height, setHeight] = useState(0)
    const classes = useStyles({ height: height })

    const calendarRef = useRef(null);
    const isUpXs = useMediaQuery(theme.breakpoints.up('xs'));
    const isDownLg = useMediaQuery(theme.breakpoints.down('lg'))
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(isUpXs ? 'dayGridMonth' : 'listWeek');
    const [range, setRange] = useState({
        start: '',
        end: ''
    })
    const [color, setColor] = useState(colorOptions.calendarEvent)
    const [open, setOpen] = useState(false)

    useEffect(()=>{
        dispatch(fetchJobs())
    },[dispatch])
    const {jobs} = useSelector((state)=>state.job)

    const [events, setEvents] = useState(jobs)
    useEffect(()=>{
        const arr = jobs.map((job)=>(
            {id: job.JobId, title: job.Title, description: job.Instruction, start: job.StartDate, end: job.EndDate}
        ))
        setEvents(arr)
    },[jobs])

    const [selectedEvent, setSelectedEvent] = useState()
    const [value, setValue] = useState()

    const handleClickDateNext = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.next();
            setDate(calendarApi.getDate());
        }
    };

    const handleClickDatePrev = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.prev();
            setDate(calendarApi.getDate());
        }
    };
    
    const handleClickToday = () => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.today();
            setDate(calendarApi.getDate());
        }
    };

    const handleChangeView = (newView) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
            const calendarApi = calendarEl.getApi();
            calendarApi.changeView(newView);
            setView(newView);
        }
    };

    const handleSelectRange = (data) => {
        const calendarEl = calendarRef.current;
        if (calendarEl) {
          const calendarApi = calendarEl.getApi();
          calendarApi.unselect();
        }
        setRange({start:data.start, end:data.end})
        setOpen(true)
    };

    const handleSelectEvent = (arg) => {
        setSelectedEvent(arg.event.id)
        handleOpenDialog()
    };

    useEffect(()=>{
        setValue(events.find(eve=>eve.id==selectedEvent))
    },[selectedEvent])

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setSelectedEvent()
        setOpen(false)
    }

    const [drawerOpen, setDrawerOpen] = useState(false)
    const toggleDrawer = (openValue) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
      
        setDrawerOpen(openValue)
    }

    useEffect(() => {
        if (drawerOpen) {
            setHeight(containerRef.current.clientHeight - 164);
        } else {
            setHeight(0);
        }
    }, [drawerOpen]);

    const [unscheduleOpen, setUnscheduleOpen] = useState(false)
    const {t} = useTranslation()

    

    
    return(
        <DashboardLayout heading="schedule">
            <Dialog open={unscheduleOpen} onClose={()=>setUnscheduleOpen(false)} maxWidth='xs' sx={{width:'100%'}} scroll='body'>
                <UnscheduledItems maxWidth='100%' initialOpen={true} />
            </Dialog>
            <Card >
                <Grid container spacing={2} ref={containerRef} style={{ position: "relative" }}>
                    <Grid item xs={12}>
                        <CalendarToolbar
                            date={date}
                            view={view}
                            onNextDate={handleClickDateNext}
                            onPrevDate={handleClickDatePrev}
                            onToday={handleClickToday}
                            onChangeView={handleChangeView}
                        />
                        {
                            isDownLg && 
                            (   
                                <Stack alignItems='flex-end' justifyContent='center'>
                                    <Button variant='outlined' onClick={()=>setUnscheduleOpen(true)} sx={{mr: 3}}>{t("buttons.unScheduledItems")}</Button>
                                </Stack>
                            )
                        }
                    </Grid>
                    <Grid item xs='auto' lg={2}>
                        {
                        isDownLg ? 
                            <React.Fragment>
                                {
                                    drawerOpen ? 
                                    <ArrowBackward sx={{boxShadow: 2, ml: 1, p:0.5, cursor: 'pointer'}} onClick={toggleDrawer(false)} />
                                    :
                                    <ArrowForward sx={{boxShadow: 2, ml: 1, p:0.5, cursor: 'pointer'}} onClick={toggleDrawer(true)} />
                                }
                                <Drawer
                                    anchor={'left'}
                                    open={drawerOpen}
                                    onClose={toggleDrawer(false)}
                                    className={classes.drawer}
                                    variant="persistent"
                                >
                                    <EmployeeList />
                                </Drawer>
                            </React.Fragment>
                            : 
                            <EmployeeList />
                        }
                    </Grid>
                    <Grid item lg={8} xs={12} sm={11}>
                        <StyleWrapper>
                            <FullCalendar
                                plugins={[listPlugin, dayGridPlugin, timeGridPlugin, interactionPlugin]}
                                weekends
                                editable
                                droppable
                                selectable
                                events={events}
                                ref={calendarRef}
                                rerenderDelay={10}
                                initialDate={date}
                                initialView={view}
                                dayMaxEventRows={3}
                                eventDisplay="block"
                                headerToolbar={false}
                                allDayMaintainDuration
                                eventResizableFromStart
                                select={handleSelectRange}
                                // eventDrop={handleDropEvent}
                                eventClick={handleSelectEvent}
                                // eventResize={handleResizeEvent}
                                dateClick={handleOpenDialog}
                                height={isUpXs ? 720 : 'auto'}
                            />
                        </StyleWrapper>
                    </Grid>
                    {
                        !isDownLg && 
                        (
                            <Grid item lg={2}>
                                <UnscheduledItems />
                            </Grid>
                        )
                    }
                </Grid>
            </Card>
            {open && <CalendarEventForm open={open} setOpen={setOpen} onCancel={handleClose} range={range} events={events} setEvents={setEvents} color={color} event={value} />}
        </DashboardLayout>
    )
}
export default Schedule