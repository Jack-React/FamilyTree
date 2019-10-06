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
  // {"id": "Carol"}
];

var links = [
  {"person1": "bulbasure", "person2": "pikachu", "relationship": "parent-child" },
  {"person1": "bulbasure", "person2": "squrtile", "relationship": "parent-child" },
  // {"source": "Bob", "target": "Carol" }
];

class TestApp extends Component{
  constructor(props){
    super(props);
    this.state = {nodes:[]};
  }
  render(){
    return(
      <Graph centerNode = {nodes[0]}/>
  );
  }
}


// used to render nodes and links in the right positions
class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerNode : this.props.centerNode,
      //display generational rows
      row1: [],
      row2: [],
      row3: [],


    };
    // const centerNode = this.props.centerNode; // i am in the cente
      console.log('graph initiated, centernode is ' + this.state.centerNode.name);
  }
  /*
  find the person in the nodes object
  return them in a list of the nodes object format
  add the list to row in props,
  have the props display it
   */

  SortNodesIntoState(links){

    //add centernode into row2
    this.setState(previousState => ({
         row2: [...previousState.row2, this.MakeNode(this.state.centerNode)]
     }));

     // loop over the relationships to determing positions
    for (var i = 0; i < links.length; i++) {

      let link = links[i];
      let node ={"name": "bulbasure", "image":"mother"};


      if (link.relationship == "parent-child"){
        if(link.person1 == this.state.centerNode.name){// if i am the parent
          node.name = link.person2;
          // then person2 gets sent to row 3
          // this.state.row3.push(MakeNode(link));


          // push to array
          // this.setState({ row3: [...this.state.row3, this.MakeNode(node)] });
          // // Create a new array based on current state:
          // let row3 = [...this.state.row3];
          //
          // // Add item to it
          // row3.push(this.MakeNode(node));
          // console.log(row3);
          //
          // // Set state doesnt update till the end of the function
          // this.setState({ row3 :row3 });

          this.setState(previousState => ({
               row3: [...previousState.row3, this.MakeNode(node)]
           }));

          // DEBUG:
          console.log("row3 changed -newly added -----" );
          console.log(this.MakeNode(node));

        }else if (link.person2== this.state.centerNode.name) {
          node.name = link.person1;
          // then person1 get sent to row 1
          // this.state.row1.push(MakeNode);
          this.setState({ row1: [...this.state.row1, this.MakeNode(node)] });
        }


      }
    }

    // return new Error('relationship between the nodes not in bound');
  }

  componentDidMount(){
    this.SortNodesIntoState(links);
  }

  //acepts a node object and makes a Node with it
  MakeNode(node){
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
        <Node name = "b1"/>
        <Node/>
        <Node/>
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
        <Node/>
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
