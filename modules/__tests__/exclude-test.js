var expect = require('../expect');

describe('Expectation#toExclude', function () {
  it('requires the actual value to be an Array', function () {
    expect(function () {
      expect('actual').toExclude('expected');
    }).toThrow(/must be an Array/);
  });

  it('does not throw when the actual value excludes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(4);
    }).toNotThrow();
  });

  it('throws when the actual value includes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(2);
    }).toThrow(/includes/);
  });
});
