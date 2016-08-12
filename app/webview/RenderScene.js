const RenderScene =
`
  <script>
    var camera, controls, animate, heading, scene;
    var displacementX = 0;
    var displacementZ = 0;
    (function() {
      "use strict";

      window.addEventListener('load', function() {
        var container, renderer, geometry, mesh;

        document.body.style.fontFamily = 'Helvetica, sans-serif';

        var divs = [];
        window.createPlace = function(lat, long, name, distance) {
          var element = document.createElement('div')
          element.className = 'place';
          element.style.backgroundColor = 'rgba(0, 127, 127, 0.443137)';
          element.style.border = '1px solid rgba(127,255,255,0.75)';
          document.body.appendChild(element);

          var nameHeading = document.createElement('h1');
          nameHeading.innerText = name;
          nameHeading.style.color = 'rgba(255,255,255,0.75)';
          nameHeading.style.fontWeight = 'bold';
          nameHeading.style.marginLeft = '10px';
          nameHeading.style.marginRight = '10px';
          element.appendChild(nameHeading);

          var distanceHeading = document.createElement('h1');
          distanceHeading.innerText = distance;
          distanceHeading.style.color = 'rgba(127,255,255,0.75)';
          distanceHeading.style.fontWeight = 'bold';
          distanceHeading.style.fontSize = '8px';
          distanceHeading.style.marginLeft = '8px';
          element.appendChild(distanceHeading);

          element.style.position  = 'absolute';

          var geo = new THREE.BoxGeometry(1, 1, 1);
          var mat = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
          var cube = new THREE.Mesh(geo, mat);
          cube.position.set(lat, 0, -1 * long);
          scene.add(cube);
          divs.push({div: element, cube: cube});
        }

        animate = function(){

          divs.forEach(function(element) {
            var div = element.div;
            var cube = element.cube;
            var position = THREEx.ObjCoord.cssPosition(cube, camera, renderer);
            div.style.left = (position.x - div.offsetWidth /2)+'px';
            div.style.top = (position.y - div.offsetHeight/2)+'px';
          })

          window.requestAnimationFrame( animate );

          // controls.update();
          controls.updateAlphaOffsetAngle( (360 - heading) * (Math.PI / 180));
          renderer.render(scene, camera);

        };

        container = document.getElementById( 'container' );

        scene = new THREE.Scene();

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
