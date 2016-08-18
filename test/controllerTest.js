var expect = require('chai').expect;
var controller = require('../server/controller/controller');


describe('deg2rad', function() {
  it('should convert degrees to radians', function() {
    expect(controller.deg2rad(90)).to.be.closeTo(1.5708, 0.001);
  });
});
