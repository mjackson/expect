var assert = require('assert');
var inspect = require('util').inspect;
var isRegExp = require('util').isRegExp;
var formatString = require('util').format;
var isArray = Array.isArray;

function isFunction(object) {
  return typeof object === 'function';
}

function wrapAssertion(assertion) {
  return function () {
    var args = Array.prototype.slice.call(arguments, 0);
    assertion.apply(assert, [ this.actual ].concat(args));
    return this;
  };
}

/**
 * Returns true if the given array contains the value, false otherwise. The
 * comparator function must return false or throw to indicate a non-match.
 */
function arrayContains(array, value, comparator) {
  comparator = comparator || assert.deepEqual;

  return array.some(function (item) {
    try {
      return comparator(item, value) !== false;
    } catch (error) {
      return false;
    }
  });
}

var expect = Expectation;

/**
 * Returns true if the given string contains the value, false otherwise.
 */
function stringContains(string, value) {
  return string.indexOf(value) !== -1;
}

/**
 * An Expectation is a wrapper around an assertion that allows it to be written
 * in a more natural style, without the need to remember the order of arguments.
 * This helps prevent you from making mistakes when writing tests.
 */
function Expectation(actual) {
  if (!(this instanceof Expectation))
    return new Expectation(actual);

  this.actual = actual;
}

Expectation.prototype.toBe = wrapAssertion(assert.strictEqual);
Expectation.prototype.toNotBe = wrapAssertion(assert.notStrictEqual);
Expectation.prototype.toEqual = wrapAssertion(assert.deepEqual);
Expectation.prototype.toNotEqual = wrapAssertion(assert.notDeepEqual);
Expectation.prototype.toThrow = wrapAssertion(assert.throws);
Expectation.prototype.toNotThrow = wrapAssertion(assert.doesNotThrow);

Expectation.prototype.toExist = function (message) {
  message = message || inspect(this.actual) + ' should exist';
  assert(this.actual, message);
  return this;
};

Expectation.prototype.toNotExist = function (message) {
  message = message || inspect(this.actual) + ' should not exist';
  assert(!this.actual, message);
  return this;
};

Expectation.prototype.toBeA = function (value, message) {
  assert(
    isFunction(value) || typeof value === 'string',
    'The expected value used in toBeA(n) must be a function or string'
  );

  if (isFunction(value)) {
    message = message || inspect(this.actual) + ' is not a ' + (value.name || value.toString());
    assert(this.actual instanceof value, message);
  } else {
    message = message || inspect(this.actual) + ' is not a(n) ' + value;
    assert(typeof this.actual === value, message);
  }

  return this;
};

Expectation.prototype.toMatch = function (pattern, message) {
  assert(
    isRegExp(pattern),
    'The expected value used in toMatch must be a RegExp'
  );

  message = message || inspect(this.actual) + ' does not match ' + inspect(pattern);
  assert(pattern.test(this.actual), message);

  return this;
};

Expectation.prototype.toBeLessThan = function (value, message) {
  message = message || inspect(this.actual) + ' is not less than ' + inspect(value);
  assert(this.actual < value, message);
  return this;
};

Expectation.prototype.toBeGreaterThan = function (value, message) {
  message = message || inspect(this.actual) + ' is not greater than ' + inspect(value);
  assert(this.actual > value, message);
  return this;
};

Expectation.prototype.toInclude = function (value, comparator, message) {
  assert(
    isArray(this.actual) || typeof this.actual === 'string',
    'The actual value used in toInclude/toContain must be an array or string'
  );

  if (typeof comparator === 'string') {
    message = comparator;
    comparator = null;
  }

  message = message || inspect(this.actual) + ' does not include ' + inspect(value);

  if (isArray(this.actual)) {
    assert(
      arrayContains(this.actual, value, comparator),
      message
    );
  } else {
    assert(
      stringContains(this.actual, value),
      message
    );
  }

  return this;
};

Expectation.prototype.toExclude = function (value, comparator, message) {
  assert(
    isArray(this.actual) || typeof this.actual === 'string',
    'The actual value used in toExclude/toNotContain must be an array or string'
  );

  if (typeof comparator === 'string') {
    message = comparator;
    comparator = null;
  }

  message = message || inspect(this.actual) + ' includes ' + inspect(value);

  if (isArray(this.actual)) {
    assert(
      !arrayContains(this.actual, value, comparator),
      message
    );
  } else {
    assert(
      !stringContains(this.actual, value),
      message
    );
  }

  return this;
};

Expectation.prototype.toHaveBeenCalled = function (message) {
  var spy = this.actual;

  assert(
    spy.__isSpy,
    'The actual value used in toHaveBeenCalled must be a spy'
  );

  expect(spy.calls.length).toBeGreaterThan(0, message || 'spy was not called');

  return this;
};

Expectation.prototype.toHaveBeenCalledWith = function () {
  var spy = this.actual;

  assert(
    spy.__isSpy,
    'The actual value used in toHaveBeenCalledWith must be a spy'
  );

  var expectedArguments = Array.prototype.slice.call(arguments, 0);

  assert(
    spy.calls.some(function (call) {
      try {
        expect(call.arguments).toEqual(expectedArguments);
        return true;
      } catch (error) {
        return false;
      }
    }),
    formatString('spy was never called with %s', inspect(expectedArguments))
  );

  return this;
};

Expectation.createSpy = createSpy;

function createSpy(fn) {
  expect(fn).toBeA(Function);

  var targetFn, thrownValue, returnValue;

  var spy = function () {
    spy.calls.push({
      context: this,
      arguments: Array.prototype.slice.call(arguments, 0)
    });

    if (targetFn)
      return targetFn.apply(this, arguments);

    if (thrownValue)
      throw thrownValue;

    return returnValue;
  };

  spy.calls = [];

  spy.andCall = function (fn) {
    targetFn = fn;
    return spy;
  };

  spy.andCallThrough = function () {
    return spy.andCall(fn);
  };

  spy.andThrow = function (object) {
    thrownValue = object;
    return spy;
  };

  spy.andReturn = function (value) {
    returnValue = value;
    return spy;
  };

  spy.getLastCall = function () {
    return spy.calls[spy.calls.length - 1];
  };

  spy.__isSpy = true;

  return spy;
}

Expectation.spyOn = spyOn;

function spyOn(object, methodName) {
  expect(object[methodName]).toBeA(
    Function,
    formatString('%s does not have a method named "%s"', inspect(object), methodName)
  );

  if (!object[methodName].__isSpy)
    object[methodName] = createSpy(object[methodName]);

  return object[methodName];
}

var aliases = {
  toBeAn: 'toBeA',
  toBeFewerThan: 'toBeLessThan',
  toBeMoreThan: 'toBeGreaterThan',
  toContain: 'toInclude',
  toNotContain: 'toExclude'
};

for (var alias in aliases)
  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];

module.exports = Expectation;
