const RenderScene =
`
  <script>
    var camera, controls, animate, heading, scene, headingUpdate, loader;
    window.divs = [];
    (function() {
      "use strict";
      window.addEventListener('load', function() {
        var container, renderer, geometry, mesh;
        var frustum = new THREE.Frustum();
        document.body.style.fontFamily = 'Helvetica, sans-serif';
        window.divs = [];
        var divsInSight = [];

        // Check overlap of two rectangle-objects
        var checkOverlap = function(rect1, rect2) {
          return !(rect1.right < rect2.left ||
                 rect1.left > rect2.right ||
                 rect1.bottom < rect2.top ||
                 rect1.top > rect2.bottom);
        }

        // Returns array of divs that are visible on the screen
        var checkFrustum = function() {
          frustum.setFromMatrix( new THREE.Matrix4().multiplyMatrices( camera.projectionMatrix, camera.matrixWorldInverse ) );
          return window.divs.filter(function(obj) {
            var visible = frustum.intersectsObject(obj.cube);
            if (!visible) {
              obj.div.style.display = 'none';
            }
            return visible;
          });
        };
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

        window.createPlace = function(lat, long, name, distance, key) {

          // Create surrounding div
          var element = document.createElement('div')
          element.className = 'place';
          element.style.backgroundColor = 'rgba(0, 127, 127, 0.443137)';
          element.style.border = '1px solid rgba(127,255,255,0.75)';
          scaleDivSize(element, distance);
          document.body.appendChild(element);

          element.addEventListener("click", function(){
            WebViewBridge.send(JSON.stringify({type: 'click', key: key}));
          }, false);

          var nameHeading = document.createElement('h1');
          nameHeading.innerText = name;
          nameHeading.style.color = 'rgba(255,255,255,0.75)';
          nameHeading.style.fontWeight = 'bold';
          nameHeading.style.fontSize = '15px';
          nameHeading.style.marginLeft = '10px';
          nameHeading.style.marginRight = '10px';
          element.appendChild(nameHeading);

          // Create distance heading
          var distanceHeading = document.createElement('h1');
          distanceHeading.innerText = distance;
          distanceHeading.style.color = 'rgba(127,255,255,0.75)';
          distanceHeading.style.fontWeight = 'bold';
          distanceHeading.style.fontSize = '8px';
          distanceHeading.style.marginLeft = '8px';
          element.appendChild(distanceHeading);

          element.style.position  = 'absolute';

          // Create invisible threejs cube that will be used for calculating AR
          var geo = new THREE.BoxGeometry(1, 1, 1);
          var mat = new THREE.MeshBasicMaterial({color: 0x00FF00, wireframe: true});
          var cube = new THREE.Mesh(geo, mat);
          cube.position.set(long, 0, -1 * lat);
          cube.visible = false;
          scene.add(cube);
          window.divs.push({div: element, cube: cube});
        };

        // Check collision between argument div and all visible divs
        var checkCollision = function(div) {
          var rect1 = div.getBoundingClientRect();
          return divsInSight.some(function(e) {
            if (e.div === div) {
              return false;
            }
            var rect2 = e.div.getBoundingClientRect();
            return checkOverlap(rect1, rect2);
          });
        }

        window.clearScene = function() {
          window.divs.forEach(function(obj) {
            if (obj.cube) {
              obj.div.remove();
              scene.remove(obj.cube);
            }
          });
        };

        animate = function(now){
          divsInSight = checkFrustum();

          divsInSight.forEach(function(element) {
            var div = element.div;

            // Position denotes the height of the div
            var pos = div.pos || 0;

            // Direction describes whether the div avoids collisions by moving up or down
            var direction = div.direction || [1, -1][Math.floor(Math.random() * 2)];


            // Show the div since it is currently visible
            div.style.display = '';


            var cube = element.cube;

            // Library that finds visible threejs objects and maps them to css coordinates.
            // Note that there is a bug in the library which results in two divs for every
            // threejs cube 180 degrees from one another. The problem is solved by checking
            // the frustum for cubes that are actually visible.
            var position = THREEx.ObjCoord.cssPosition(cube, camera, renderer);

            var left = (position.x - div.offsetWidth /2);
            div.style.left = left + 'px';
            var top = (position.y - div.offsetHeight/2);
            div.style.top = top + pos + 'px';

            // Move div up or down until it is no longer colliding
            for (var inc = 7; checkCollision(div); inc += 7) {
              div.style.top = top + (inc * direction) + 'px';
              div.pos = inc * direction;
              div.direction = direction;
            }
          });

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

        winddow.alert('asdfasdf');
        var torus = new THREE.TorusGeometry( 100, 50, 50, 100 );
        var torusMaterial = new THREE.MeshBasicMaterial( { color: "rgb(255, 0, 0)", wireframe: true } );
        openingTorus = new THREE.Mesh( torus, torusMaterial );
        openingTorus.position.set(0, 0, 0);
        scene.add( openingTorus );

        // var rotateTorus = function() {
        //   if (openingTorus) {
        //     openingTorus.rotation.y += 0.1;
        //   }
        // }

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
