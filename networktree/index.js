/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import GraphApp from './components/graphMaker';
import GraphMaker from './page/FamilyTreePage/GraphMaker.js';

AppRegistry.registerComponent(appName, () => GraphMaker);
