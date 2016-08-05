import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView,
  Image
} from 'react-native';

import Camera from 'react-native-camera';




class mainView extends Component {
  constructor() {
    super();
  }
  
  componentDidMount() {
    
  }

  render() {
    return (
      <View style={{flex: 1}}>
      <Camera
        ref={(cam) => {
        this.camera = cam;
        }}
        style={styles.preview}
        aspect={Camera.constants.Aspect.fill}>
        <WebView
        source={{uri: 'http://pyrys-macbook-pro.local:3000'}}
        style={{backgroundColor: 'transparent'}}
        />
      </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,1)'
  },
  preview: {
    flex: 1
  }
});

export { mainView };
