import React from 'react';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './main-layout.module.css';
import ServersList from '../../containers/servers-list/servers-list';

const getTabs = (versions) => {
    return versions.map(version => ({
        menuItem: version.versionName,
        render: () => <Tab.Pane><ServersList versionName={version.versionName} servers={version.servers} serviceName={version.serviceName}/></Tab.Pane>,
    }));
};

const MainLayout = ({servers}) => {
    return (
        <Tab className={styles.layout} panes={getTabs(servers)}/>
    );
};

const mapStateToProps = state => ({
    servers: state.servers.serversForActions,
});
export default connect(mapStateToProps)(MainLayout);
