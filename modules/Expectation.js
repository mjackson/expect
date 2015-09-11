var deepEqual = require('deep-equal');
var isRegExp = require('is-regexp');
var invariant = require('./invariant');
var isFunction = require('./isFunction');
var functionThrows = require('./functionThrows');
var stringContains = require('./stringContains');
var arrayContains = require('./arrayContains');
var isA = require('./isA');
var isArray = Array.isArray;

/**
 * An Expectation is a wrapper around an assertion that allows it to be written
 * in a more natural style, without the need to remember the order of arguments.
 * This helps prevent you from making mistakes when writing tests.
 */
function Expectation(actual) {
  if (!(this instanceof Expectation))
    return new Expectation(actual);

  this.actual = actual;

  if (isFunction(actual)) {
    this.context = null;
    this.args = [];
  }
}

Expectation.prototype.toExist = function (message) {
  invariant(
    this.actual,
    (message || 'Expected %s to exist'),
    this.actual
  );

  return this;
};

Expectation.prototype.toNotExist = function (message) {
  invariant(
    !this.actual,
    (message || 'Expected %s to not exist'),
    this.actual
  );

  return this;
};

Expectation.prototype.toBe = function (value, message) {
  invariant(
    this.actual === value,
    (message || 'Expected %s to be %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toNotBe = function (value, message) {
  invariant(
    this.actual !== value,
    (message || 'Expected %s to not be %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toEqual = function (value, message) {
  invariant(
    deepEqual(this.actual, value),
    (message || 'Expected %s to equal %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toNotEqual = function (value, message) {
  invariant(
    !deepEqual(this.actual, value),
    (message || 'Expected %s to not equal %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toThrow = function (value, message) {
  invariant(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).toThrow() must be a function, %s was given',
    this.actual
  );

  invariant(
    functionThrows(this.actual, this.context, this.args, value),
    (message || 'Expected %s to throw %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toNotThrow = function (value, message) {
  invariant(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given',
    this.actual
  );

  invariant(
    !functionThrows(this.actual, this.context, this.args, value),
    (message || 'Expected %s to not throw %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toBeA = function (value, message) {
  invariant(
    isFunction(value) || typeof value === 'string',
    'The "value" argument in toBeA(value) must be a function or a string'
  );

  invariant(
    isA(this.actual, value),
    (message || 'Expected %s to be a %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toNotBeA = function (value, message) {
  invariant(
    isFunction(value) || typeof value === 'string',
    'The "value" argument in toNotBeA(value) must be a function or a string'
  );

  invariant(
    !isA(this.actual, value),
    (message || 'Expected %s to be a %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toMatch = function (pattern, message) {
  invariant(
    typeof this.actual === 'string',
    'The "actual" argument in expect(actual).toMatch() must be a string'
  );

  invariant(
    isRegExp(pattern),
    'The "value" argument in toMatch(value) must be a RegExp'
  );

  invariant(
    pattern.test(this.actual),
    (message || 'Expected %s to match %s'),
    this.actual,
    pattern
  );

  return this;
};

Expectation.prototype.toNotMatch = function (pattern, message) {
  invariant(
    typeof this.actual === 'string',
    'The "actual" argument in expect(actual).toNotMatch() must be a string'
  );

  invariant(
    isRegExp(pattern),
    'The "value" argument in toNotMatch(value) must be a RegExp'
  );

  invariant(
    !pattern.test(this.actual),
    (message || 'Expected %s to not match %s'),
    this.actual,
    pattern
  );

  return this;
};

Expectation.prototype.toBeLessThan = function (value, message) {
  invariant(
    typeof this.actual === 'number',
    'The "actual" argument in expect(actual).toBeLessThan() must be a number'
  );

  invariant(
    typeof value === 'number',
    'The "value" argument in toBeLessThan(value) must be a number'
  );

  invariant(
    this.actual < value,
    (message || 'Expected %s to be less than %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toBeGreaterThan = function (value, message) {
  invariant(
    typeof this.actual === 'number',
    'The "actual" argument in expect(actual).toBeGreaterThan() must be a number'
  );

  invariant(
    typeof value === 'number',
    'The "value" argument in toBeGreaterThan(value) must be a number'
  );

  invariant(
    this.actual > value,
    (message || 'Expected %s to be greater than %s'),
    this.actual,
    value
  );

  return this;
};

Expectation.prototype.toInclude = function (value, comparator, message) {
  invariant(
    isArray(this.actual) || typeof this.actual === 'string',
    'The "actual" argument in expect(actual).toInclude() must be an array or a string'
  );

  if (typeof comparator === 'string') {
    message = comparator;
    comparator = null;
  }

  message = message || 'Expected %s to include %s';

  if (isArray(this.actual)) {
    invariant(
      arrayContains(this.actual, value, comparator),
      message,
      this.actual,
      value
    );
  } else {
    invariant(
      stringContains(this.actual, value),
      message,
      this.actual,
      value
    );
  }

  return this;
};

Expectation.prototype.toExclude = function (value, comparator, message) {
  invariant(
    isArray(this.actual) || typeof this.actual === 'string',
    'The "actual" argument in expect(actual).toExclude() must be an array or a string'
  );

  if (typeof comparator === 'string') {
    message = comparator;
    comparator = null;
  }

  message = message || 'Expected %s to exclude %s';

  if (isArray(this.actual)) {
    invariant(
      !arrayContains(this.actual, value, comparator),
      message,
      this.actual,
      value
    );
  } else {
    invariant(
      !stringContains(this.actual, value),
      message,
      this.actual,
      value
    );
  }

  return this;
};

Expectation.prototype.toHaveBeenCalled = function (message) {
  var spy = this.actual;

  invariant(
    spy && spy.__isSpy,
    'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy'
  );

  invariant(
    spy.calls.length > 0,
    (message || 'spy was not called')
  );

  return this;
};

Expectation.prototype.toHaveBeenCalledWith = function () {
  var spy = this.actual;

  invariant(
    spy && spy.__isSpy,
    'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy'
  );

  var expectedArgs = Array.prototype.slice.call(arguments, 0);

  invariant(
    spy.calls.some(function (call) {
      return deepEqual(call.arguments, expectedArgs);
    }),
    'spy was never called with %s',
    expectedArgs
  );

  return this;
};

Expectation.prototype.toNotHaveBeenCalled = function (message) {
  var spy = this.actual;

  invariant(
    spy && spy.__isSpy,
    'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy'
  );

  invariant(
    spy.calls.length === 0,
    (message || 'spy was not supposed to be called')
  );

  return this;
};

Expectation.prototype.withContext = function (context) {
  invariant(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).withContext() must be a function'
  );

  this.context = context;

  return this;
};

Expectation.prototype.withArgs = function () {
  invariant(
    isFunction(this.actual),
    'The "actual" argument in expect(actual).withArgs() must be a function'
  );

  if (arguments.length)
    this.args = this.args.concat(Array.prototype.slice.call(arguments, 0));

  return this;
};

var aliases = {
  toBeAn: 'toBeA',
  toNotBeAn: 'toNotBeA',
  toBeTruthy: 'toExist',
  toBeFalsy: 'toNotExist',
  toBeFewerThan: 'toBeLessThan',
  toBeMoreThan: 'toBeGreaterThan',
  toContain: 'toInclude',
  toNotContain: 'toExclude'
};

for (var alias in aliases)
  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];

module.exports = Expectation;
