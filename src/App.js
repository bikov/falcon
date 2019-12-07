import React from 'react';
import { connect } from 'react-redux';

import { nconf, path } from './utills/electron-node';
import './app.css';
import { simpleAction } from './actions/simple-action';
import MainLayout from './layout/main-layout/main-layout';

nconf
    .file({file: path.resolve('./src/config.json')})
    .file({file: path.resolve('D:/falcon/config.json')});


const App = (props) => {
    return (
        <MainLayout/>
    );
};

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
