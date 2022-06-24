import * as React from 'react';
import { useParams } from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import DashboardLayout from '../../components/Common/Layouts/DashboardLayout';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardHeader, FormControl, InputLabel } from '@mui/material';
import Select from '@mui/material/Select';


import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TimeSheet from './TimeSheet';
import Approved from './Approved';
import Payment from './Payment';
import { fontWeight } from '@mui/system';
import TrackTab from '../../components/Track/TrackTab';


const tabs = [
    {label:'Time Sheet', id:0, description:'Time Sheet',component:<TimeSheet/> },
    {label:'Approved', id:1, description:'Approved', component:<Approved/> },
    {label:'Payments', id:2, description:'Payments',component:<Payment/>  }
]

const Track = () => {


    

    return ( 
        <TrackTab
            tabs={tabs}
            heading = "Track"
            title= "Time Tracker"
            initialTabId ={0}
        />
     );
}
 
export default Track;