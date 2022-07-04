import React, {useState, useEffect} from 'react';
import CustomTab from '../Common/CustomTab';
import TrackTab from '../Track/TrackTab';
import { useLocation, useParams } from 'react-router-dom';
import ApplicationConfig from './ApplicationConfig';

function D(){
    return(
        <>Hi</>
    )
}

export default function SettingTab() {
    const {tab, verticalTab} = useParams()
    const location = useLocation()

    return (
        <CustomTab 
            tabs={['Application configuration', 'rates configuration', 'configuration']}
            tabUrls={['app-config', 'rate-config', 'config']}
            panelComponents={[<ApplicationConfig parentPath={`/settings/${tab}`} /> ]}
            currentTab={tab}
            parentPath='settings'
            childPath={!!verticalTab ? verticalTab : 'permission-management'}
        />
    );
}
