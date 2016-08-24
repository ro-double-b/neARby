const RenderScene =
`
  <script>
    var camera, controls, animate, heading, scene, headingUpdate, loader, openingGroup;
    var loading = true;
    window.divs = [];
    (function() {
      "use strict";
      window.addEventListener('load', function() {
        var container, renderer, geometry, mesh;
        var frustum = new THREE.Frustum();
        document.body.style.fontFamily = 'Helvetica, sans-serif';
        window.divs = [];

        var width = window.innerWidth;
        var height = window.innerHeight;
        var widthHalf = width / 2
        var heightHalf = height / 2;


        // Check overlap of two rectangle-objects
        var checkOverlap = function(rect1, rect2) {
          return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
        }

        var scaleDivSize = function(element, distance) {
          var normalized = distance - 30;
          var scale = 1 / (normalized / 2000) * 0.3;
          if (scale > 1.4) {
            scale = 1.4;
          }
          element.style.transform = 'scale(' + scale + ')';
        }

        window.createImages = function(images) {
          clearScene();
          images.forEach(function(image) {
            var img = document.createElement('img');
            img.src = image;
            img.style.position = 'absolute';
            img.style.opacity = 0.5;
            document.body.appendChild(img);

            var geo = new THREE.BoxGeometry(1, 1, 1);
            var mat = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
            var cube = new THREE.Mesh(geo, mat);
            cube.position.set(Math.random() * 2 - 1, 0, Math.random() * 2 - 1);
            cube.position.normalize();
            cube.position.multiplyScalar(200);
            img.width = 150;
            img.height =  50;
            cube.visible = false;
            scene.add(cube);
            window.divs.push({div: img, cube: cube});
          });
        }

        // Takes a bounding box and checks for collisions against
        // all other places/events in the scene
        var checkCollision = function(bbox) {
          bbox.update();
          return divs.some(function(obj) {
            var cube = obj.cube;
            var cubeBbox = new THREE.BoundingBoxHelper(cube);
            if (bbox.box.intersectsBox(cubeBbox.box)) {
              return true;
            }
          });
        };

        window.createPlace = function(lat, long, name, distance, key) {

          var bitmap = document.createElement('canvas');
          var g = bitmap.getContext('2d');
          bitmap.width = 300;
          bitmap.height = 150;
          g.font = 'Bold 30px Helvetica, sans-serif';

          g.fillStyle = '#007F7F';
          g.fillRect(0, 0, 300, 150);
          g.fillStyle = 'white';
          g.textAlign = 'center';
          g.fillText(name, 150, 75);
          g.strokeStyle = 'white';
          g.strokeText(name, 150, 75);
          g.fillText(distance, 150, 125);
          g.strokeStyle = 'white';
          g.strokeText(distance, 150, 125);

          // canvas contents will be used for a texture
          var texture = new THREE.Texture(bitmap);
          texture.needsUpdate = true;

          var geo = new THREE.PlaneGeometry(0.5, 0.5);
          var mat = new THREE.MeshBasicMaterial({transparent: true, opacity: 0.75, map: texture});
          var cube = new THREE.Mesh(geo, mat);
          cube.position.set(long, 0, -1 * lat);
          cube.position.normalize();
          cube.position.multiplyScalar(3);
          cube.lookAt(camera.position);
          // cube.visible = false;
          scene.add(cube);

          var bbox = new THREE.BoundingBoxHelper(cube);
          while (checkCollision(bbox)) {
            cube.translateY(0.5);
          }
          window.divs.push({cube: cube});
        };


        window.clearScene = function() {
          window.divs.forEach(function(obj) {
            if (obj.cube) {
              obj.div.remove();
              scene.remove(obj.cube);
            }
          });
        };

        animate = function(now){

          window.requestAnimationFrame( animate );

          if (openingGroup) {
            rotateCubes();
          }

          if (!loading) {
            fadeoutCubes();
          }

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

        // var torus = new THREE.TorusGeometry( 100, 30, 50, 100 );
        // var torusMaterial = new THREE.MeshBasicMaterial( { color: "rgb(255, 0, 0)", wireframe: true } );
        // openingTorus = new THREE.Mesh( torus, torusMaterial );
        // openingTorus.position.set(0, 0, -1000);
        // scene.add( openingTorus );

        // var rotateTorus = function() {
        //   if (openingTorus) {
        //     // openingTorus.rotation.y += 0.1;
        //     openingTorus.position.z += 10;
        //   }
        // }

        openingGroup = new THREE.Group();

        for ( var i = 0; i < 100; i ++ ) {
          var color1 = Math.floor(255 * Math.random());
          var color2 = Math.floor(255 * Math.random());
          var color3 = Math.floor(255 * Math.random());

          var cubeMaterial = new THREE.MeshBasicMaterial( { color: "rgb(" + color1 + "," + color2 + "," + color3 + ")" , transparent: true} );
          // var cube = new THREE.TorusGeometry( 5, 2, 10, 20 );
          var cube = new THREE.CubeGeometry( 5, 5, 5 );
          var mesh = new THREE.Mesh( cube, cubeMaterial );
          mesh.position.x = Math.random() * 200 - 100;
          mesh.position.y = Math.random() * 200 - 100;
          mesh.position.z = Math.random() * 200 - 100;

          mesh.rotation.x = Math.random() * 360 * ( Math.PI / 180 );
          mesh.rotation.y = Math.random() * 360 * ( Math.PI / 180 );

          openingGroup.add( mesh );
        }

        openingGroup.position.set(0,0,0);
        scene.add( openingGroup );

        var rotateCubes = function() {
          if (openingGroup) {
            openingGroup.rotation.y += .005;
            openingGroup.rotation.x += .005;
          }
        };

        var fadeoutCubes = function() {
          if (openingGroup.children[0].opacity === 0) {
            scene.remove(openingGroup);
            openingGroup = null;
          }
          for (var i = 0; i < openingGroup.children.length; i++) {
            openingGroup.children[i].material.opacity -= .03
          }
        };

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
