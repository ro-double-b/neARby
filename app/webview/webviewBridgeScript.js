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
          WebViewBridge.send("heading received");

        } else if (message.type === 'places') {
          var places = message.places;
          WebViewBridge.send("in WebViewBridge, got places");
          
          places.forEach(function(place){
            WebViewBridge.send("in WebViewBridge, got place" + JSON.stringify(place.name));
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
