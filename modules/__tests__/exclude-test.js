var expect = require('../index');

describe('Expectation#toExclude', function () {
  it('requires the actual value to be an array or string', function () {
    expect(function () {
      expect(1).toExclude(2);
    }).toThrow(/must be an array or string/);
  });

  it('does not throw when an array does not contain the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(4);
    }).toNotThrow();
  });

  it('throws when an array contains the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(2);
    }).toThrow(/includes/);
  });

  it('does not throw when an array does not contain the expected value', function () {
    expect(function () {
      expect('hello world').toExclude('goodbye');
    }).toNotThrow();
  });

  it('throws when a string contains the expected value', function () {
    expect(function () {
      expect('hello world').toExclude('hello');
    }).toThrow(/includes/);
  });
});
