import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import Svg,{Defs,Pattern,Image, Circle, G, Path, Text, Rect } from 'react-native-svg';
class TestApp extends Component{
  constructor(props){
    super(props);
    this.state = {nodes:[]};
  }
  render(){
    return(
      <Graph/>
  );
  }
}
var nodes = [
  {"name": "bulbasure", "image":"mother"},
  {"name": "pikachu", "image":"son"},
  // {"id": "Carol"}
];

var links = [
  {"person1": "bulbasure", "person2": "pikachu", "relationship": "parent-child" },
  // {"source": "Bob", "target": "Carol" }
];

// used to render nodes and links in the right positions
class Graph extends Component {
  constructor(props) {
    super(props);
    const centerNode = this.props.centerNode; // i am in the center

  }
  /*
  find the person in the nodes object
  return them in a list of the nodes object format
  add the list to row in props,
  have the props display it
   */

  SortNodes(links){
    // loop over the relationships to determing positions
    for (var i = 0; i < links.length; i++) {
      let link = links[i]
      if (link.relationship == "parent-child"){
        if(link.person1 == centerNode){// if i am the parent
          // then person2 gets sent to row 3
        }else if (link.person2== centerNode) {
          // then person1 get sent to row 1
        }
      }
    }

    return new Error('relationship between the nodes not in bound');
  }

  //acepts a node object and makes a Node with it
  MakeNode(node){

    return ;
  }

  render(){
    /*

     */
    return(
      <View style={styles.elementsContainer}>
        <Node/>
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
    this.state = {name:'Frarthur'};
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
      name:'',
      image: './stock-pokemon-photos/bulbasure.png ',
    };

  }

  UpdateState(){
    (this.name) ? (this.setState({name:this.name})): (this.setState({name:'Default'}));
    if (this.image) {
      (this.setState({image:this.image}))
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
      <Svg height="512" width="512">
        <G>

        <Defs>
          <Pattern id="image" x="0%" y="0%" height="100%" width="100%"
                   viewBox="0 0 512 512">
          <Image x="0%" y="0%" width="512" height="512" href={require ('./stock-pokemon-photos/bulbasure.png')}clipPath="url(#clip)"  ></Image>
          </Pattern>
        </Defs>

        <Circle id="sd" class="medium" cx="5%" cy="40%" r="5%" fill="url(#image)" stroke="lightblue" stroke-width="0.5%" />
        </G>
      </Svg>
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
    // marginBottom: 24,
    paddingTop: 80,
  },
  rowContainer:{
    flex: 1 ,
    flexDirection: 'row',
    justifyContent: 'space-around',

  }
}

export default TestApp;
