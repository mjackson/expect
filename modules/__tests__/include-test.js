var expect = require('../expect');

describe('Expectation#toInclude', function () {
  it('requires the actual value to be an Array', function () {
    expect(function () {
      expect('actual').toInclude('expected');
    }).toThrow(/must be an Array/);
  });

  it('does not throw when the actual value includes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(2);
    }).toNotThrow();
  });

  it('throws when the actual value does not include the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(4);
    }).toThrow(/does not include/);
  });
});
