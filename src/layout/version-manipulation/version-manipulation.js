import React from 'react';
import { Accordion, Header } from 'semantic-ui-react';
import VersionExecutor from '../../containers/version-executor/version-executor';
import { connect } from 'react-redux';

const getTabs = (versionManipulationConfigs) =>
    versionManipulationConfigs?.map((config, index) => ({
        key: index,
        title: config.name,
        content: {
            content: <VersionExecutor stepsConfig={config}/>,
        },
    }));

const VersionManipulation = ({versionManipulationSettings}) => {
    return (
        <>
            <Header>Version Manipulation</Header>
            <Accordion fluid styled exclusive={false}
                       panels={getTabs(versionManipulationSettings)}/>
        </>
    );
};

const mapStateToProps = ({config}) => {
    return ({
        versionManipulationSettings: config.versionManipulationSettings,
    });
};

export default connect(mapStateToProps)(VersionManipulation);