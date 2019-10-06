import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  Text,
} from 'react-native';
import Svg,{Defs,Pattern, Circle, G, Path, Text as SvgText, Rect, TextPath, TSpan } from 'react-native-svg';

var nodes = [
  {"name": "bulbasure", "image":"mother"}, // temprary centerNode
  {"name": "pikachu", "image":"son"},
  {"name": "squrtile", "image":"son"},

];

var links = [
  {"person1": "bulbasure", "person2": "pikachu", "relationship": "parent-child" },
  {"person1": "bulbasure", "person2": "squrtile", "relationship": "parent-child" },
];

class TestApp extends Component{
  constructor(props){
    super(props);
    this.state = {nodes:[]};
  }
  render(){
    return(
      <Graph centerNode = {nodes[0]} nodes = {nodes}/>
  );
  }
}


// used to render nodes and links in the right positions
class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerNode : this.props.centerNode,
      nodes: this.props.nodes,
      row1: [],
      row2: [],
      row3: [],


    };
    // check initiation
      console.log('graph initiated, centernode is ' + this.state.centerNode.name);
      console.log('nodes recieved: ');
      console.log(this.state.nodes);
    // error checking
    if (!this.state.nodes) {
      new Error('Graph started with empty nodes state: empty graph');
    }
  }
  /*
  find the person in the nodes object
  return them in a list of the nodes object format
  add the list to row in props,
  have the props display it
   */

  SortNodesIntoState(links){

    //add centernode into row2
     this.InsertInto(this.state.centerNode, 'row2');

     // loop over the relationships to determing positions
    for (var i = 0; i < links.length; i++) {

      let link = links[i];

      if (link.relationship == "parent-child"){
        if(link.person1 == this.state.centerNode.name){// if i am the parent

          // then person2 gets sent to row 3
          this.InsertInto(this.FindNode(link.person2), 'row3');

          // DEBUG:
          // console.log("row3 changed -newly added -----" );
          // console.log(this.MakeNodeComponent(node));

        }else if (link.person2== this.state.centerNode.name) {

          // then person1 get sent to row 1
          this.InsertInto(this.FindNode(link.person1), 'row1');
        }


      }
    }

    // return new Error('relationship between the nodes not in bound');
  }

  // takes name, finds node from this.state.nodes and returns it
  FindNode(name){
    for (var i = 0; i < this.state.nodes.length; i++) {
      if (this.state.nodes[i].name == name ) {
        return this.state.nodes[i];
      }
    }

    return new Error('FindNode error, no node with matching name in this.state.nodes');
  }
  // puts node in the row
  InsertInto(node, row){
    //copy state
    var newState = {...this.state};
    //mutates state
    newState[row].push(this.MakeNodeComponent(node));
    // set new state
    this.setState(newState);
  }

  componentDidMount(){
    this.SortNodesIntoState(links);
  }

  //acepts a node object and makes a Node with it
  MakeNodeComponent(node){
    return <Node name = {node.name} /> ;
  }

  render(){
    console.log('displaying graph node arrays below :');
    console.log(this.state.row1);
    console.log(this.state.row2);
    console.log(this.state.row3);

    /*

     */
    return(
      <View style={styles.elementsContainer}>
        <Row nodes = {this.state.row1}/>
        <Row nodes = {this.state.row2}/>
        <Row nodes = {this.state.row3}/>
      </View>
    )
  }

}

// each row consists of people from the same generation
class Row extends Component{
  constructor(props){
    super(props);
  };


  render(){

    if (!(this.props.nodes) ) { // if there is no nodes in this row
      return null;
    }

    return(
      <View style={styles.rowContainer}>
        {this.props.nodes}

      </View>);
  }
}

class Node extends Component{
  constructor(props){
    super(props);
    this.state = {
      name:'bulbasure',
      image: './stock-pokemon-photos/bulbasure.png ',
    };

  }

  UpdateState(){

    if (this.props.name) {
      (this.setState({name:this.props.name}))
      console.log( ' node: name update from-to '+  this.props.name + this.state.name);
    };
    if (this.props.image) {
      (this.setState({image:this.props.image}))
    };
  }

  // due to some weird thing with react unable to dynamicly load images not in use
  // UpdateImage(){
  //   const imgUrl = './stock-pokemon-photos/bulbasure.png ';
  //   return (<Image x="0%" y="0%" width="512" height="512" href={require (imgUrl)}clipPath="url(#clip)"  ></Image>);
  // }

  componentDidMount(){
    this.UpdateState();
  }

  render(){


    // defaults
    // viewbox is causing the clipping
    return(
      <View>
       <Image
         source={require('./stock-pokemon-photos/bulbasure.png')}
         //borderRadius style will help us make the Round Shape Image
         style={{ width: 60, height: 60, borderRadius: 100 / 2 }}
       />
       <Text style={styles.text}>{this.state.name}</Text>
     </View>
    )


  }
}

const styles = {
  container: {
    marginTop: 48,
    flex: 1
  },
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  elementsContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ecf5fd',
    // marginLeft: 24,
    // marginRight: 24,
    marginBottom: 24,
    paddingTop: 60,
  },
  rowContainer:{
    flex: 1 ,
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  text: {
    marginTop: 8,
    fontSize: 15,
    // width: 20,
    color: '#0250a3',
    fontWeight: 'bold',
    // textAlign: 'center'
  },
}

export default TestApp;
