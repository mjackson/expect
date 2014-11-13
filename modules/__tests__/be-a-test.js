var expect = require('../expect');

describe('Expectation#toBeA', function () {
  it('requires the constructor to be a function', function () {
    expect(function () {
      expect('actual').toBeA('expected');
    }).toThrow(/must be a function/);
  });

  var Expectation = expect;

  it('does not throw when the actual value is an instanceof the constructor', function () {
    expect(function () {
      expect(new Expectation).toBeA(Expectation);
    }).toNotThrow();
  });

  it('throws when the actual value is not an instanceof the constructor', function () {
    expect(function () {
      expect('actual').toBeA(Expectation);
    }).toThrow(/is not a/);
  });
});
