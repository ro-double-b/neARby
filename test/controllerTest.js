var expect = require('chai').expect;
var controller = require('../server/controller/controller');


describe('deg2rad', function() {
  it('should convert degrees to radians', function() {
    expect(controller.deg2rad(90)).to.be.closeTo(1.5708, 0.001);
  });
});

describe('hypotenuseDistance', function() {
  var hypotenuseDistance = controller.hypotenuseDistance;
  it('should calculate the distance between two points on earth', function() {
    // San Francisco to Helsinki
    expect(hypotenuseDistance(37.7749, -122.4194, 60.1699, 24.9384) * 1.00).to.be.closeTo(8717000, 8717 * 1.005);
  });
});
