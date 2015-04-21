var expect = require('../index');

describe('Expectation#toBeTruthy', function () {
  it('does not throw on truthy actual values', function () {
    expect(function () {
      expect(1).toBeTruthy();
      expect({"hello": "world"}).toBeTruthy();
      expect([1,2,3]).toBeTruthy();
    }).toNotThrow();
  });

  it('throws on falsy actual values', function () {
    expect(function () {
      expect(0).toBeTruthy();
    }).toThrow();

    expect(function () {
      expect(null).toBeTruthy();
    }).toThrow();

    expect(function () {
      expect(undefined).toBeTruthy();
    }).toThrow();
  });

});

describe('Expectation#toBeFalsy', function () {
  it('throws on truthy values', function () {
    expect(function () {
      expect(42).toBeFalsy();
    }).toThrow();

    expect(function () {
      expect({foo: "bar"}).toBeFalsy();
    }).toThrow();

    expect(function () {
      expect([]).toBeFalsy();
    }).toThrow();
  });

  it('does not throw with falsy actual values', function () {
    expect(function () {
      expect(0).toBeFalsy();
      expect(null).toBeFalsy();
      expect(undefined).toBeFalsy();
    }).toNotThrow();
  });
});
