export const injectScript = `
  (function () {

    // //icosahedron
    // var icosahedron = new THREE.IcosahedronGeometry( 2, 0 );

    // // octahedron
    // var diamond = new THREE.OctahedronGeometry( 2, 0 );

    // // tetrahedron
    // var pyramid = new THREE.TetrahedronGeometry( 2, 0 );

    // // torus
    // var torus = new THREE.TorusGeometry( 3, 1, 16, 40 );

    var orientCompass = function(message) {
      //set compass to current location too
      // window.scene.getObjectByName( "axisX" ).position.set(message.deltaZ, -20, -1 * message.deltaX);
      window.scene.getObjectByName( "axisY" ).position.set(message.deltaZ, 0, -1 * message.deltaX);
      // window.scene.getObjectByName( "axisZ" ).position.set(message.deltaZ, -20, -1 * message.deltaX);
    }

    //add cube in arbitraury location
    var addCubeHere = function(threejsLat, threejsLon, color, geometry) {
      // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: color, wireframe: true } );
      var cube = new THREE.Mesh( geometry, material );
      cube.position.set(threejsLon, 0, -1 * threejsLat);
      window.scene.add( cube );
    }

    var beginAnimation = function() {
      //followings are global variables that allows html to render scene
      window.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
      window.controls = new THREE.DeviceOrientationControls( camera, true );

      //animate function comes from html string
      window.animate();
    }

    if (WebViewBridge) {
      WebViewBridge.onMessage = function (message) {
        var message = JSON.parse(message);

        if (message.type === "cameraPosition") {
          //sets threejs camera position as gps location changes, deltaZ is change in long, deltaX is change in lat
          window.camera.position.set(message.deltaZ, 0, -1 * message.deltaX);
          openingGroup.position.set(message.deltaZ, 0, -1 * message.deltaX);
          orientCompass(message);
          WebViewBridge.send(JSON.stringify("in WebViewBridge, got cameraPosition"));

        } else if (message.type === "initialHeading") {

          if (!loading) {
            heading = message.heading;
          }
          WebViewBridge.send(JSON.stringify("heading received"));

        } else if (message.type === 'places') {
          var places = message.places;
          WebViewBridge.send(JSON.stringify("in WebViewBridge, got places"));
          window.clearScene();
          window.divs = [];

          alert(JSON.stringify('wasd'));
          places.forEach(function(place, key) {
            loading = false;
            if (place.type && (place.type === 'userPlace')) {
              var torus = new THREE.TorusGeometry( 5, 2, 16, 40 );
              addCubeHere(place.lat, place.lon, "rgb(255, 0, 0)", torus);
            } else if (place.type && (place.type === 'userEvent')) {
              var diamond = new THREE.OctahedronGeometry( 5, 0 );
              addCubeHere(place.lat, place.lon, "rgb(255, 255, 0)", diamond);
            } else {
              window.createPlace(place.lat, place.lon, place.name, place.distance, key);
            }
          });

        } else if (message.type === 'currentHeading') {
          heading = message.heading;
          headingUpdate = true;
          // WebViewBridge.send(JSON.stringify("in WebViewBridge, got currentHeading"));

        }
      };

      heading = 0;
      beginAnimation();
      WebViewBridge.send(JSON.stringify("webview is loaded"));

    }
  }());
`;
