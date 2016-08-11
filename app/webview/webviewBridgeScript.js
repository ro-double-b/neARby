export const injectScript = `
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
