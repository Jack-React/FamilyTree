import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import Svg,{Defs,Pattern, Circle, G, Path, Text as SvgText, Rect, TextPath, TSpan, Line,} from 'react-native-svg';

var nodes = [
  {"name": "bulbasure", "image":"mother"}, // temprary centerNode
  {"name": "pikachu", "image":"son"},
  {"name": "squrtile", "image":"son"},

];

var links = [
  {"person1": "bulbasure", "person2": "pikachu", "relationship": "parent-child" },
  {"person1": "bulbasure", "person2": "squrtile", "relationship": "parent-child" },
];

var sampleLocation =
  {"x": "12", "y": "43", "z": "0" };

class TestApp extends Component{
	constructor(props){
		super(props);
		this.state = {
			nodes:nodes,
			centerNode: nodes[0], // hardcoded center node
			links: links,
			updated: false
		};
	}

	UpdateCenterNode(name){
		this.setState({
			centerNode: this.FindNode(name),
			updated: true
		})
	}

	FindNode(name){
		for (var i = 0; i < this.state.nodes.length; i++) {
			if (this.state.nodes[i].name == name ) {
				return this.state.nodes[i];
			}
		}
		return new Error('FindNode error, no node with matching name in this.state.nodes');
	}

	MakeGraph(centerNode){
		if (this.state.updated == true){
			this.setState({updated: false});
			return null
		}
		else {
			return (
				<Graph 
					centerNode = {centerNode} 
					nodes = {this.state.nodes} 
					links = {this.state.links}
					updateCenterNode={this.UpdateCenterNode.bind(this)}
				/>
			)
		}
	}
	// 	console.log("!@#", centerNode)
	// 	if (centerNode.name == 'pikachu'){
	// 		console.log("QWE")
	// 		return (
	// 			// <Graph 
	// 			// 	centerNode = {nodes[0]} 
	// 			// 	nodes = {this.state.nodes} 
	// 			// 	links = {this.state.links}
	// 			// 	updateCenterNode={this.UpdateCenterNode.bind(this)}
	// 			// />
	// 			<View><Text>123</Text></View>
	// 		);
	// 	}
	// 	else {
	// 		console.log("AAA")
	// 		return (
	// 			<Graph 
	// 				centerNode = {nodes[1]} 
	// 				nodes = {this.state.nodes} 
	// 				links = {this.state.links}
	// 				updateCenterNode={this.UpdateCenterNode.bind(this)}
	// 			/>
	// 		// <View><Text>123</Text></View>

	// 		);
	// 	}
	// }

	render(){
		console.log('re rendering Graph: displaying  state  ');
		// console.log(this.state);
		return(
			this.MakeGraph(this.state.centerNode)
		);
	}
}


// used to render nodes and links in the right positions
class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centerNode : this.props.centerNode, // this is me
      nodes: this.props.nodes,
      links: this.props.links,
      row1: [],          // one row per generation displayed
      row2: [],
      row3: [],
      nodesDic: {},       // converted nodes to dic for easier acess
      relationships: [],  // relationships are drawn links
      directRelationships : { // to check weather a relationship should be drawn
        "parent-child" : true,
      },


    };
    // check initiation
    //   console.log('graph initiated, centernode is ' + this.state.centerNode.name);
    //   console.log('nodes recieved: ');
    //   console.log(this.state.nodes);
    // error checking
    if (!this.state.nodes) {
      new Error('Graph started with empty nodes state: empty graph');
    }
  }

  MakeNodesDic(){
    var newState = {...this.state};
    for (var i = 0; i < this.state.nodes.length; i++) {

      newState.nodesDic[this.state.nodes[i].name] = this.state.nodes[i];

    //   console.log('adding to nodesDic'  + this.state.nodes[i].name);

    }
    this.setState(newState);
    // console.log('finished adding to nodesDic');
    // console.log(this.state.nodesDic);
  }

  updateCenterNode(name){
    this.props.updateCenterNode(name);
    // console.log('Graph :you have touched ' + name);
  }


  // rewrites this.state.nodes to have new location attribute
  UpdateNodeLocation(name, location){
    for (var i = 0; i < this.state.nodes.length; i++) {
      if (this.state.nodes[i].name == name ) {
        var newState = {...this.state};
        //mutates state
        newState.nodes[i].location = location;
        // set new state
        this.setState(newState);
        // console.log('               location updated at:');
        // console.log(this.state.nodes[i]);
      }

  }
  this.MakeNodesDic();

  // also draws relationships
  this.RedrawRelationships(name);
}


  RedrawRelationships(name){
    for (var i = 0; i < this.state.links.length; i++) {
      if (this.state.links[i].person1 == name || this.state.links[i].person2 == name) {
        // then find location of person1 and person 2 and draw a line between them
        // if person1 and person2 has a location inside nodesDic
        var p1Loc = this.state.nodesDic[this.state.links[i].person1].location;
        var p2Loc = this.state.nodesDic[this.state.links[i].person2].location;
        if (p1Loc &&p2Loc ) {
          var newState = {...this.state};
          //add a line connecting them
          //only accepts strings so gotta coner the objects
          var x1 = JSON.stringify(p1Loc.x);
          var y1 = JSON.stringify(p1Loc.y);
          var x2 = JSON.stringify(p2Loc.x);
          var y2 = JSON.stringify(p2Loc.y);

          newState.relationships.push(<View><DrawLine x1= {x1} y1= {y1} x2= {x2} y2= {y2}/></View>);
          // set new state
          this.setState(newState);
        }

      }
    }

    // console.log('printing relationships');
    // console.log(this.state.relationships);
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
    // console.log('graph mounted');
    // this.ConnectNodes();

  }

