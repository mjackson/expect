var invariant = require('./invariant');
var isFunction = require('./isFunction');

function noop() {}

function createSpy(fn) {
  if (fn == null)
    fn = noop;

  invariant(
    isFunction(fn),
    'createSpy needs a function'
  );

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

function spyOn(object, methodName) {
  var original = object[methodName];

  if (original == null || !original.__isSpy) {
    var spy = createSpy(original);

    spy.restore = spy.destroy = function () {
      object[methodName] = original;
    };

    object[methodName] = spy;
  }

  return object[methodName];
}

module.exports = {
  createSpy: createSpy,
  spyOn: spyOn
};
