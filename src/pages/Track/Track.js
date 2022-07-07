import React, {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DashboardLayout from '../../components/Common/Layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, FormControl, InputLabel, useMediaQuery } from '@mui/material';
import Select from '@mui/material/Select';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TimeSheet from './TimeSheet';
import Approved from './Approved';
import Payment from './Payment';
import { fontWeight } from '@mui/system';
import TrackTab from '../../components/Track/TrackTab';
import { useTheme } from '@emotion/react';

import { useDispatch } from 'src/redux/Store';
import { changePageHeading } from 'src/redux/Slices/Common';


const tabs = [
    {label:'Time Sheet', id:0, description:'Time Sheet',component:<TimeSheet/> },
    {label:'Approved', id:1, description:'Approved', component:<Approved/> },
    {label:'Payments', id:2, description:'Payments',component:<Payment/>  }
]

const Track = () => {

    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.up('sm'));

    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(changePageHeading('Track'))
    },[dispatch])
    
    return ( 
        <TrackTab
            tabs={tabs}
            heading = {breakpoint?"Track":''}
            title= "Time Tracker"
            initialTabId ={0}
        />
     );
}
 
export default Track;