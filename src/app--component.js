/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
//import 'babel-polyfill';

// Import all the third party stuff
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
//import 'sanitize.css/sanitize.css';

// Import root app
import App from './containers/App';

// Import Language Provider
import LanguageProvider from './containers/LanguageProvider';

// Import CSS reset and Global Styles
//import './global-styles';
//import './style/main.scss';

import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with historys
const initialState = {};

const store = configureStore(initialState);

class DataList extends Component {
    constructor(){
        super();
    }

    render () {
        return (
            <Provider store={store}>
                <LanguageProvider locale='en' messages={translationMessages}>
                    <App dataListConfig={this.props.config}> </App>
                </LanguageProvider>
            </Provider>
        );
    }
}

export default DataList;
//exports.default = DataList;