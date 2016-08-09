import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
import html from '../webview/html';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import Camera from 'react-native-camera';
import GeolocationExample from './geoLocation';
// this loads the three.js DeviceOrientationControls library
import DeviceOrientationControls from '../lib/DeviceOrientationControls';
// import RenderScene from '../../webView/RenderScene';


Actions.fetchPlaces();
class mainView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.action.fetchPlaces();
    console.log(this.props.places, ' PLACES');
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
            source={{html}}
            style={{backgroundColor: 'transparent'}}
          />
        <View>
          <GeolocationExample/>
        </View>
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

const mapStateToProps = function(state) {
  console.log(state, ' STATE');
  return {
    places: state.places.collection
  };
};

const mapDispatchToProps = function(dispatch) {
  return { action: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainView);