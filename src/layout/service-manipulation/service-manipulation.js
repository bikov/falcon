import React from 'react';
import { Header, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './service-manipulation.module.css';
import ServersList from '../../containers/servers-list/servers-list';
import { logger } from '../../utills/logger';

const getTabs = (versions) => {
    if (!versions) {
        logger.error(`cannot read versions. they are ${versions}`);
        return [(<Tab.Pane>
            <header>Cannot read versions info from configuration</header>
        </Tab.Pane>)];
    }
    return versions.map(version => ({
        menuItem: version.versionName,
        render: () => (
            <Tab.Pane>
                <ServersList versionName={version.versionName} servers={version.servers}
                             serviceName={version.serviceName}/>
            </Tab.Pane>),
    }));
};

const ServiceManipulation = ({servers}) => {
    return (
        <>
            <Header>Service Manipulation</Header>
            <Tab className={styles.layout} panes={getTabs(servers)}/>
        </>
    );
};

const mapStateToProps = state => {
    logger.log(state);
    return ({
        servers: state.servers.versions,
    });
};
export default connect(mapStateToProps)(ServiceManipulation);
