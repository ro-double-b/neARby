import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';

class Create extends Component {

  renderForm() {
   
  }

  render() {
    return (
      <View style={styles.panel}>
        <Text style={styles.headingSmall}>make a spot</Text>
          <View style={styles.row}>
            <TouchableOpacity>
              <View style={styles.iconRow}>
                <Image style={styles.icons} source={require('../assets/cube.gif')}/>
                <Text style={styles.textCenter} >place</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.iconRowEnd}>
                <Image style={styles.icons} source={require('../assets/cube.gif')}/>
                <Text style={styles.textCenter} >event</Text>
              </View>
            </TouchableOpacity>
          </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  icons: {
    width: 100,
    height: 100,
  },
  panel: {
    backgroundColor: 'rgba(255,255,255,.9)',
    margin: 20,
    padding: 20,
    flex: 1
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  headingSmall: {
    fontSize: 25,
    fontFamily: 'AvenirNext-Medium',
    textAlign: 'center',
    padding: 10,
    paddingBottom: 15
  },
  iconRow: {
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,.5)',
    paddingLeft: 20,
    paddingRight: 20,
    opacity: 0.3
  },
  iconRowEnd: {
    paddingLeft: 20,
    opacity: 0.3
  },
  textCenter: {
    textAlign: 'center'
  }
});

export default Create;
