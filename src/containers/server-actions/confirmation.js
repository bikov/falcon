import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Header, Icon, Input, Modal } from 'semantic-ui-react';

let confirmationWord = 'yes';

const Confirmation = ({isOpen, ip, location, version, action, onApprove, onClose}) => {
    const [text, setText] = useState();
    const [isError, setIsError] = useState(false);

    const handleEnter = () => {
        if (text !== confirmationWord) {
            setIsError(true);
        } else {
            setIsError(false);
            onApprove();
        }
    };
    return (
        <Modal open={isOpen} closeIcon onClose={onClose}>
            <Header color='red' icon='warning' size='huge' content={`${action} service at ${ip}`}/>
            <Modal.Content>
                <p style={{fontSize: '20px'}}>
                    Are you sure you want to <b>{action}</b> this service? <br/>
                    IP: <b>{ip}</b>, location: <b>{location}</b>, version: <b>{version}</b><br/>
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={onClose} style={{float: 'left'}}>
                    <Icon name='remove'/> No
                </Button>
                <>
                    <Input
                        placeholder={`To ${action} type ${confirmationWord}`}
                        onChange={(e) => setText(e.target.value)}
                        error={isError}
                    />
                    <Button primary icon={'checkmark'} onClick={handleEnter}/>
                </>
            </Modal.Actions>
        </Modal>
    );
};

Confirmation.propTypes = {
    isOpen: PropTypes.bool,
    ip: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    version: PropTypes.string.isRequired,
    action: PropTypes.string.isRequired,
    onApprove: PropTypes.func,
    onClose: PropTypes.func,
};
Confirmation.defaultProps = {
    onApprove: () => {
    },
    onClose: () => {
    },
};

export default Confirmation;
