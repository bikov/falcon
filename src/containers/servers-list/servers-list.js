import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Header, Icon, Loader } from 'semantic-ui-react';
import ServerActions from '../server-actions/server-actions';
import { getVersionStatuses } from '../../utills/service-status';

const widths = {
    location: 3,
    ip: 3,
    status: 3,
    serviceName: 2,
    actions: 5,
};

const statuses = {
    STOPPED: {icon: 'stop', color: 'red', text: 'STOPPED'},
    RUNNING: {icon: 'play', color: 'green', text: 'RUNNING'},
    unknown: {icon: 'question', color: 'blue', text: 'UNKNOWN'},
};

const getStatus = (status) => {
    if (status && status.service) {
        const {icon, color, text} = statuses[status.service];
        return <div style={{color}}><Icon name={icon}/>{text}</div>;
    } else {
        return <Loader active inline/>;
    }
};

const ServersList = ({servers, serviceName, versionName}) => {
    return (
        <Grid celled='internally'>
            <Grid.Row>
                <Grid.Column width={widths.ip}>
                    <Header>IP</Header>
                </Grid.Column>
                <Grid.Column width={widths.location}>
                    <Header>Location</Header>
                </Grid.Column>
                <Grid.Column width={widths.status}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Header>Status</Header>
                        <div>
                            <Button style={{alignContent: 'flex-env'}} icon={'redo'}
                                    onClick={async () => await getVersionStatuses()}/>
                        </div>
                    </div>
                </Grid.Column>
                <Grid.Column width={widths.serviceName}>
                    <Header>Service Name</Header>
                </Grid.Column>
                <Grid.Column width={widths.location}>
                    <Header>Actions</Header>
                </Grid.Column>
            </Grid.Row>
            {servers.map((server, index) => {
                const status = server.status;
                return (
                    <Grid.Row key={index}>
                        <Grid.Column width={widths.ip}>
                            {server.ip}
                        </Grid.Column>
                        <Grid.Column width={widths.location}>
                            {server.location}
                        </Grid.Column>
                        <Grid.Column width={widths.status}>
                            {getStatus(status)}
                        </Grid.Column>
                        <Grid.Column width={widths.serviceName}>
                            {serviceName}
                        </Grid.Column>
                        <Grid.Column width={widths.actions}>
                            <ServerActions server={server} serviceName={serviceName} versionName={versionName}/>
                        </Grid.Column>
                    </Grid.Row>
                );
            })}
        </Grid>
    );
};

ServersList.propTypes = {
    servers: PropTypes.arrayOf(PropTypes.object),
    serviceName: PropTypes.string,
    versionName: PropTypes.string,
};
ServersList.defaultProps = {};

export default ServersList;
