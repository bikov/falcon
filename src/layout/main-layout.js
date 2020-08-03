import React from 'react';
import { Tab } from 'semantic-ui-react';
import ServiceManipulation from './service-manipulation/service-manipulation';
import ConfigChangeLayout from './config-change-layout';

const panes = [
    {menuItem: 'Service Manipulation', render: () => <Tab.Pane><ServiceManipulation/></Tab.Pane>},
    {menuItem: 'Config Change', render: () => <Tab.Pane><ConfigChangeLayout/></Tab.Pane>},
    {menuItem: 'Tab 3', render: () => <Tab.Pane>Tab 3 Content</Tab.Pane>},
];

const MainLayout = () => {
    return (
        <Tab menu={{fluid: true, vertical: true}} panes={panes} style={{height: '100%'}}/>
    );
};

export default MainLayout;
