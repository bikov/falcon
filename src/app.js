import React from 'react';
import { connect } from 'react-redux';

import { nconf, fs, path } from './utills/electron-node';
import './app.css';
import { simpleAction } from './actions/simple-action';
import { Header } from 'semantic-ui-react';
import MainLayout from './layout/main-layout';

const pathInENV = process.env.FALCON_CONFIG_PATH;

// TODO: change
const pathToConfig = pathInENV || 'D:\\devl\\work\\falcon\\src\\config.json';
let configExist = false;
try {
    if (fs.existsSync(path.resolve(pathToConfig))) {
        nconf.file({file: path.resolve(pathToConfig)});
        configExist = true;
    }
} catch(e) {
    console.error(e);
}

const App = () => {
    return configExist ?
           (<MainLayout/>) :
           (<Header>
               {pathInENV ?
                `'FALCON_CONFIG_PATH' env was provided with value: '${pathInENV}' but cannot find file in this location` :
                `'FALCON_CONFIG_PATH' env not provided and cannot find config in path: ${pathToConfig}`}
           </Header>);
};

const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    simpleAction: () => dispatch(simpleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
