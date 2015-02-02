/* jshint -W058 */
var expect = require('../index');

describe('Expectation#toBeA', function () {
  it('requires the value to be a function or string', function () {
    expect(function () {
      expect('actual').toBeA(4);
    }).toThrow(/must be a function or string/);
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

  it('does not throw when the expected value is the typeof the actual value', function () {
    expect(function () {
      expect(4).toBeA('number');
      expect(NaN).toBeA('number'); // hahaha
    }).toNotThrow();
  });

  it('throws when the expected value is not the typeof the actual value', function () {
    expect(function () {
      expect('actual').toBeA('number');
    }).toThrow(/is not a/);
  });
});
