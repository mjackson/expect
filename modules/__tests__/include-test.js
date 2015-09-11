var expect = require('../index');

describe('Expectation#toInclude', function () {
  it('requires the actual value to be an array or string', function () {
    expect(function () {
      expect(1).toInclude(2);
    }).toThrow(/must be an array or a string/);
  });

  it('does not throw when an array contains the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(2);
    }).toNotThrow();
  });

  it('throws when an array does not contain the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(4);
    }).toThrow(/to include/);
  });

  it('does not throw when a string contains the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('world');
    }).toNotThrow();
  });

  it('throws when a string does not contain the expected value', function () {
    expect(function () {
      expect('hello world').toInclude('goodbye');
    }).toThrow(/to include/);
  });
});
