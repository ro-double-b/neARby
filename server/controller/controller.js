var request = require('request');
var initLon = null;
var initLat = null;

function deg2rad(deg) {
  return deg * (Math.PI/180);
};

// calculates the total distance
function hypotenuseDistance(lat1, lon1, lat2, lon2) {
  var R = 6371000; // Radius of the earth in m
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in m
  return d;
};

// calculates the x distance
function findXDistance(initLat, newLat) {
  return (newLat - initLat) * 1852;
};

function square(number) {
  return number * number;
};

// calculates the y distance using Pythagorean Theorem
function findYDistance(hypotenuse, xDistance) {
  return Math.sqrt(square(hypotenuse) - square(xDistance))
};

function getPlaces(req, res) {
  // check to see if it is the initial location
  console.log('REQUEST --- ', req);
  if (req.body.threejsLat === 0 && req.body.threejsLon === 0) {
    // if so recored the initial position
    initLat = req.body.latitude;
    initLon = req.body.longitude;
  };
  // call to google API to get locations around
<<<<<<< 4a56ead483a716c2830a6098b65797ae0189fd18
  var radius = 100;
  var apiKey = 'AIzaSyB10Fe32kWefZ8SNREvTOcYyrJXZ2Qtnu8';
  var link = `https://maps.googleapis.com/maps/api/place/search/json?location=${req.body.actualLon},${req.body.actualLat}&radius=${radius}&key=${apiKey}`;
  request(link, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var placesObj = [];
      // iterate over the get request to extract data we want
      body.forEach(function(result) {
        // calculate each of the distances in meters
        var lat = findXDistance(initLat, results.geometry.latitude);
        var distanceFromInit = hypotenuseDistance(initLat, initLon, results.geometry.lat, results.geometry.lon);
        var distance = hypotenuseDistance(req.body.latitude, req.body.longitude, results.geometry.lat, results.geometry.lon);
        var lon = findYDistance(distanceFromInit, lat);
        // populate an object with all necessary information
        var place = {
        name: results.name,
        lat,
        lon,
        distance,
        img: results.icon,
        };
        placesObj.push(place);
      });
      // send back data to client side
      res.send(placesObj);
    }
  });
};
<<<<<<< Updated upstream
=======

=======
  var radius = 5000
  var apiKey = 'AIzaSyB10Fe32kWefZ8SNREvTOcYyrJXZ2Qtnu8'
  var link = `https://maps.googleapis.com/maps/api/place/search/json?location=${req.body.actualLon},${req.body.actualLat}&radius=${radius}$key=${apiKey}`
  $.ajax({
    type: "GET"
    url: link
  })
  .done((data) =>
    var threeObjs = []
    // iterate over the data to extract data we want
    data.results.forEach(function(result) {
      var place = {
        name: result.name,
        lat: result.geometry.lat - initLat,
        lon: result.geometry.lon - initLon,
      }
    })
    // send back data to client side
    res.send(threeObjs);
    )
}
>>>>>>> feat/implementing redux
module.exports = getPlaces;
>>>>>>> Stashed changes
