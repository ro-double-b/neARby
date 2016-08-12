var request = require('request');
var initLon = null;
var initLat = null;
var radius = 30;

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// calculates the total distance
function hypotenuseDistance(lat1, lon1, lat2, lon2) {
  var R = 6371000; // Radius of the earth in m
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in m
  return d;
}

// calculates the x distance
function findXDistance(initLat, newLat) {
  return (newLat - initLat) * 111230;
}

function square(number) {
  return number * number;
}

// calculates the y distance using Pythagorean Theorem
function findYDistance(hypotenuse, xDistance) {
  return Math.sqrt(square(hypotenuse) - square(xDistance));
}

function getPlaces(req, res) {
  // check to see if it is the initial location
  if (req.body.threejsLat === 0 && req.body.threejsLon === 0) {
    // if so recored the initial position
    initLat = req.body.latitude;
    initLon = req.body.longitude;
  }
  // call to google API to get locations around
  var googleApiKey = 'AIzaSyDXk9vLjijFncKwQ-EeTW0tyiKpn7RRABU';
  var googleApiLink = `https://maps.googleapis.com/maps/api/place/search/json?location=${req.body.latitude},${req.body.longitude}&radius=${radius}&key=${googleApiKey}`;
  return new Promise((resolve, reject) => {
    request(googleApiLink, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var placesObj = [];
        var googleResults = JSON.parse(body);
        // iterate over the get request to extract data we want
        googleResults.results.forEach(function(result) {
          // calculate each of the distances in meters
          var googleLat = findXDistance(initLat, result.geometry.location.lat);
          var distanceFromInit = hypotenuseDistance(initLat, initLon, result.geometry.location.lat, result.geometry.location.lng);
          var googleDistance = hypotenuseDistance(req.body.latitude, req.body.longitude, result.geometry.location.lat, result.geometry.location.lng);
          var googleLon = findYDistance(distanceFromInit, googleLat);
          // populate an object with all necessary information
          var place = {
          name: result.name,
          lat: googleLat,
          lon: googleLon,
          distance: googleDistance,
          img: result.icon,
          };
          placesObj.push(place);
        });
        // send back data to client side
        resolve(res.send(placesObj));
      }
    });
  });
}

function filterPlaces(req, res) {

}

function getEvents(req, res) {
  var

}
// search?type=place&center=37.33240901400225,-122.0304880086256&distance=250&limit=1000&fields=id


function getDetails(req, res) {

}

module.exports = {
  getPlaces,
  filterPlaces,
  getEvents,
  getDetails,
};