//   ReMakeStateFromProp(){
//     var state = {
//       centerNode : this.props.centerNode, // this is me
//       nodes: this.props.nodes,
//       links: this.props.links,
//       row1: [],          // one row per generation displayed
//       row2: [],
//       row3: [],
//       nodesDic: {},       // converted nodes to dic for easier acess
//       relationships: [],  // relationships are drawn links
//       directRelationships : { // to check weather a relationship should be drawn
//         "parent-child" : true,
//
//       }
//     }
//     this.setState(state);
// }

  // componentWillReceiveProps(nextProps){
  //   // this.ReMakeStateFromProp();
  //   this.constructor(this.props);
  //   this.SortNodesIntoState(links);
  //   console.log('recieved props');
  // }

  //acepts a node object and makes a Node with it
  MakeNodeComponent(node){
    return (
      <View>
        <Node
          name = {node.name}
          updateNodeLocation={this.UpdateNodeLocation.bind(this)}
          updateCenterNode={this.updateCenterNode.bind(this)}  />
      </View>
      )
  }

  render(){
    // console.log('displaying graph node arrays below :');
    // console.log(this.state.row1);
    // console.log(this.state.row2);
    // console.log(this.state.row3);
    // console.log('current state is');
    // console.log(this.state);

    /*

     */
    return(


      <View style={styles.elementsContainer}>



        <View>
        {this.state.relationships}
        </View>

        <Row nodes = {this.state.row1} key = 'row1'/>
        <Row nodes = {this.state.row2} key = 'row2'/>
        <Row nodes = {this.state.row3} key = 'row3'/>
      </View>


    )
  }

}
// <Svg height="1000" width="1000">
//   <Line x1="171.42857360839844" y1="267" x2="278.4761962890625" y2="475" stroke="red" strokeWidth="2" />
// </Svg>
// used to render lines
class DrawLine extends Component{
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
// <Svg height="1000" width="1000">
//   <Line x1={this.props.x1} y1={this.props.y1} x2={this.props.x2} y2={this.props.y2} stroke="red" strokeWidth="2" />
// </Svg>
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
  // this is stored in the nparent
  updateNodeLocation(name,location){
    this.props.updateNodeLocation(name,location);
  }

  updateCenterNode(name){
    this.props.updateCenterNode(name);
    // console.log('you have touched' + this.state.name);
  }

  UpdateState(){

    if (this.props.name) {
      (this.setState({name:this.props.name}))
    //   console.log( ' node: name update from-to '+  this.props.name + this.state.name);
    };
    if (this.props.image) {
      (this.setState({image:this.props.image}))
    };
    // updateNodeLocation(this.state.name, );
  }


  measureView(event) {
    // console.log('event peroperties: ',  event.nativeEvent.layout.x, event.nativeEvent.layout.y,);
    this.setState({
            x: event.nativeEvent.layout.x,
            y: event.nativeEvent.layout.y,
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height
        })

  // this works when put into node view method
  //       ref={(ref) => { this.marker = ref }}
  // onLayout={({nativeEvent}) => {
  //   if (this.marker) {
  //     this.marker.measure((x, y, width, height, pageX, pageY) => {
  //               console.log(x, y, width, height, pageX, pageY);
  //      })
  //   }
  // }}

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


    return(
      <View ref={(ref) => { this.marker = ref }}
        onLayout={({nativeEvent}) => {
        if (this.marker) {
          this.marker.measure((x, y, width, height, pageX, pageY) => {
            console.log(this.state.name, x, y, width, height, pageX, pageY);
            var location = {
              "x" : pageX,
              "y" : pageY,
            };
            this.props.updateNodeLocation(this.state.name, location)
          })
        }
      }}>
		<TouchableOpacity style={styles.button} onPress={() => this.updateCenterNode(this.state.name)}>
			<Image
				source={require('./stock-pokemon-photos/bulbasure.png')}
				//borderRadius style will help us make the Round Shape Image
				style={{ width: 60, height: 60, borderRadius: 100 / 2 }} />
			<Text style={styles.text}>{this.state.name}</Text>
		</TouchableOpacity>
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
    paddingTop: 0,
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
  lineStyle:{
    position: 'absolute',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
}

export default TestApp;
