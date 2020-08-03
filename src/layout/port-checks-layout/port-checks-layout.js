import React from 'react';
import { Accordion, Button, Header, Label } from 'semantic-ui-react';
import { connect } from 'react-redux';
import styles from './port-checks-layout.module.css';
import PortsTable from './ports-table';
import { checkPorts } from '../../actions/port-actions';

const ReloadButton = ({onClick}) => <Button primary style={{alignContent: 'flex-env'}} icon={'redo'} onClick={onClick}/>;

const getServerAccordion = ({ip, tcpPortsToCheck, udpPortsToCheck, loading}, checkPortsAction) => {
    return ({
        key: ip,
        title: {content: <Label>{ip}</Label>},
        content: {
            content:
                <>
                    <ReloadButton onClick={() => checkPortsAction({ip, tcpPortsToCheck, udpPortsToCheck})}/>
                    <div className={styles.service}>
                        <div className={styles.ports}>
                            <Header as='h2'>TCP</Header>
                            <PortsTable portStatuses={tcpPortsToCheck} loading={loading}/>
                        </div>
                        <div className={styles.ports}>
                            <Header as='h2'>UDP</Header>
                            <PortsTable portStatuses={udpPortsToCheck} loading={loading}/>
                        </div>
                    </div>
                </>,
        },
    });
};

const PortChecksLayout = ({portChecks, checkPortsAction}) => {
    return (
        <>
            <Header>Port Checks</Header>
            <Accordion fluid styled exclusive={false}
                       panels={portChecks?.map((portCheck) => getServerAccordion(portCheck, checkPortsAction))}>
            </Accordion>
        </>
    );
};

const mapStateToProps = ({ports}) => ({
    portChecks: ports.portChecks,
});

const mapDispatchToProps = dispatch => ({
    checkPortsAction: (portChecks) => dispatch(checkPorts(portChecks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PortChecksLayout);
