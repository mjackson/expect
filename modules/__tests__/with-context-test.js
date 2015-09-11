var expect = require('../index');

describe('Expectation#withContext', function () {
  var context = {
    check: true
  };
  var fn = function (arg) {
    if (this.check && typeof arg === 'undefined') {
      throw new Error('context found');
    }
    if (this.check && arg === 'good') {
      throw new Error('context and args found');
    }
  };

  it('calls function with context', function () {
    expect(function () {
      expect(fn).withContext(context).toThrow(/context found/);
    }).toNotThrow();
  });

  it('calls function with context and args', function () {
    expect(function () {
      expect(fn).withContext(context).withArgs('good').toThrow(/context and args found/);
    }).toNotThrow();
  });

  it('throws when actual is not a function', function () {
    expect(function () {
      expect('not a function').withContext(context).toThrow();
    }).toThrow(/must be a function/);
  });
});
