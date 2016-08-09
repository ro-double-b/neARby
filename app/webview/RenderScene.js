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

      container = document.getElementById( 'container' );

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);

      controls = new THREE.DeviceOrientationControls( camera, true );

      scene = new THREE.Scene();

      var geometry = new THREE.BoxGeometry( 1, 1, 1 );
      var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
      var cube = new THREE.Mesh( geometry, material );
      scene.add( cube );

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
        
      animate();

      }, false);

    }());
  </script>
`;

export default RenderScene;