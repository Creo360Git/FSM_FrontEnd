import React, {useState, useEffect, useRef} from 'react'
import { 
    Card,
    Grid,
    useMediaQuery,
    Button,
    Icon,
    Drawer,
    Container
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

    const [events, setEvents] = useState([])
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

    return(
        <DashboardLayout heading="schedule">
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
                    <Grid item lg={8} xs={11}>
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
            <CalendarEventForm open={open} setOpen={setOpen} onCancel={handleClose} range={range} events={events} setEvents={setEvents} color={color} event={value} />
        </DashboardLayout>
    )
}
export default Schedule