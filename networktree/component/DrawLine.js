import React, { Component } from 'react';
import {
  View
} from 'react-native';
import Svg, { G, Path, Rect, Line, } from 'react-native-svg';


export default class DrawLine extends Component{
  constructor(props){
    super(props);

  }

  render(){
    return(
      <View style={{position: 'absolute'}} >

      <Svg height="1000" width="1000">
        <Line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="red" strokeWidth="2" />
      </Svg>
      </View>
    );
  }
}
