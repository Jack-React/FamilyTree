/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GraphApp from './components/graphMaker';
import TestApp from './page/FamilyTreePage/test.js';

AppRegistry.registerComponent(appName, () => TestApp);
