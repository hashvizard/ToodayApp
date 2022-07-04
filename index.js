/**
 * @format
 */
import React from 'react'
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './src/redux/reducers'
import { Provider } from 'react-redux'

const store = createStore(rootReducer, applyMiddleware(thunk))

const Redux = () => (
    <Provider store={store}>
        <App /> 
    </Provider>
  );

AppRegistry.registerComponent(appName, () => Redux);
