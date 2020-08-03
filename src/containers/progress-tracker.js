import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Loader, Step } from 'semantic-ui-react';

const chunkArray = (array, chunkSize) => {
    return [].concat.apply([],
        array.map(function (elem, i) {
            return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
        }));
};
const getIcon = (index, defaultIcon, isFailed, isSuccess, executing) => {
    return executing === index ? <Loader active inline/> :
           isFailed ? <Icon color='red' name='x'/> : (isSuccess ? <Icon color='green'
                                                                        name='check'/> : defaultIcon);
};

const getStep = (stepConfig, index, currentStepNumber, isFailed, isSuccess, executing, setCurrentStep) => {
    return (
        <Step key={index}
              onClick={() => setCurrentStep(index)}
              icon={getIcon(index, stepConfig.icon, isFailed, isSuccess, executing)}
              title={`${index}: ${stepConfig.title}`}
              description={stepConfig.description}
              active={currentStepNumber === index}
              disabled={executing !== undefined}
        />
    );
};

const getSteps = (stepsConfig, currentStepNumber, maxStepsInLine, failedSteps, successesSteps, executing, setCurrentStep) => {
    const stepsArr = stepsConfig.map((value, index) => {
        return getStep(value, index, currentStepNumber, failedSteps.includes(index), successesSteps.includes(index), executing, setCurrentStep);
    });
    return chunkArray(stepsArr, maxStepsInLine).map((stepGroup, index) => <Step.Group key={index}
                                                                                      widths={maxStepsInLine}
                                                                                      items={stepGroup}/>);
};

const ProgressTracker = ({stepsConfig, currentStepNumber, maxStepsInLine, failedSteps, successesSteps, executing, setCurrentStep}) => {
    return (
        <>
            {getSteps(stepsConfig, currentStepNumber, maxStepsInLine, failedSteps, successesSteps, executing, setCurrentStep)}
        </>
    );
};

ProgressTracker.propTypes = {
    stepsConfig: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        icon: PropTypes.string,
    })).isRequired,
    currentStepNumber: PropTypes.number,
    maxStepsInLine: PropTypes.number,
    failedSteps: PropTypes.arrayOf(PropTypes.number),
    successesSteps: PropTypes.arrayOf(PropTypes.number),
    executing: PropTypes.number,
    setCurrentStep: PropTypes.func,
};
ProgressTracker.defaultProps = {
    stepsConfig: [],
    currentStepNumber: 0,
    maxStepsInLine: 5,
    failedSteps: [],
};

export default ProgressTracker;
