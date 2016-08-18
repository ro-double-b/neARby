var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var controller = require('../server/controller/controller');
var request = require('request');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('deg2rad', function() {
  it('should convert degrees to radians', function() {
    expect(controller.deg2rad(90)).to.be.closeTo(1.5708, 0.001);
  });
});

describe('hypotenuseDistance', function() {
  var hypotenuseDistance = controller.hypotenuseDistance;

  it('should approximate the distance between two points on earth to 0.5 %', function() {
    // San Francisco to Helsinki
    expect(hypotenuseDistance(37.7749, -122.4194, 60.1699, 24.9384)).to.be.closeTo(8717000, 8717 * 1.005);
  });

  it('should function in reverse', function() {
    expect(hypotenuseDistance(37.7749, -122.4194, 60.1699, 24.9384)).to.equal(hypotenuseDistance(60.1699, 24.9384, 37.7749, -122.4194));
  });
});

describe('findXDistance', function() {
  it('should find the distance between two latitudes', function() {
    expect(controller.findXDistance(0, 3)).to.equal(333690);
  });
});

describe('getPlaces', function() {
  it('should respond with a properly formatted array of places', function(done) {
    var reqBody = {
      food: true,
      hotel: true,
      cafes: true,
      nightlife: true,
      shopping: true,
      publicTransit: true,
      bank: true,
      gasStation: true,
      parking: true,
      park: true,
      placeSearch: '',
      latitude: 37.78375460769774,
      longitude: -122.4091061298944,
      threejsLat: 0,
      threejsLon: 0
    };

    var options = {
      url: 'http://10.6.23.239:3000/places',
      json: true,
      body: reqBody
    };
    request.post(options, function(err, resp, body){
      if (err) {
        done(err);
      }

      expect(body).to.be.a('array');
      expect(body[0]).to.be.a('object');
      expect(body[0]).to.have.property('name').that.is.a('string');
      expect(body[0]).to.have.property('lat').that.is.a('number');
      expect(body[0]).to.have.property('lon').that.is.a('number');
      expect(body[0]).to.have.property('distance').that.is.a('number');
      expect(body[0]).to.have.property('address').that.is.a('string');
      done();
    });
  });
});
