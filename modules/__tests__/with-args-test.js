var expect = require('../index');

describe('Expectation#withArgs', function () {
  var fn = function (arg1, arg2) {
    if (arg1 === 'first' && typeof arg2 === 'undefined') {
      throw new Error('first arg found');
    }
    if (arg1 === 'first' && arg2 === 'second') {
      throw new Error('both args found');
    }
  };

  it('invokes actual function with args', function () {
    expect(function () {
      expect(fn).withArgs('first').toThrow(/first arg found/);
    }).toNotThrow();
  });

  it('can be chained', function () {
    expect(function () {
      expect(fn).withArgs('first').withArgs('second').toThrow(/both args found/);
    }).toNotThrow();
  });

  it('throws when actual is not a function', function () {
    expect(function () {
      expect('not a function').withArgs('first');
    }).toThrow(/must be a function/);
  });
});
