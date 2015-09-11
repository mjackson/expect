var expect = require('./Expectation');

expect.createSpy = require('./SpyUtils').createSpy;
expect.spyOn = require('./SpyUtils').spyOn;

module.exports = expect;
