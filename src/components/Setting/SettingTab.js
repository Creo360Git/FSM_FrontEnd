import React, {useState, useEffect} from 'react';
import CustomTab from '../Common/CustomTab';
import TrackTab from '../Track/TrackTab';
import ApplicationConfig from './ApplicationConfig';

function D(){
    return(
        <>Hi</>
    )
}

export default function SettingTab() {
    return (
        <CustomTab 
            tabs={['Application configuration', 'rates configuration', 'configuration']}
            panelComponents={[<ApplicationConfig /> ]}
        />
    );
}
