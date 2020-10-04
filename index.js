/**
 * @format
 */
import React from 'react'
import {GestureHandlerRootView,gestureHandlerRootHOC} from 'react-native-gesture-handler'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const Game = gestureHandlerRootHOC(()=>{
    return(
        <>
            <App/>
        </>
    )
})

AppRegistry.registerComponent(appName, () => Game);
