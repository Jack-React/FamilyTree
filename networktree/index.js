/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GraphApp from './components/graphMaker';
import TestApp from './test';

AppRegistry.registerComponent(appName, () => TestApp);
