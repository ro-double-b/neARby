import FBSDK, { LoginButton, AccessToken } from 'react-native-fbsdk';
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image
} from 'react-native';
import WebViewBridge from 'react-native-webview-bridge';

let html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset=utf-8>
    <title>My first Three.js app</title>
    <style>
      body { margin: 0; }
      canvas { width: 100%; height: 100% }
    </style>
  </head>
  <body>
      <style>
       body {
         margin: 0px;
         overflow: hidden;
         background-color: transparent;
       }
      </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
    <script>
      var scene = new THREE.Scene();
      var cubes = [];
      var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      });
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );


      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = function() {
        var newColor = 256 * Math.random();
        new THREE.MeshNormalMaterial( { color: 'rgba(' + newColor + ',' + newColor + ',' + newColor + ', .5)', wireframe: true, transparent: true, opacity: 0.5 } );
      }
      var radius = 20;
      for (var i = 0; i < 25; i++) {
        var cube = new THREE.Mesh( geometry, material() );
        scene.add( cube );
        cube.position.set(radius/2 - radius * Math.random(),
          radius/2 - radius * Math.random(), 0.0);
        cubes.push(cube);
        
      }

      camera.position.z = 15;

      function render() {
        requestAnimationFrame( render );
        for (var i = 0; i < cubes.length; i++) {
          cubes[i].rotation.x += 0.05 * Math.random();
          cubes[i].rotation.y += 0.05 * Math.random();
        }

        renderer.render( scene, camera );
      }
      render();

    </script>
  </body>
</html>`;

class Login extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillMount () {
    console.log(AccessToken);
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        if (data) {
         this.goToHomePage();
        }
       }
    );
  }
  goToHomePage(accessToken) {
    this.props.navigator.replace({name: 'Main'});
  }

  render() {
    return (
      <Image style={{flex: 1}} source={{uri : 'http://i.imgur.com/0ViH0RN.gif'}}>
      <WebViewBridge
        ref="webviewbridge"
        source={{html}}
        style={styles.container}>
      <View style={styles.textContainer}>
      <Text style={styles.text}>ne</Text>
      <Text style={styles.textAR}>ar</Text>
      <Text style={styles.text}>by</Text>
      </View>
       <LoginButton
        readPermissions={['user_friends']}
        style={styles.button}
        onLoginFinished={
          (error, result) => {
            if (error) {
              alert("login has error: " + result.error);
            } else if (result.isCancelled) {
              alert("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(
                (data) => {
                  console.log(this, 'LOGIN');
                  this.goToHomePage();
                }
              );
            }
          }
        }
      />
      </WebViewBridge>
    </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 320,
    paddingTop: 250,
    backgroundColor: 'rgba(255,255,255,0.1)'
  },
  button: {
    backgroundColor: '#3B5998',
    height: 50,
    width: 100
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  text: {
    fontSize: 60,
    color: 'white',
    fontFamily: 'AvenirNext-UltraLight',
  },
  textAR: {
    fontSize: 60,
    color: 'white',
    fontFamily: 'AvenirNext-Medium'
  }
});

export default Login;
