/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SvgExample from './components/svgtest';
import AwesomeHierarchyGraph from 'react-native-d3-tree-graph'

var root = {
    name: "",
    id: 1,
    hidden: true,
    children: [ {
            name: "Q",
            id: 16,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        },
        {
        name: "",
        id: 2,
        no_parent: true,
        hidden: true,
        children: [{
            name: "J",
            id: 12,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "L",
            id: 13,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "C",
            id: 3,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "",
            id: 4,
            hidden: true,
            no_parent: true,
            children: [{
                name: "D",
                id: 5,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "",
                id: 14,
                hidden: true,
                no_parent: true,
                children: [{
                    name: "P",
                    id: 15,
                    imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                    nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                    nodeTextStyle: { fontSize: 12 }
                }]
            }, {
                name: "E",
                id: 6,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }, {
            name: "K",
            id: 11,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "G",
            id: 7,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 },
            children: [{
                name: "H",
                id: 8,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "I",
                id: 9,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }]
    }, {
        name: "M",
        id: 10,
        no_parent: true,
        imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
        nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
        nodeTextStyle: { fontSize: 12 },
        children: [

        ]
    },
    {
        name: "anoop",
        id: 155,
        no_parent: true,
        children: [{
            name: "H",
            id: 8,
        }, {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },

      ]
    },
    {
            name: "x",
            id: 16,
            no_parent: true
        }

  ]
}

var siblings = [{
    source: {
        id: 3,
        name: "C"
    },
    target: {
        id: 11,
        name: "K"
    }
}, {
    source: {
        id: 12,
        name: "L"
    },
    target: {
        id: 13,
        name: "J"
    }
}, {
    source: {
        id: 5,
        name: "D"
    },
    target: {
        id: 6,
        name: "E"
    }
}, {
    source: {
        id: 16,
        name: "Q"
    },
    target: {
        id: 10,
        name: "M"
    }
}];

class Example extends Component {
  render() {
    return (
        <View style={styles.container}>
        <AwesomeHierarchyGraph
         root = {root}
         siblings = {siblings}
        />
       </View>
    );
  }
}

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
            <SvgExample />
            <Example/>

          </View>
        </ScrollView>

      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default App;
