var expect = require('../expect');

describe('Expectation#toInclude', function () {
  it('requires the actual value to be an Array or String', function () {
    expect(function () {
      expect(1).toInclude(2);
    }).toThrow(/must be an Array or String/);
  });

  it('does not throw when an array contains the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(2);
    }).toNotThrow();
  });

  it('throws when an array does not contain the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(4);
    }).toThrow(/does not include/);
  });

  it('does not throw when a string contains the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('world');
    }).toNotThrow();
  });

  it('throws when a string does not contain the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('goodbye');
    }).toThrow(/does not include/);
  });
});
