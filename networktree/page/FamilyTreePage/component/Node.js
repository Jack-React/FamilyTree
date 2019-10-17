import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

// constants
const default_node_image = '../../../assets/familytree/stock-pokemon-photos/bulbasure.png';

export default class Node extends Component{
  constructor(props){
    super(props);
    // defaults
      this.state = {
        id: 'a',
        name:'bulbasure',
        image: require(default_node_image), // current default image
        imageStyle: (styles.defaultNodeImageStyle),
    };


  }
  // this is stored in the nparent
  updateNodeLocation(name,location){
    this.props.updateNodeLocation(name,location);
  }

  updateCenterNode(id){
    this.props.updateCenterNode(id);
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
    if (this.props.imageStyle) {
      (this.setState({imageStyle:this.props.imageStyle}))
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

    }

  // due to some weird thing with react unable to dynamicly load images not in use
  // UpdateImage(){
  //   const imgUrl = './stock-pokemon-photos/bulbasure.png ';
  //   return (<Image x="0%" y="0%" width="512" height="512" href={require (imgUrl)}clipPath="url(#clip)"  ></Image>);
  // }

  componentDidMount(){
    this.UpdateState();
    console.log("node mounted:");
    console.log(this.props.node);
  }

  render(){
    // var icon = (this.props.image)? this.props.image : require('./stock-pokemon-photos/bulbasure.png')


    return(
      <View ref={(ref) => { this.marker = ref }}
        onLayout={({nativeEvent}) => {
        if (this.marker) {
          this.marker.measure((x, y, width, height, pageX, pageY) => {
            console.log('updating location for', this.state.name, x, y, width, height, pageX, pageY);
            var location = {
              "x" : pageX,
              "y" : pageY,
            };
            this.props.updateNodeLocation(this.state.name, location)
          })
        }
      }}>
		<TouchableOpacity style={styles.button} onPress={() => this.updateCenterNode(this.state.id)}>
			<Image
				source={this.state.image}
				style={this.state.imageStyle} />
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
  defaultNodeImageStyle:{ width: 60, height: 60, borderRadius: 100 / 2 },
  marriageNodeImageStyle: {
    width: 20,
    height: 20,
    borderRadius: 100 / 2
  },

}
