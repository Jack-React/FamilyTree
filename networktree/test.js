import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import Svg,{ Circle, G, Path, Text, Rect } from 'react-native-svg';
class TestApp extends Component{
  constructor(props){
    super(props);
    this.state = {nodes:[]};
  }
  render(){
    return(
      <Svg height="100" width="100">
      <View>
        <Node/>
      </View>
    </Svg>
  );
  }
}

class Node extends Component{
  constructor(props){
    super(props);
    this.state = {name:'Frarthur'};
  }
  render(){
    return(
    <G>
       <Circle cx="50" cy="50" r="50" fill="pink" />
    </G>);
  }
}

export default TestApp;
