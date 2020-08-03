import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Confirm, Header, Icon, ModalContent } from 'semantic-ui-react';
import ProgressTracker from '../progress-tracker';
import { nconf } from '../../utills/electron-node';
import { executeCommand } from '../../utills/action-executor';

const stringifyError = (err) => {
    const strigified = JSON.stringify(err, null, 4);
    return strigified !== '{}' ? strigified : err.toString();
};

let isPaused = false;

const VersionExecutor = ({stepsConfig}) => {
    const [currentStepNumber, setCurrentStepNumber] = useState(0);
    const [executing, setExecuting] = useState(undefined);
    const [failedSteps, setFailedSteps] = useState([]);
    const [successesSteps, setSuccessesSteps] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [error, setError] = useState(undefined);
    const addToFailedSteps = (stepNumber) => setFailedSteps(prevState => [...prevState, stepNumber]);
    const addToSuccessesSteps = (stepNumber) => setSuccessesSteps(prevState => [...prevState, stepNumber]);

    const start = async (startFrom) => {
        setIsConfirmOpen(false);
        setError(undefined);
        const steps = stepsConfig.steps;
        let toAbort = false;
        for (let index = startFrom || currentStepNumber; !toAbort && !isPaused && index < steps.length;) {
            setCurrentStepNumber(index);
            setExecuting(index);
            let executionResult = await executeCommand(steps[index]);
            setExecuting(undefined);
            if (!executionResult.success) {
                addToFailedSteps(index);
                toAbort = true;
                setIsConfirmOpen(true);
                if (executionResult.error) {
                    setError(stringifyError(executionResult.error));
                }
            } else {
                addToSuccessesSteps(index);
                index++;
                setCurrentStepNumber(index);
            }
        }
    };

    const onCancel = () => {
        setCurrentStepNumber(prevState => ++prevState);
        setError(undefined);
        setIsConfirmOpen(false);
    };

    const onConfirm = async () => {
        const nextStepNumber = currentStepNumber + 1;
        await setCurrentStepNumber(nextStepNumber);
        await start(nextStepNumber);
    };

    return (
        <>
            <Confirm open={isConfirmOpen} header={'Error!'}
                     cancelButton={'Abort'}
                     confirmButton={'Continue anyway'}
                     content={<ModalContent>Error occurred
                         in step {currentStepNumber}: {stepsConfig.steps[currentStepNumber]?.title}.<br/>
                         {error && `error: ${error}`} <br/>
                         Do you want to continue?</ModalContent>}
                     onCancel={onCancel} onConfirm={onConfirm}/>
            <Button icon color='green'
                    onClick={() => {
                        setCurrentStepNumber(0);
                        start();
                    }}>
                <Icon name='play'/> Start {stepsConfig.name} - full cycle
            </Button>
            <div style={{margin: '1em 0'}}>
                <Button icon='play' color='green' onClick={() => {
                    isPaused = false;
                    start();
                }}/>
                <Button icon='pause' primary onClick={() => isPaused = true}/>
                <Button icon='refresh' color='red' onClick={() => {
                    setFailedSteps([]);
                    setSuccessesSteps([]);
                    setCurrentStepNumber(0);
                }}/>
            </div>
            <Header>Progress:</Header>
            <ProgressTracker stepsConfig={stepsConfig.steps} currentStepNumber={currentStepNumber}
                             setCurrentStep={setCurrentStepNumber}
                             maxStepsInLine={nconf.get('maxStepsInProgressLine')} failedSteps={failedSteps} successesSteps={successesSteps}
                             executing={executing}/>
        </>
    );
};

VersionExecutor.propTypes = {
    stepsConfig: PropTypes.shape({
        name: PropTypes.string,
        steps: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            description: PropTypes.string,
            icon: PropTypes.string,
        })).isRequired,
    }),
};
VersionExecutor.defaultProps = {};

export default VersionExecutor;
