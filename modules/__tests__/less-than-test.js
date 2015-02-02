var expect = require('../index');

describe('Expectation#toBeLessThan', function () {
  it('does not throw when the actual value is less than the expected value', function () {
    expect(function () {
      expect(2).toBeLessThan(3);
    }).toNotThrow();
  });

  it('throws when the actual value is not less than the expected value', function () {
    expect(function () {
      expect(3).toBeLessThan(2);
    }).toThrow(/not less/);
  });
});
