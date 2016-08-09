const RenderScene =
`
  <script>
    (function() {
      "use strict";

      window.addEventListener('load', function() {
        var container, camera, scene, renderer, controls, geometry, mesh;

        var animate = function(){

        window.requestAnimationFrame( animate );

        controls.update();
        renderer.render(scene, camera);

        };

        var places = [];

        var renderPlace = function(placeObj) {
          var map = new THREE.TextureLoader().load(placeObj.url);
          var material = new THREE.SpriteMaterial( { map: map } );
          var sprite = new THREE.Sprite( material );
          sprite.position.set(placeObj.lat, 0, placeObj.long);
          scene.add(sprite);
        }

        var renderMap = function() {
          scene.children.forEach(function(child) {
            scene.remove(child);
          });
          places.forEach(function(place) {
            renderPlace(place);
          });
        }

        container = document.getElementById( 'container' );

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

        controls = new THREE.DeviceOrientationControls( camera, true );

        scene = new THREE.Scene();

        var loader = new THREE.TextureLoader();
        loader.crossOrigin = '';
        alert(base64.substring(0, 3));
        loader.load(base64, function(texture) {
          var material = new THREE.SpriteMaterial( { map: texture } );
          var sprite = new THREE.Sprite( material );
          sprite.needsUpdate = true;
          sprite.position.set(1, 0, 1);
          scene.add( sprite );;
          animate();
        });
        var geometry = new THREE.BoxGeometry( 2, 2, 2 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );

        camera.position.z = 5;

        renderer = new THREE.WebGLRenderer({alpha: true});
        renderer.setClearColor( 0x000000, 0 ); // the default

        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = 0;
        container.appendChild(renderer.domElement);

        window.addEventListener('resize', function() {

          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );

        }, false);


        }, false);

    }());
  </script>
`;
export default RenderScene;
