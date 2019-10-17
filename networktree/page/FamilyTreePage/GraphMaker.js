import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Svg, { G, Path, Text as SvgText, Rect, Line, } from 'react-native-svg';
import Graph from './component/Graph.js';

const ACCOUNTS = "http://52.14.226.1:8080/api/accounts";
var nodes = [
  {"name": "bulbasure", "image":require("../../assets/familytree/stock-pokemon-photos/bulbasure.png")}, // temprary centerNode
  // {"name": "pikachu", "image":require("./stock-pokemon-photos/pikachu.png")},
  // {"name": "squrtile", "image":require("./stock-pokemon-photos/squrtile.png")},
  // {"name": "Charmander", "image":require("./stock-pokemon-photos/charmander.png")},
  // {"name": "Charmeleon", "image":require("./stock-pokemon-photos/charmeleon.png")},
  // {"name": "Charizard", "image":require("./stock-pokemon-photos/charizard.png")},
  // {"name": "Ivysaur", "image":require("./stock-pokemon-photos/ivysaur.png")},
  // {"name": "Wartortle", "image":require("./stock-pokemon-photos/wartortle.png")},

];

var links = [
  {"person1": "bulbasure", "person2": "pikachu", "relationship": "parent-child" },
  // {"person1": "bulbasure", "person2": "squrtile", "relationship": "parent-child" },
  // {"person1": "Wartortle", "person2": "pikachu", "relationship": "parent-child" },
  // {"person1": "Wartortle", "person2": "squrtile", "relationship": "parent-child" },
  // {"person1": "Charmander", "person2": "bulbasure", "relationship": "parent-child" },
  // {"person1": "Charmeleon", "person2": "bulbasure", "relationship": "parent-child" },
  // {"person1": "Charizard", "person2": "Charmeleon", "relationship": "parent-child" },
  // {"person1": "Ivysaur", "person2": "Charmeleon", "relationship": "parent-child" },
  // {"person1": "Charizard", "person2": "Ivysaur", "relationship": "husband-wife" },
  // {"person1": "Charmander", "person2": "Charmeleon", "relationship": "husband-wife" },
  // {"person1": "Wartortle", "person2": "bulbasure", "relationship": "husband-wife" },
];

const marriageNodeimg = require('../../assets/familytree/heart-outline.png');

class GraphMaker extends Component{
	constructor(props){
		super(props);
        var inputNodes =nodes
		this.state = {
			nodes:JSON.parse(JSON.stringify(inputNodes)),  // makes a deep copy of the original
            originalNodes: inputNodes,
			centerNode: inputNodes[0], // hardcoded center node
			links: links,
            updated: true
		};
    }

    componentDidMount() {
        var centerUsrId = '597b0ddfe8e0bd240cc166f2f1ececb493cfda372865096fc84bb9ecbd362c55';

        this.getDatafromAPI(centerUsrId);
    }

    getDatafromAPI(userid) {
        // fetch data from server
        // this is the url of server for links and nodes
        // ! The centerUsrId is for testing here, you may change it to google user id when runing in Family3
        linkUrl = ACCOUNTS + "/relations/" + userid;
        nodeUrl = ACCOUNTS + "/relationsinfo/" + userid;

        // Actually, Networking is an inherently asynchronous operation.
        // Fetch methods will return a Promise that makes it straightforward
        // to write code that works in an asynchronous manner:
        var firstAPICall = fetch(linkUrl);
        var secondAPICall = fetch(nodeUrl);

        // And here is how we deal with the promise return by fetch()
        // Promise.all() is a function deal with multiple promise, and for details reading the page below
        // https://medium.com/@gianpaul.r/fetching-from-multiple-api-endpoints-at-once-ffb1b54600f9
        Promise.all([firstAPICall, secondAPICall])
            .then(responses => Promise.all(responses.map(res => res.json())))
            .then(responseJsons => {
                var links = responseJsons[0].data;
                var nodes = responseJsons[1].data;

                this.idToName(links, nodes);

                console.log("new links is...")
                console.log(links);

                console.log("center node is ...")
                console.log(this.FindNode(nodes, userid))

                this.setState({
                    centerNode: this.FindNode(nodes, userid),
                    originalNodes: JSON.parse(JSON.stringify(this.state.originalNodes)),
                    links: links,
                    nodes: nodes,
                    updated: false
                }, function () {

                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    idToName(links, nodes) {
        links.forEach(element => {
            var person1id = element.person1;
            element.person1 = this.findName(nodes, person1id);
            var person2id = element.person2;
            element.person2 = this.findName(nodes, person2id);
        });
    }

    findName(nodes, id) {
        for (var i = 0; i < nodes.length; i++) {
            if (id == nodes[i]._id)
                return nodes[i].name;
        }
    }

    UpdateCenterNode(id) {
        this.setState({
            updated: true
        });
        this.getDatafromAPI(id);
        // console.log('test app state while updating centernode');
        // console.log(nodes);
	}

  //update image urls to require, for dynamic image loading and replaces the state
  // UpdateImageUrls(nodes){
  //   var newNodes = JSON.parse(JSON.stringify(nodes));
  //   for (var i = 0; i < newNodes.length; i++) {
  //     newNodes[i].image = require(nodes[i].image);
  //   }
  //   var newState = {...this.state};
  //   //mutates state
  //   // console.log(this.state);
  //   newState.nodes = newNodes;
  //   // set new state
  //   this.setState(newState);
  //
  //
  //
  // }


    FindNode(nodes, id) {
		for (var i = 0; i < nodes.length; i++) {
			if (id == nodes[i]._id) {
				return nodes[i];
			}
		}
		return new Error('FindNode error, no node with matching name in this.state.nodes');
	}

    render() {
        if (this.state.updated) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            )
        }
		console.log('re rendering Graph: displaying  state  ');
		console.log(this.state);
		return(
            < Graph
                centerNode = { this.state.centerNode }
                nodes = { this.state.nodes }
                links = { this.state.links }
                updateCenterNode = { this.UpdateCenterNode.bind(this) }
            />
		);
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

export default GraphMaker;
