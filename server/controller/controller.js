var initLon
var initLat 
function getPlaces(req, res) {
  // check to see if it is the initial location
  if(req.body.threejsLat === 0 && req.body.threejsLon === 0) {
    // if so recored the initial position
    initLat = actualLat
    initLon = actualLon
  }
  // call to google API to get locations around
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
    res.send(threeObjs)
    )
}
module.exports = getPlaces
