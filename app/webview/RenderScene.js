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

        animate = function(){

          window.requestAnimationFrame( animate );

          // controls.update();
          controls.updateAlphaOffsetAngle( (360 - heading) * (Math.PI / 180));
          renderer.render(scene, camera);

        };

        container = document.getElementById( 'container' );



        scene = new THREE.Scene();


        var loader = new THREE.TextureLoader();
        loader.load(base64, function(texture) {
          var material = new THREE.SpriteMaterial( { map: texture } );
          var sprite = new THREE.Sprite( material );
          sprite.needsUpdate = true;
          sprite.position.set(1, 0, 1);
          scene.add( sprite );;
        });

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
