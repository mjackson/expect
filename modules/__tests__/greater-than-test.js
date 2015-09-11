var expect = require('../index');

describe('Expectation#toBeGreaterThan', function () {
  it('does not throw when the actual value is greater than the expected value', function () {
    expect(function () {
      expect(3).toBeGreaterThan(2);
    }).toNotThrow();
  });
  
  it('throws when the actual value is not greater than the expected value', function () {
    expect(function () {
      expect(2).toBeGreaterThan(3);
    }).toThrow(/to be greater than/);
  });
});
