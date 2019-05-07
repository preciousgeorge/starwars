const expect = require('chai').expect;
const should = require('chai').should();
const { toFeet } = require('../v1.0.0/lib/conversion');

it('should return true if to feet convertion is correct', function() {
  let feet = toFeet(170);
  console.log(feet);
  feet.should.equal('5ft and 6.93 inches');
});
