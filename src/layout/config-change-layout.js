import React from 'react';
import { Header } from 'semantic-ui-react';
import { connect } from 'react-redux';
import ConfigChange from '../containers/config-change';

const ConfigChangeLayout = ({configChangesSettings}) => (
    <>
        <Header>Config Changes</Header>
        {configChangesSettings?.map((configChangesSetting, index) => <ConfigChange key={index} config={configChangesSetting}/>)}
    </>
);

ConfigChangeLayout.propTypes = {};
ConfigChangeLayout.defaultProps = {};

const mapStateToProps = ({config}) => {
    return ({
        configChangesSettings: config.configChangesSettings,
    });
};
export default connect(mapStateToProps)(ConfigChangeLayout);
