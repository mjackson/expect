var expect = require('../index');

describe('Expectation#toMatch', function () {
  it('requires the pattern to be a RegExp', function () {
    expect(function () {
      expect('actual').toMatch('expected');
    }).toThrow(/must be a RegExp/);
  });

  it('does not throw when the actual value matches the pattern', function () {
    expect(function () {
      expect('actual').toMatch(/^actual$/);
    }).toNotThrow();
  });

  it('throws when the actual value does not match the pattern', function () {
    expect(function () {
      expect('actual').toMatch(/nope/);
    }).toThrow(/to match/);
  });
});

describe('Expectation#toNotMatch', function () {
  it('requires the pattern to be a RegExp', function () {
    expect(function () {
      expect('actual').toNotMatch('expected');
    }).toThrow(/must be a RegExp/);
  });

  it('does not throw when the actual value does not match the pattern', function () {
    expect(function () {
      expect('actual').toNotMatch(/nope/);
    }).toNotThrow();
  });

  it('throws when the actual value matches the pattern', function () {
    expect(function () {
      expect('actual').toNotMatch(/^actual$/);
    }).toThrow(/to not match/);
  });
});
