import React from 'react';
import { connect } from 'react-redux';
import './app.css';
import { simpleAction } from './actions/simple-action';
import { Header } from 'semantic-ui-react';
import MainLayout from './layout/main-layout';
import { isConfigExist, isPathInEnv } from './utills/load-config';

const App = () => {
    const pathInEnv = isPathInEnv();
    return isConfigExist() ?
           (<MainLayout/>) :
           (<Header>
               {pathInEnv ?
                `'FALCON_CONFIG_PATH' env was provided with value: '${pathInEnv}' but cannot find file in this location` :
                `'FALCON_CONFIG_PATH' env not provided and cannot find config in path: ${pathInEnv}`}
           </Header>);
};

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
