import React from 'react';
import { Tab } from 'semantic-ui-react';
import ServiceManipulation from './service-manipulation/service-manipulation';
import ConfigChangeLayout from './config-change-layout';
import PortChecksLayout from './port-checks-layout/port-checks-layout';
import VersionManipulation from './version-manipulation/version-manipulation';

const panes = [
    {menuItem: 'Service Manipulation', render: () => <Tab.Pane><ServiceManipulation/></Tab.Pane>},
    {menuItem: 'Version Manipulation', render: () => <Tab.Pane><VersionManipulation/></Tab.Pane>},
    {menuItem: 'Port Checks', render: () => <Tab.Pane><PortChecksLayout/></Tab.Pane>},
    {menuItem: 'Config Change', render: () => <Tab.Pane><ConfigChangeLayout/></Tab.Pane>},
];

const MainLayout = () => {
    return (
        <Tab menu={{fluid: true, vertical: true}} panes={panes} style={{height: '100%'}}/>
    );
};

export default MainLayout;
