import DeviceOrientationControls from '../lib/DeviceOrientationControls';
import RenderScene from './RenderScene';

const html =
`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>three.js webgl - controls - deviceorientation</title>
      <meta charset="utf-8">
      <meta name="viewport" content="user-scalable=no, initial-scale=1">
      <style>
       body {
         margin: 0px;
         background-color: #000000;
         overflow: hidden;
         background-color: transparent;
       }

       #info {
         position: absolute;
         top: 0px; width: 100%;
         color: #ffffff;
         padding: 5px;
         font-family:Monospace;
         font-size:13px;
         font-weight: bold;
         text-align:center;
       }

       a {
         color: #ff8800;
       }
      </style>
    </head>
    <body>

      <div id="container"></div>

      <div id="info">
        <a href="http://threejs.org" target="_blank">three.js</a> - equirectangular panorama demo with DeviceOrientation controls.
        photo by <a href="http://www.flickr.com/photos/jonragnarsson/2294472375/" target="_blank">Jón Ragnarsson</a>.
      </div>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r79/three.min.js"></script>
      ${DeviceOrientationControls};
      ${RenderScene};
    </body>
  </html>
`;

export default html;