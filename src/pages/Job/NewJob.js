import React, { useState, useRef, useEffect } from "react";
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
    Tabs,
    Tab,
    Divider
} from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DashboardLayout from "../../components/Common/Layouts/DashboardLayout";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTheme } from "@emotion/react";
import SelectClientDialog from "../../components/Common/SelectClientDialog";
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import JobSchedule from "../../components/Job/JobSchedule";
import AssignEmployees from "../../components/Job/AssignEmployees";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import StyleWrapper from "../../components/Schedule/StyleWrapper";
import RecurringJobSchedule from "../../components/Job/RecurringJobSchedule";
import Invoicing from "../../components/Job/Invoicing";
import LineItems from "../../components/Job/LineItems";
import Add from "@mui/icons-material/Add";
import MoreOptionsMenu from "../../components/Controls/MoreOptionsMenu";
import FileUploadArea from "../../components/Common/FileUpload";
import { useDispatch } from "src/redux/Store";
import { changePageHeading } from "src/redux/Slices/Common";


const NewJob = () => {
    const theme = useTheme()
    const isDownSm = useMediaQuery(theme.breakpoints.down('sm'));
    const isDownMd = useMediaQuery(theme.breakpoints.down('md'));
    const [indexValue, setIndexValue] = useState(0);

    const handleChange = (event, newValue) => {
        setIndexValue(newValue);
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'span'}>{children}</Typography>
                </Box>
                )}
            </div>
        );
    }
      

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function OneOffJob(){
        return(
            <svg width="45" height="42" viewBox="0 0 45 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.5 8.84211H33.75V4.42105C33.75 1.96737 31.7475 0 29.25 0H15.75C13.2525 0 11.25 1.96737 11.25 4.42105V8.84211H4.5C2.0025 8.84211 0 10.8095 0 13.2632V37.5789C0 40.0326 2.0025 42 4.5 42H40.5C42.9975 42 45 40.0326 45 37.5789V13.2632C45 10.8095 42.9975 8.84211 40.5 8.84211ZM15.75 4.42105H29.25V8.84211H15.75V4.42105ZM40.5 37.5789H4.5V33.1579H40.5V37.5789ZM40.5 26.5263H4.5V13.2632H11.25V17.6842H15.75V13.2632H29.25V17.6842H33.75V13.2632H40.5V26.5263Z" fill="black"/>
            </svg>
        )
    }

    function RecurringJob(){
        return(
            <svg width="55" height="48" viewBox="0 0 55 48" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <rect width="55" height="48" fill="url(#pattern0)"/>
                <defs>
                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlinkHref="#image0_481_1863" transform="translate(0 -0.0729167) scale(0.005 0.00572917)"/>
                    </pattern>
                    <image id="image0_481_1863" width="200" height="200" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAADY5JREFUeJzt3XuwVWUdxvHv2dwERDkoXsPQDApJyMDS0TSUyPLSZSpLZ8rJqSnNapwuZhe1JrWymTLNMvOSTjbqSHSB1CSQjCIVL6UoSiKiIkIKcgI5nP74nVNnTmevvd93vWu96/J8ZtY/sNfev7X3es66vO96XxARERERERERERERERERERERERERERERERERERERqbWO2AVE0Ohd+tseo5AMDOH/f9OqbJtk6FhgHrAR6Blk2Q48DFwAdEaq0dcJwALgJQbftleAB4FzgZ0j1SgF1QCuYP
                    Adp9myFpgZo1hHw4Ff4LZtq4CDYhQrxXQJbjtQ37IBmJh/uU6uxm/b1gJ7RKhXCuZgYAd+O1EPcEv+JbftSPy3qwf4Sf4lS9F8n3Q7UTcwPveq23Mt6bZtC7BT7lWX0MC7OVUyI+X6DeBNIQrJQNptGwlMDVFI1VU5ILsEeI9dA7xHFqq8bYVS5YCEaOMpajtRlbetUKocEJHUFBCRBAqISIKinYc2gNnAMcC+WN8iX+8g/YXon4HVKd8jCydid6LS+CPwnOe6PcAm4D6svWhdylqkDYcCD5Hu/r6W/Jcu4DzS/TGTFmZjX3TsH1uL/3IzFTxlL0Lq98YO9+ppWm5TgK3AktiFVE3aLiFairNsomINkEU4JJ4cuwAJZmfg+NhFhBQ7IHuhrtdVMy12ASHFDsjoyJ8v4Y2JXUBIsQNStHYYSa9Sv2nsgIgUmgIikkABEUmggIgkUEBEEiggIgkUEJ
                    EECohIAgVEJIECIpJAARFJoICIJFBARBIoICIJFBCRBAqISAIFRCSBAiKSQAERSaCAiCQYGrsAB+uxeQMljgbt/UHdnHUhdXIg7Y/a97pINUqN6RRLJIECIpJAARFJoICIJFBARBIoICIJFBCRBGVqKJRy6AROA94GjAeeBW4HrgFejldWOamhsFqOw3o8DPb7rQEOj1daOSkg1XEksI3k33AzMDVWgWWkgFRDA3iE9n7HuyLVWEoKSDUcjdtsuKX5LXUXS0I4xPH1R2RSRQYUEAlhhOPrD82kigwoIBLCSsfXz8ykigwoIBLCMsfXTwVGZlFIaAqIhPBP4HmH1w8F3phNKWEpIBKK61GkFKdZCoiE8lfH15fiQl19saqvE5jUu7wG2L333zqxu089wA6sFXw9dqq0DlgFPAw81vt/rVTyCKKAVM80rOHuMOAtwKtTvl83sAJYgrWCLwZWD/I61y
                    PIgcBY4F+pqqs4taSn1wCOBS7HdlyXFm3f5X7gPCyM/T3h+D6zg30LFaWA+JsIXAA8ST6haLY8CHwaOxr80nHdL4f+UqpGAXF3MHAjsJ24wRi4bAEed1zn1sDfTeUoIO2bAswjfhBCLk8H/YYqSAFpbTfgh8ArxN+hs1j2CfdVhad2kGI7BXgUOIPq3nEsdHuIAlJM44FbgOuBcZFryVqh20Oq+lepzI4AbgL2il1ITgodEB1BiuVM4E7qEw6AGUBH7CKaUUCKoQH8GLgUGBa5lrx1YjdrCkkBiW841sD28diFRDQjdgHN6BokrpHAXODtOXzWNqwhbyXW/rAReAk7vWkAu2A3B/YBJmN9uPI69ZmQ0+c4U0DiGQbcTHbh6AL+ANwGLAWWY20p7RqFXUAfARyDjXuV1f6iaduaqGtDYQdwA+Eb3bqB+cD7Cf9I6zhsSNG7Mqh7euBaK6OuAfkuYX
                    ewLuAyrANjHg7BnhsJUbsGkktQx4CcQtgjxlXA3jnWPwF79iNE/Rux6x1pom4BmY71eg2xcy3HfcC2tGZhTxuGqP8JrGeyJKhTQEZh/apCHDW+Qf7tJV8gXBf7+VS/C00QdQrIpaTfsV4A5uRc9xjsbluIYOwAzkftb22rS0BmYTtHmp3rMeCAnOveH/hHyrr7lo3A8fmWX351CMgwbNCDNDvX/eTfP2sM1qgYIhwPUODuJEVWh4B8jnQ710PYQ1N5O9+z3oHLDdj1Vysd2FOTs7HRWEaH25TyqnpAdsdOLXx3rlXEe+LOdYSSgcs24Kw2PmcocDY2RVv/9buA64BXhdqgMqp6QC7GfwfbDByUf8mA/fVOE45naG8OkDHAohbvtYEaz21Y5YCMxToD+u5kH8i/5P8ak1BXq2UJ7Tdc/qrN93yBmh5JqhyQr+K/k/00Qr0D+QxC9wPab5+Z4/je16T
                    fpPKpakCGYqcZPuF4Eut6HtuFtF/zy1gXGheug8xtBfZIs0FlVNWAnIT/0eO9EeodzK7YvB+t6l2JX5cRn5sA5/huTFlVNSC+A7wtjFFsgskkj5Y4D7vW8uHTG/hRz88qrSoGZBz+g7wdFqHeVkYDXwT+ht10eB5YALwv5fsux+87KvQoKKFVMSCnUo2jR9Z8n4n5doxiY6liQFwvPvuWd8UoNqLJ+PVPeyRGsbFULSBDsAlhXH/0Nb3r1s2d+P0xya3TprodhzUVu/vj6nrsOY+6udZzvVlBq0iggITle5Fd13ky5tLe/IcDtdONJQgFJKw3e6yzDvf5/ariRfwGbfD5nr0oIGG9wWOdxdh5dV3d4bHOJNrrQp+aAhLWaz3WWRq8inLxOYI0sGdHMqeAhLMnfn2o7g1dSMnci93udeXzx8iZAhLOfp7r1a77xABdWHcWVxMD1zEoBSQcn2FsuoC1o
                    Qspocc81sllsDwFJByfgKyn3hfofdZ4rDM+eBWDUEDC8Wkg3BC8inJa77GOz/ftTAEJx6erSFfwKsppk8c6oUevH5QCEo7PnRh9/8Zl3pI+ucxtox8oHJ+AaAIj47Mf+nzfzhSQcLZ4rKMBnI3PIHFbg1cxCAUknOc91qndIARN+Iwc6XPd4kwBCccnIKOw0Rfrzmf0SJ87X84UkHCe9VyvDA+CZc3nASjf79uJAhLOWmx8KFdTQxdSMkPwm4btydCFDEYBCacHv35VtR13ttcU/No0fPpvOVNAwnrYY53cno4rKN/t9/munZXpPvw52FQCeenGhuV3cQ/wYcd19sdOMVY4rlcVx3qssxZ7ErPyXEY1yXvZ7rE9Mz0/60sen1UFI7Dbta7fV27P8OsUK6z78LtQ/2DoQkriOGBnj/WWhC6kGQUkrO34/XjTqdmQmr0+6rnewpBFJFFAwpvrud4nglZ
                    RfBPwm/X2OexIXQsTiX+tEfIaBOxJN58hNTcBwz0/s4wuwe93uTJGsbGMwAYOix2GkAEB+JPnZ05P8Zlg5/NnAb/Dpo5eiM1WG2si0Gb2wOZg9PmO5kSoN6o7iB+G0AE53fMzj0rxmYcDTzV53824zwCVpcvw+37WUsMxjF3nqitDQEZjowa6fuYkz887k9ZH4h3AiZ7vH9I07Lv1+U0ujFBvIVxJ/ECEDAjA5Y6ftwbocPyMkdhc4u1+xtPYaW0sQ7BhVn1+j26sUbWWhgI/In4oQgZkMm4zTX3e8f0PwG+WppNSbFNaX0moq9VyS4R6C+co7DZpmvnFixIQsBbydj7rbtqfPhngndiIKD7bdX7KbfJ1FP6nVj3AofmXXLy+WIt6lw5sWJeY9fUEeI+LsG25gObb8nvgZNobuKAD+BrwddxPx/q4BDGU/YCb8L/AXkB9R8CvhSnYKeQK7I7SM9gMse9
                    xeI+xwG9If2T8SOqtcdMJ/D1Fvd3Yhb1IU9Ow+cjThmMLfs9/+9oF+EvKmq/KsV4poVOxHTvEddU5OdY9HliWst6N5DTEqJTPMOBSwgSjB7gC/+sWV5OxAanT1vyxnOqVktkb6xUcIhhbybcj5En4zfQ7cFmQY81SIkdiF/EhwvEU+c3nNxr/LiQDl3XkNL2BlMtncGtcTFoWkt/AdCcAqwLV3Q3MzqluKZFvEWYH6wG+Qz6d+mYCtwWsu4f6Pn4sCd5KuB3sooxrbWAt+bcHrLlvuSbj2qWkbiXsjvYAdkv39YHq68COFhcCqwPX2rcsIE4rf6K8bvtJso1YS3kWVmPdd5ZiwVlB63GE98KGRJ2GPWdyNNlezyzBHnvwGSE/UwpIfB3kNNdFP1uwO0Uv8r9pBEZgId0T2CnHWhZjz6bnMlq7lNPTZHPaUvTl1+Q0lZovjWpSDPfELiCCy4F3U/B5GhW
                    QYqhTV+5twCeBM7A2D5GWivpcfujlCSI9+CTlthvxd96sl6ux7u8iXh4n/k6cxbKSGo5lJeHdSPydOeSyCTiXfG8ZS4WdTfydOsSyBfgemsFXAnPtj7UDv7k1slrWYYNTKBiSidG4D4szCXvqbhF+A2anXV4B5mOjssQckE5q4kHcdtD+g8DtC3wK+C02iU9WoXgJG7vsdPS8uOTsZ7jtrN9s8j7DsU6GZwM3YJ0U/+343j1YK/dy4Hrgs1gbRtHGUstUrTa2BJYBpzm8vlmj2zZstMa7+/1bA5sGYQJ2nTAOO60b1m+dl7ERG9dhvYD7Hv0VKYQZuP2F3xCnTJE4hmPdz11CcmCUSmtCnRWLZRs2M5QL9W3KkAJSPMscX1/H2XFzo4AUjwIikuAg3K5BWj1fLlIpDdy6kDwXp8x60ClW8ezApgxo1wNZFSIKSFFd5/Dan2dWhUhBNbAOiK1OrxajP3JSU
                    53YANTNwrEI6y4iUlsdwIewLuVPYXOpz8dmndKRQ0RERERERERERERERERERERERERERCrsP+cVvKqCn8L3AAAAAElFTkSuQmCC"/>
                </defs>
            </svg>
        )
    }

    const [show, setShow]= useState(false)
    const [client, setClient] = useState()
    const handleOpen = () => setShow(true)
    const defaultValues = {
        fileList: [],
        startDate: new Date(),
        endDate: new Date(),
        startTime: new Date(),
        endTime: new Date(),
        scheduleLater: false,
        title: '',
        LineItems: [
            {
                name: '', describtion: '', qty: '', unitPrice: '', total: ''
            }
        ]
    }

    const validationSchema = yup.object().shape({
    })

    const { register, formState: { errors }, handleSubmit, getValues, setValue, reset, control, watch } = useForm({
        defaultValues,
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(validationSchema)
    });

    const fileList= watch('fileList')
    const onSubmit = (values) => {
        reset()
        console.log(values)
    }
    const { fields, append, remove } = useFieldArray({control, name: 'LineItems'});

    const [anchorEl, setAnchorEl] = useState(null);
    const openMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuItems = [
        {
            label: (
                <Typography color="primary" variant="h4">
                    Send As Email
                </Typography>
            ),
            color: theme.palette.primary.main
        },
        {
            label: (
                <Typography color="primary" variant="h4">
                    Send As Email
                </Typography>
            ),
            color: theme.palette.primary.main,
        },
    ];

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(changePageHeading('New job'))
    }, [dispatch])

    return (
        <React.Fragment >
            <SelectClientDialog show={show} setShow={setShow} theme={theme} setClient={setClient} />
            <Container>
                <Card>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                        <Grid container spacing={2} alignItems="center" justify="center" p={2}>
                            {
                                !!client ? 
                                <>
                                    <Grid item xs={12}>
                                        <Typography variant='h3' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            {client?.name}
                                        </Typography>
                                    </Grid>
                                    <Grid md={3} sm={5} xs={6} item>
                                        <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Property adress
                                        </Typography>
                                        <Grid container item >
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>135/B  Garden State Ave , Mississauga,Ontario,L4T 0A5, </Typography></Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                    <Grid xs='auto' item>
                                        <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Contact details
                                        </Typography>
                                        <Grid container item >
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>0777898734</Typography></Grid>
                                            <Grid item xs={12}><Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>snd89@gmail.com</Typography></Grid> 
                                        </Grid>
                                    </Grid>
                                    
                                </>
                                :
                                <Grid xs={12} item >
                                    <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                        Client Name
                                        <Fab size="small" color="primary" aria-label="add" sx={{ml: 2}} onClick={handleOpen}>
                                            <AddIcon />
                                        </Fab>
                                    </Typography>
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Job Title
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label= 'Request Title'
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("title")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label= 'Description'
                                    multiline
                                    rows={4}
                                    fullWidth
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    {...register("describtion")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Tabs 
                                    value={indexValue} 
                                    onChange={handleChange} 
                                    aria-label="basic tabs example" 
                                    variant="fullWidth"
                                    selectionFollowsFocus={true}
                                    TabIndicatorProps={{
                                        sx:{display: 'none', border: "3px solid red"}
                                    }}
                                >

                                    <Tab 
                                        label={
                                            <Grid container spacing={2}>
                                                {
                                                    !isDownMd ?
                                                    <React.Fragment>
                                                        <Grid xs={8} md={10} item>
                                                            One-Off Job
                                                            <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>
                                                                One time job with one or more visits.
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs='auto' md='auto' item>
                                                            <OneOffJob />
                                                        </Grid>
                                                    </React.Fragment>
                                                    :
                                                    <Grid xs={12} item>
                                                        One-Off Job
                                                    </Grid>
                                                }
                                            </Grid>
                                        }
                                        {...a11yProps(0)} 
                                        sx={{boxShadow: 2, width: '100%', backgroundColor: indexValue ==0 ? 'rgba(14, 165, 233, 0.28)' : '',border: "1px solid #CACACA" }}
                                    />


                                    <Tab 
                                        label={
                                            <Grid container spacing={2}>
                                                {
                                                    !isDownMd ?
                                                    <React.Fragment>
                                                        <Grid xs={8} md={10} item>
                                                            Recurring Job
                                                            <Typography variant='h5' sx={{color:'#818EA1', fontWeight: theme.typography.fontWeightRegular}}>
                                                                Job on a contract basis with repeating visits.
                                                            </Typography>
                                                        </Grid>
                                                        <Grid xs='auto' md='auto' item>
                                                            <RecurringJob />
                                                        </Grid>
                                                    </React.Fragment>
                                                    :
                                                    <Grid xs={12} item>
                                                        Recurring Job
                                                    </Grid>
                                                }
                                                
                                            </Grid>
                                        }
                                        {...a11yProps(1)} 
                                        sx={{boxShadow: 2, width: '100%', backgroundColor: indexValue ==1 ? 'rgba(14, 165, 233, 0.28)' : '',border: "1px solid #CACACA"}}
                                    />

                                </Tabs>
                                {
                                    ['oneOff', 'recurring'].map((type, index)=>{
                                        return(
                                            <TabPanel value={indexValue} index={index} key={index}>
                                                <Grid item container spacing={4}>
                                                    <Grid item lg={5} xs={12} mb={{xs: 2}}>
                                                        {
                                                            type==='oneOff' ?
                                                            <JobSchedule 
                                                                errors={errors} 
                                                                register={register} 
                                                                defaultValues={defaultValues} 
                                                                watch={watch}
                                                                setValue={setValue}
                                                            />
                                                            :
                                                            <RecurringJobSchedule 
                                                                setValue={setValue}
                                                                watch={watch}
                                                                errors={errors} 
                                                                register={register} 
                                                                defaultValues={defaultValues} 
                                                            />
                                                        }
                                                        <AssignEmployees 
                                                            errors={errors} 
                                                            register={register} 
                                                            defaultValues={defaultValues} 
                                                            mt={2}
                                                        />
                                                    </Grid>
                                                    <Grid item lg={7} xs={12}>
                                                        <Stack sx={{boxShadow: 2}}>
                                                            <StyleWrapper>
                                                                <FullCalendar
                                                                    plugins={[ dayGridPlugin ]}
                                                                    initialView="dayGridMonth"
                                                                    headerToolbar={{
                                                                        start: 'prev',
                                                                        center: 'title',
                                                                        end: 'next'
                                                                    }}
                                                                    showNonCurrentDates={false}
                                                                />
                                                            </StyleWrapper>
                                                        </Stack>
                                                        {type==='recurring' && 
                                                            <Grid item lg={8} xs={12} mt={2}>
                                                                <Invoicing 
                                                                    errors={errors} 
                                                                    register={register} 
                                                                    defaultValues={defaultValues} 
                                                                />
                                                            </Grid>
                                                        }
                                                    </Grid>
                                                </Grid>
                                            </TabPanel>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} justifyContent="flex-end">
                                <Grid container item  spacing={2}>
                                    <Grid item xs={6} >
                                        <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            PRODUCT / SERVICE
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Qty
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Unit price
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                            Total
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                {
                                    fields.map((val, index)=>{
                                        return(
                                            <LineItems keyValue={val.id} key={val.id} theme={theme} index={index} remove={remove} register={register}/>
                                        )
                                    })
                                }
                            </Grid>
                            <Button
                                onClick={() => {
                                    append({
                                        name: '', describtion: '', qty: '', unitPrice: '', total: ''
                                    });
                                }}
                                sx={{textTransform:'uppercase', ml: 2, mt: 2, mr: 2}}
                            >
                                Add Line Item <Add width= {14} height={14} /> 
                            </Button>
                            <Grid item xs={12}>
                                <Divider />
                                {/* color: '#2B43CF' */}
                                <Stack direction='row' justifyContent={'space-between'} mt={1}>
                                    <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightBold, textTransform: 'uppercase'}}>
                                        Total
                                    </Typography>
                                    <Typography variant='h5' sx={{fontWeight: theme.typography.fontWeightRegular}}>
                                        Rs 0.00
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item md={12} xs={12} mt={-2}>
                                <FormControlLabel
                                    control={
                                        <Checkbox 
                                            {...register("IsBillingAddress")}
                                            defaultChecked={defaultValues.IsBillingAddress}
                                            sx={{color:theme.palette.secondary.dark}}
                                        />
                                    }
                                    label={<Typography variant='h6' sx={{fontWeight: theme.typography.fontWeightRegular}}>Remind me to invoice when the job is closed</Typography>}
                                />
                            </Grid>
                            <Grid xs={12} item><Divider /></Grid>
                            <Grid item xs={12}>
                                <Typography variant='h4' sx={{fontWeight: theme.typography.fontWeightBold}}>
                                    Notes & Attachments
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    type='text'
                                    fullWidth
                                    label='Note details'
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    size="small"
                                    {...register("note")}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FileUploadArea theme={theme} setValue={setValue} getValues={getValues} fileList={fileList}/>
                            </Grid>
                            {MoreOptionsMenu(menuItems, anchorEl, setAnchorEl)}
                            {
                                isDownSm ? 
                                <Grid xs={12} item>
                                    <Stack direction={{md:'row', xs:'column'}} alignItems={{md:'flex-end', xs:'stretch'}} justifyContent={{md:"space-between", xs:'flex-start'}} spacing={2}>
                                        <Button variant='contained' key="three" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save And ...</Button>
                                        <Button variant='outlined' key="two" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save Request</Button>
                                        <Button variant='outlined' key="one" sx={{textTransform: 'uppercase', height: {xs:'42.5px'},width:'100%', overflow: 'hidden', display: "block"}}>Cancel</Button>
                                    </Stack>
                                </Grid>
                                :
                                <Grid xs={12} item>
                                    <Stack direction='row' alignItems='flex-end' justifyContent="space-between" spacing={2}>
                                        <ButtonGroup size="large" aria-label="large button group">
                                            <Button key="one" sx={{textTransform: 'uppercase', height: {xs:'42.5px'},width:'100%', overflow: 'hidden', display: "block"}}>Cancel</Button>
                                        </ButtonGroup>
                                        <ButtonGroup size="large" aria-label="large button group"> 
                                            <Button type='submit' variant='outlined' key="two" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}}>Save Job</Button>
                                            <Button variant='contained' key="three" sx={{textTransform: 'uppercase', height: {xs:'42.5px'}, overflow: 'hidden', display: "block"}} onClick={e=>{openMenu(e)}}>Save And ...</Button>
                                        </ButtonGroup>
                                    </Stack>
                                </Grid>
                            }
                        </Grid>
                    </form>
                </Card>
            </Container>
        </React.Fragment>
    );
};

export default NewJob;
