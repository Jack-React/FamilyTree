import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Svg, { G, Path, Text as SvgText, Rect, Line, } from 'react-native-svg';
import DrawLine from './DrawLine';
import Node from './Node';
var debug= {
  'relationships': false,
  'graphInitiation': true,
}

const marriageNodeimg = '../../../assets/familytree/heart-outline.png';

// used to render nodes and links in the right positions
export default class Graph extends Component {
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
      noNodesHaveLocation: 0,
      relationships: [],  // relationships are drawn links
      directRelationships : { // to check weather a relationship should be drawn
        "parent-child" : true,
      },



    };
    // check initiation
    if (debug.graphInitiation) {
      console.log('graph initiated, centernode is ' + this.state.centerNode.name);
      console.log('initializing links', this.state.links);
      console.log('initializing nodes ', this.state.nodes);
    }


    // error checking
    if (!this.state.nodes) {
      new error('Graph started with empty nodes state: empty graph');
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

  // looks at the links and returns a node for each marriage and inserts into state
  MakeMarriageNode(person1, person2){
    var marriageNode = {
      "name": person1[0]+'-'+person2[0], "image":marriageNodeimg, "type": "husband-wife",
      "person1" : person1, "person2": person2};
    var newState = {...this.state};
    //mutates state
    // console.log(this.state);
    newState.nodes.push(marriageNode);
    // set new state
    this.setState(newState);
    console.log('marriageNode made between :', person1, person2);
    console.log(marriageNode);
    return marriageNode;
  }
  updateCenterNode(id){
    this.props.updateCenterNode(id);
    // console.log('Graph :you have touched ' + name);
  }


  // rewrites this.state.nodes to have new location attribute
  UpdateNodeLocation(name, location){
    for (var i = 0; i < this.state.nodes.length; i++) {
      if (this.state.nodes[i].name == name ) {
        var newState = {...this.state};
        //mutates state
        newState.nodes[i].location = location;
        newState.noNodesHaveLocation +=1;
        console.log(newState.noNodesHaveLocation, ' nodes have received location');
        // set new state
        this.setState(newState);
        // console.log('               location updated at:');
        // console.log(this.state.nodes[i]);
      }

  }
  this.MakeNodesDic();

  // also draws relationships
  // i could make more efficient by making it only get called once
  var allNodesHaveLocation = true;
  for (var i = 0; i < newState.nodes.length; i++) {
    // allNodesHaveLocation = true;
    if (!newState.nodes[i].location && newState.nodes[i].row) {
      allNodesHaveLocation = false;
    }
  }
  if (allNodesHaveLocation) {
    console.log('all nodes have location, starting to draw realationships');
    console.log(newState.nodes);
    this.RedrawRelationships(name);
  }


}

  DrawBetween(p1Loc, p2Loc){
    // if (this.state.relationships.length > 20) {
    //   return null;
    // }
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
      // console.log('connecting link' , this.state.links[i].person1, '->' , this.state.links[i].person2);
      // console.log('current state', this.state);
    }
  }

 // can be redrawrelationships between name and anything else that links with it and has a Location
 //  could probs make this more efficient if it is not called everytime a location is updated
 //  refactored so it draws a relationship when encountering a marriagenode
  RedrawRelationships(name, name2 = null){
    // eachtime it finds a marriageNode
    // it looks for the links which contains any of the names in the marriage nodes
    // and draws a line between them if all of them has locations
    for (var i = 0; i < this.state.nodes.length; i++) {
      var node = this.state.nodes[i];
      if (node.type == 'husband-wife') {


        // linking wife this line causes the crash, may be because of svg
        // guess ill just directly link the husband to wife then
        this.DrawBetween(this.state.nodesDic[node.person1].location,this.state.nodesDic[node.person2].location);
        for (var j = 0; j < this.state.links.length; j++) {
          var link =  this.state.links[j];
          if (node.person1 == link.person1 && !(node.person2 == link.person2)) {
            // draws aline with the marriage node if it is a child of the husband
            var p1Loc = this.state.nodesDic[node.name].location;
            var p2Loc = this.state.nodesDic[link.person2].location;
            if (p1Loc &&p2Loc ) console.log('linking', node.name, '->', link.person2);
            this.DrawBetween(p1Loc,p2Loc);
          }

        }
      }

  }
    return null;
  }


  WipeLocation(name){
    var newNode = this.FindNode(name);
    newNode.location = [];
    this.ReplaceNode(name, newNode);

  }
  ReplaceNode(name, node){
    var newState = {...this.state};
    //mutates state
    for (var i = 0; i < newState.nodes.length; i++) {
      if (newState.nodes[i].name == name) {
        newState.nodes[i] = node;
      }
    }
    // newState[row].push(this.MakeNodeComponent(node));
    // set new state
    this.setState(newState);
  }

  /*
  find the person in the nodes object
  return them in a list of the nodes object format
  add the list to row in props,
  have the props display it
   */

  SortNodesIntoState(links){
    var insertedNodes = []; // for keeping track of which nodes have been inserted via marriage

    //add centernode into row2
    this.InsertInto(this.state.centerNode, 'row2');
    insertedNodes.push(this.AddMarriagePartner(links,this.state.centerNode.name, 'row2'));


     // loop over the relationships to determing positions
     // the order of inserting into row should be center>parents>child>
    for (var i = 0; i < links.length; i++) {
      let link = links[i];
      if (debug.relationships) {
        console.log('checking link: ', link);
        console.log('centernode is : ', this.state.centerNode);
        console.log('is p1 or p2 centernode?',link.person1 == this.state.centerNode.name, link.person2== this.state.centerNode.name );
      }

      // if the none of the nodes has been inserted before
      if (!(insertedNodes.includes(link.person1) || insertedNodes.includes(link.person2))) {
        // console.log('inserted nodes includes: ', insertedNodes);


      // for all relationship is parent child
      // also if the other persons name is not on the traversed list
      if (link.relationship == "parent-child"){
        if(link.person1 == this.state.centerNode.name){// if i am the parent

          // then person2 gets sent to row 3
          this.InsertInto(this.FindNode(link.person2), 'row3');
          insertedNodes.push(this.AddMarriagePartner(links,link.person2, 'row3'));


        }else if (link.person2== this.state.centerNode.name) {

          this.InsertInto(this.FindNode(link.person1), 'row1');
          insertedNodes.push(this.AddMarriagePartner(links,link.person1, 'row1'));

        }

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

  // takes a name, looks through the links to see if they are married,
  // add marriage node and partner node if married
  // then return the partner node
  AddMarriagePartner(links, name,row){
    const imageStyle = (styles.marriageNodeImageStyle);
    const debug_mode = 1;
    if (debug_mode) console.log('finding marriage parter for ', name);
    for (var i = 0; i < links.length; i++) {
      let link = links[i];
    //   console.log('name - person1 - person2 :' ,name, link.person1,link.person2,
    //   ' realtionship: ', link.relationship,
    //   'testing if name match',(link.person1 == name)  ,(link.person2 == name)
    //
    // );
      if (
        link.relationship == 'husband-wife' &&
        link.person1 == name
    ) {
        if (debug_mode) console.log('partner is', link.person2);
        this.InsertInto(this.MakeMarriageNode(name,link.person2), row,imageStyle);
        this.InsertInto(this.FindNode(link.person2),row);
        return link.person2;

    } else if (
      link.relationship == 'husband-wife' &&
      link.person2 == name
      ) {
        if (debug_mode) console.log('partner is', link.person1);
        this.InsertInto(this.MakeMarriageNode(link.person1,name), row,imageStyle);
        this.InsertInto(this.FindNode(link.person1),row);
        return link.person1;
    }
    }

    return null;

  }
  // puts node in the row and changes its row attribute
  InsertInto(node, row, imageStyle = null){ // imagestyle could be change to a styles object later
    //copy state
    var newState = {...this.state};
    var newNode = this.FindNode(node.name);
    newNode['row'] = row;
    this.ReplaceNode(node.name, newNode);
    //mutates state
    newState[row].push(this.MakeNodeComponent(node,imageStyle));
    // set new state
    this.setState(newState);
  }

  componentDidMount(){
    this.SortNodesIntoState(this.state.links);
    // console.log('graph mounted');
    // this.ConnectNodes();

  }


  //acepts a node object and makes a Node with it
  MakeNodeComponent(node, imageStyle = null){
    console.log('making node component for');
    console.log(node);
    return (
      <View>
        <Node
          name = {node.name}
          image = {node.image}
          updateNodeLocation={this.UpdateNodeLocation.bind(this)}
          updateCenterNode={this.updateCenterNode.bind(this)}
          node = {node}
          imageStyle = {imageStyle}  />
      </View>
      )
  }

  render(){

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
  defaultNodeImageStyle:{ width: 60, height: 60, borderRadius: 100 / 2 },
  marriageNodeImageStyle: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2
  },

}
