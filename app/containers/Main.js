import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  //DeviceEventEmitter is imported for geolocation update
  DeviceEventEmitter,
  WebView,
  TouchableHighlight
} from 'react-native';
import Drawer from 'react-native-drawer';
import Camera from 'react-native-camera';
import WebViewBridge from 'react-native-webview-bridge';
import { RNLocation as Location } from 'NativeModules';
import html from '../webview/html';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/index';
import GeolocationExample from './geoLocation';
// this loads the three.js DeviceOrientationControls library
import DeviceOrientationControls from '../lib/DeviceOrientationControls';
import RenderScene from '../webview/RenderScene';

const injectScript = `
  (function () {
    var renderPlace = function(threejsLat, threejsLon) {
      var geometry = new THREE.BoxGeometry( 2, 2, 2 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.set(threejsLat, 0, -1 * threejsLon);
      scene.add( cube );
    }
    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        var message = JSON.parse(message);
        if (message.type === "cameraPosition") {
          WebViewBridge.send('camera.rotation: ' + JSON.stringify(camera.rotation));
          //sets threejs camera position as gps location changes
          camera.position.set( message.deltaX, 0, 0 - message.deltaZ );
          WebViewBridge.send("in WebViewBridge, got cameraPosition: " + JSON.stringify(message));
        
        } else if (message.type === "initialHeading") {
          //followings are global variables that allows html to render scene
          heading = message.heading;
          camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
          controls = new THREE.DeviceOrientationControls( camera, true );
          //animate function comes from html string
          animate();
          // setInterval(function(){
          //   displacementX += 2;
          //   // displacementZ -= 1;
          //   // camera.position.set( displacementX, 0, 0 );
          //   controls.dispose();
          // }, 1000)
          WebViewBridge.send("heading received");
        } else if (message.type === 'places') {
          var places = message.places;
          WebViewBridge.send("in WebViewBridge, got places: " + JSON.stringify(places));
          
          places.forEach(function(place){
            renderPlace(place.lat, place.lon);
          })
        } else if (message.type === 'currentHeading') {
          // heading = message.heading;
          // if (testInitialize === null) {
          //   setInterval(function(){
          //     heading += 5;
          //   }, 1000)
          //   testInitialize = true;
          // }
          WebViewBridge.send("in WebViewBridge, got currentHeading")
        }
      };
      WebViewBridge.send("webview is loaded");
    }
  }());
`;

// //cameraCallback, loggerCallback are optional
// const calculateDistance = (coords1, coords2, cameraCallback, loggerCallback) => {
//   //earth circumference in meters
//   const earthCircumference = 40075000;
//   //deltaX is change in east to west position, east is positive, west is negative
//   //deltaZ is change in north to south position, north is positive, south is negative
//   let deltaX = (coords2.longitude - coords1.longitude) / 360 * earthCircumference;
//   let deltaZ = (coords2.latitude - coords1.latitude) / 360 * earthCircumference;
//   let distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);

//   //this callback is pass all the way down from initGeolocation;
//   if (cameraCallback) {
//     cameraCallback({ type: 'cameraPosition', deltaX: deltaX, deltaZ: deltaZ});
//   }

//   //this is only for debugging purposes to show deltaX, deltaZ on screen, should remove later
//   if (loggerCallback) {
//     loggerCallback(deltaX, deltaZ, distance);
//   }

