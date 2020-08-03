import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Label } from 'semantic-ui-react';
import { changeConfig } from '../utills/config-changer';

const ConfigChange = ({config}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);
    const [isExecuted, setIsExecuted] = useState(false);
    const executeConfigChange = async () => {
        try {
            setError(undefined);
            setIsExecuted(true);
            setIsLoading(true);
            await changeConfig(config);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(false);
            setIsExecuted(true);
            setError(e.toString());
        }
    };
    return (
        <>
            <Button loading={isLoading} primary
                    onClick={() => executeConfigChange()}>{config.textToShow}</Button>
            {isExecuted && (!isLoading) &&
            <Label color={error ? 'red' : 'green'}>{error || 'done successfully!'}</Label>}
        </>
    );
};

ConfigChange.propTypes = {
    config: PropTypes.shape({
        textToShow: PropTypes.string,
        filePath: PropTypes.string,
        lineToChange: PropTypes.string,
        newLine: PropTypes.string,
        returnBack: PropTypes.bool,
        secondToWaitBeforeReturnBack: PropTypes.number,
    }),
};
ConfigChange.defaultProps = {
    textToShow: 'cannot read name from config - dont use!',
    lineToChange: '',
    newLine: '',
    returnBack: false,
};

export default ConfigChange;
