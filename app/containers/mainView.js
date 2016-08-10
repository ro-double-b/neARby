import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  //DeviceEventEmitter is imported for geolocation update
  DeviceEventEmitter
} from 'react-native';

import Camera from 'react-native-camera';
import WebViewBridge from 'react-native-webview-bridge';
import { RNLocation as Location } from 'NativeModules';
import html from '../webview/html';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';

Actions.fetchPlaces();

//this script will be injected into WebViewBridge to communicate
const injectScript = `
  (function () {
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        var message = JSON.parse(message);

        if (message.type === "cameraPosition") {

          //sets threejs camera position as gps location changes
          camera.position.set( message.deltaX, 0, 0 - message.deltaZ );
          WebViewBridge.send("in WebViewBridge, got cameraPosition: " + JSON.stringify(message) + " this is the camera" + JSON.stringify(camera));
        
        } else if (message.type === "heading") {

          //followings are global variables that allows html to render scene
          heading = message.heading;
          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
          controls = new THREE.DeviceOrientationControls( camera, true );

          //animate function comes from html string
          animate();

          // setInterval(function(){
          //   displacementX += 0.1;
          //   // displacementZ -= 1;
          //   camera.position.set( displacementX, 0, 0 );
          // }, 1000)

          WebViewBridge.send("heading received");
        }
      };

      WebViewBridge.send("webview is loaded");
    }
  }());
`;

//cameraCallback, loggerCallback are optional
const calculateDistance = (coords1, coords2, cameraCallback, loggerCallback) => {
  //earth circumference in meters
  const earthCircumference = 40075000;
  //deltaX is change in east to west position, east is positive, west is negative
  //deltaZ is change in north to south position, north is positive, south is negative
  let deltaX = (coords2.longitude - coords1.longitude) / 360 * earthCircumference;
  let deltaZ = (coords2.latitude - coords1.latitude) / 360 * earthCircumference;
  let distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

  //this callback is pass all the way down from initGeolocation;
  if (cameraCallback) {
    cameraCallback({ type: 'cameraPosition', deltaX: deltaX, deltaZ: deltaZ, distance: distance });
  }

  //this is only for debugging purposes to show deltaX, deltaZ on screen, should remove later
  if (loggerCallback) {
    loggerCallback(deltaX, deltaZ, distance);
  }

  return {
    deltaX: deltaX,
    deltaZ: deltaZ,
    distance: distance
  };
};