//   return {
//     deltaX: deltaX,
//     deltaZ: deltaZ,
//     distance: distance
//   };
// };

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialHeadingString: 'unknown',
      initialPositionString: 'unknown',
      currentPositionString: 'unknown',
      lastAPICallPositionString: 'unknown',
      distanceFromLastAPICallString: 'unknown',
      currentHeadingString: 'unknown',
      lastAPICallPosition: null,
      initialHeading: null,
      initialPosition: null,
      currentPosition: null,
      currentHeading: null,
      deltaX: null,
      deltaZ: null,
    };
  }

  componentDidMount() {
    this.props.action.fetchPlaces();
    this.props.action.setUser('meesh', 'no pic');
    console.log(this.props.places, ' PLACES');
  }
  componentWillUnmount() {
    //this will stop the location update
    Location.stopUpdatingLocation();
  }

  startDeviceLocationUpdate() {
    Location.requestAlwaysAuthorization();
    Location.setDesiredAccuracy(1);
  }

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
  initGeolocation(callback) {
    //this will listen to geolocation changes and update it in state
    Location.startUpdatingLocation();
    this.getInitialLocation = DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {
        console.log('initGeolocation', location);

        this.setState({
          initialPositionString: JSON.stringify(location),
          initialPosition: location.coords
        });
      }
    );


    setTimeout(() => {
      this.getInitialLocation.remove();
      this.watchGeolocation(callback);
    }, 7000);
  }

  //watchGeolocation will subsequenly track the geolocation changes and update it in lastPosition state
  watchGeolocation(callback) {
    //Location.requestAlwaysAuthorization must be called before Location.startUpdatingLocation, both are functions from react-native-location
    Location.setDesiredAccuracy(1);
    Location.startUpdatingLocation();

    //this will listen to geolocation changes and update it in state
    DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {
        console.log('location', location);

        this.setState({
          currentPositionString: JSON.stringify(location),
          currentPosition: location.coords
        });
        this.getCameraDisplacement(location.coords, callback);
      }
    );
  }

  getCameraDisplacement(currentPosition, callback) {
    console.log('this.state.initialPosition, this.state.currentPosition', this.state.initialPosition, currentPosition);
    let cameraDisplacement = calculateDistance(this.state.initialPosition, currentPosition, callback,
      (deltaX, deltaZ) => {
        this.setState({deltaX: deltaX, deltaZ: deltaZ});
      });
    return cameraDisplacement;
  }

  //onBridgeMessage will be pass down to WebViewBridge to allow the native componenent to communicate to the webview;
  onBridgeMessage(message) {
    const { webviewbridge } = this.refs;
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
      //once threejs camera is oriented, send the camera position to webview
      this.initGeolocation.call(this,
        (newPosition) => {
          webviewbridge.sendToBridge(JSON.stringify(newPosition));
        });
    } else {
      console.log(message);
    }

  }

  //watchGeolocation will subsequenly track the geolocation changes and update it in lastPosition state
  watchGeolocation(callback) {
    //Location.requestAlwaysAuthorization must be called before Location.startUpdatingLocation, both are functions from react-native-location
    Location.setDesiredAccuracy(1);
    Location.startUpdatingLocation();

    //this will listen to geolocation changes and update it in state
    DeviceEventEmitter.addListener(
      'locationUpdated',
      (location) => {
        console.log('location', location);

        this.setState({
          currentPositionString: JSON.stringify(location),
          currentPosition: location.coords
        });
        this.getCameraDisplacement(location.coords, callback);
      }
    );
  }

  getCameraDisplacement(currentPosition, callback) {
    console.log('this.state.initialPosition, this.state.currentPosition', this.state.initialPosition, currentPosition);
    let cameraDisplacement = calculateDistance(this.state.initialPosition, currentPosition, callback,
      (deltaX, deltaZ) => {
        this.setState({deltaX: deltaX, deltaZ: deltaZ});
      });
    return cameraDisplacement;
  }

  //onBridgeMessage will be pass down to WebViewBridge to allow the native componenent to communicate to the webview;
  onBridgeMessage(message) {
    const { webviewbridge } = this.refs;
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
      //once threejs camera is oriented, send the camera position to webview
      this.initGeolocation.call(this,
        (newPosition) => {
          webviewbridge.sendToBridge(JSON.stringify(newPosition));
        });
    } else {
      console.log(message);
    }

  }
  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  handleSignout() {
    this.props.navigator.resetTo({name: 'signinView'});
  };

  render() {
    return (
      <Drawer
        type="overlay"
        ref={(ref) => this._drawer = ref}
        content={<View style={styles.panel}>
        <Text style={styles.panelText}>WHERE'S THE CUBE???</Text></View>}
        openDrawerOffset={100}
        acceptPan={true}
        tweenHandler={(ratio) => ({main: { opacity:(4-ratio)/4 }})}>
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
            style={{backgroundColor: 'transparent'}}>
            <TouchableHighlight style={styles.menu} onPress={() => {this._drawer.open()}}>
              <View style={styles.button}>
                <Text>MENU</Text>
              </View>
            </TouchableHighlight>
          </WebViewBridge>
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
            <Text style={styles.title}>Current heading: </Text>
            {this.state.initialHeading}
          </Text>
          <Text>
            <Text style={styles.title}>DeltaX: </Text>
            {this.state.deltaX}
          </Text>
          <Text>
            <Text style={styles.title}>DeltaZ: </Text>
            {this.state.deltaZ}
          </Text>
        </View>
      </View>
      </Drawer>
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
  },
  menu: {
    padding: 10
  },
  button: {
    backgroundColor: '#FFF',
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerStyles: {
      flex: 1,
      padding: 30,
      margin: 100,
      justifyContent: 'center',
      alignItems: 'center',
      shadowRadius: 3,
      backgroundColor: 'rgba(0,0,0,.5)'

  },
  panel: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: 30,
    flex: 1
  },
  panelText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});


const mapStateToProps = function(state) {
  console.log('map state to props is called, this is state: ', state);
  return {
    places: state.places,
    user: state.user
  };
};

const mapDispatchToProps = function(dispatch) {
  console.log('map dispatch to props is called');
  return { action: bindActionCreators(Actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);