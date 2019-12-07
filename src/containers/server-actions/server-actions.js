import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import Confirmation from './confirmation';
import { sendRestartService, sendStartService, sendStopService } from '../../utills/service-manager';

const ServerActions = ({server, serviceName, versionName}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOptions, setModalOptions] = useState({
        action: '',
    });
    const openModal = (action, onApproveAction) => {
        setModalOptions({
            action,
            onApprove: () => {
                setModalOpen(false);
                onApproveAction(server, serviceName, versionName);
            },
            onClose: () => {
                setModalOpen(false);
            },
        });
        setModalOpen(true);
    };

    return (
        <>
            <Confirmation version={versionName} action={modalOptions.action} ip={server.ip} location={server.location}
                          isOpen={modalOpen}
                          onApprove={modalOptions.onApprove} onClose={modalOptions.onClose}/>
            <Button primary onClick={() => openModal('Stop&Start', sendRestartService)}>Stop & Start</Button>
            <Button color='red' onClick={() => openModal('Stop', sendStopService)}>Stop</Button>
            <Button color='green' onClick={() => openModal('Start', sendStartService)}>Start</Button>
        </>
    );
};

ServerActions.propTypes = {
    server: PropTypes.object,
    serviceName: PropTypes.string,
    versionName: PropTypes.string,
};
ServerActions.defaultProps = {};

export default ServerActions;