// Actions.fetchPlaces();
class mainView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialHeadingString: 'unknown',
      initialPositionString: 'unknown',
      currentPositionString: 'unknown',
      lastAPICallPositionString: 'unknown',
      distanceFromLastAPICallString: 'unknown',
      lastAPICallPosition: null,
      initialHeading: null,
      initialPosition: null,
      currentPosition: null,
      deltaX: null,
      deltaZ: null,
    };
  }

  componentDidMount() {
    // this.props.action.fetchPlaces();
  }

  componentWillUnmount() {
    //this will stop the location update
    Location.stopUpdatingLocation();
  }

  startDeviceLocationUpdate() {
    Location.requestAlwaysAuthorization();
    Location.setDesiredAccuracy(1);
  }

  //grabs the initial orientation of device
  initOrientation(callback) {
    //heading is the orientation of device relative to true north
    Location.startUpdatingHeading();
    this.getInitialHeading = DeviceEventEmitter.addListener(
      'headingUpdated',
      (data) => {
        console.log('got heading', data);
        this.setState({
          initialHeadingString: JSON.stringify(data),
          initialHeading: data.heading
        });

        callback({type: 'heading', heading: data.heading});
      }
    );
  }

  //initGeolocation gets the initial geolocation and set it to initialPosition state
  initGeolocation(cameraCallback, placesCallback) {
    //this will listen to geolocation changes and update it in state
    Location.startUpdatingLocation();
    this.getInitialLocation = DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {
        console.log('initGeolocation', location);

        this.setState({
          initialPositionString: JSON.stringify(location),
          initialPosition: location.coords,
        });
      }
    );

    //wait 7 seconds to get a more accurate location reading, remove getInitialLocation listner after that
    setTimeout(() => {
      this.getInitialLocation.remove();
      this.watchGeolocation(cameraCallback, placesCallback);
    }, 7000);
  }

  //watchGeolocation will subsequenly track the geolocation changes and update it in lastPosition state
  watchGeolocation(cameraCallback, placesCallback) {
    //Location.requestAlwaysAuthorization must be called before Location.startUpdatingLocation, both are functions from react-native-location
    Location.setDesiredAccuracy(1);
    Location.setDistanceFilter(1);
    Location.startUpdatingLocation();

    //this will listen to geolocation changes and update it in state
    DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {
        console.log('location', location);

        if (!this.state.lastAPICallPosition) {
          this.setState({
            lastAPICallPositionString: JSON.stringify(location),
            lastAPICallPosition: location.coords
          });
        }

        this.setState({
          currentPositionString: JSON.stringify(location),
          currentPosition: location.coords
        });


        if (placesCallback) {
          let distanceFromLastAPICallPosition = calculateDistance(this.state.lastAPICallPosition, location.coords);
          if (distanceFromLastAPICallPosition > 10) {
            //ajax call here to get new places around you
            //dummy data for now, data will be send to webviewbridge
            let places = {type: 'places', places: ['test']};
            placesCallback(places);

            //also update the lastAPICallPosition to current position
            this.setState({
              lastAPICallPositionString: JSON.stringify(location),
              lastAPICallPosition: location.coords
            });
          }
        }

        //this displays the info on screen, only use for debugging
        let loggerCallback = (deltaX, deltaZ, distance) => {
          this.setState({deltaX: deltaX, deltaZ: deltaZ, distanceFromLastAPICallString: distance.toString()});
        };

        if (cameraCallback) {
          calculateDistance(this.state.initialPosition, location.coords, cameraCallback, loggerCallback);
        }
      }
    );
  }

  //onBridgeMessage will be pass down to WebViewBridge to allow the native componenent to communicate to the webview;
  onBridgeMessage(message) {
    const { webviewbridge } = this.refs;

    let updateThreeJSCamera = (newCameraPosition) => {
      webviewbridge.sendToBridge(JSON.stringify(newCameraPosition));
    };

    let updatePlaces = (places) => {
      webviewbridge.sendToBridge(JSON.stringify(places));
    };

    //webview will send 'webview is loaded' back when the injectedScript is loaded
    if (message === 'webview is loaded') {
      this.startDeviceLocationUpdate();

      //once bridge injectedScript is loaded, send over heading to orient threejs camera
      this.initOrientation.call(this,
        (initialHeading) => {
          console.log('initialHeading', initialHeading);
          webviewbridge.sendToBridge(JSON.stringify(initialHeading));
          this.getInitialHeading.remove();
        });

    } else if (message === 'heading received') {
      //once threejs camera is oriented, send the camera position to webview,
      //if distance exceed a certain treashold, updatePlaces will be called to fetch new locations
      this.initGeolocation.call(this, updateThreeJSCamera, updatePlaces);

    } else {
      console.log(message);
    }

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
          <WebViewBridge
            ref="webviewbridge"
            onBridgeMessage={this.onBridgeMessage.bind(this)}
            injectedJavaScript={injectScript}
            source={{html}}
            style={{backgroundColor: 'transparent'}}
          />
        </Camera>
        <View>
          <Text>
            <Text style={styles.title}>Initial position: </Text>
            {this.state.initialPositionString}
          </Text>
          <Text>
            <Text style={styles.title}>Current position: </Text>
            {this.state.currentPositionString}
          </Text>
          <Text>
            <Text style={styles.title}>Last API call position: </Text>
            {this.state.lastAPICallPositionString}
          </Text>
          <Text>
            <Text style={styles.title}>Current heading: </Text>
            {this.state.initialHeading}
          </Text>
          <Text>
            <Text style={styles.title}>DeltaX from 0,0: </Text>
            {1 * this.state.deltaX}
          </Text>
          <Text>
            <Text style={styles.title}>DeltaZ from 0,0: </Text>
            {-1 * this.state.deltaZ}
          </Text>
          <Text>
            <Text style={styles.title}>Distance from last API call: </Text>
            {this.state.distanceFromLastAPICallString}
          </Text>
        </View>
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
  return {
    places: state.places.collection
  };
};

const mapDispatchToProps = function(dispatch) {
  return { action: bindActionCreators(Actions, dispatch) };
};

export default connect(mapStateToProps, mapDispatchToProps)(mainView);
