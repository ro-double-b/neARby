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

        var divs = [];
        var createPlace = function(name, distance) {
          var element = document.createElement('div')
          document.body.appendChild(element);
          element.innerHTML = '<h1>' + name + '</h1><h2>' + distance + '</h2>';
          element.style.position  = 'absolute';

          var geo = new THREE.BoxGeometry(1, 1, 1);
          var mat = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
          var cube = new THREE.Mesh(geo, mat);
          cube.position.set(0, 0, -5);
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

        createPlace('hello', '200m');

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
