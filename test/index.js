var expect = require('./expect');

describe('Expectation#toBeA', function () {
  it('requires the constructor to be a function', function () {
    expect(function () {
      expect('actual').toBeA('expected');
    }).toThrow(/must be a function/);
  });

  var Expectation = expect;

  it('does not throw when the actual value is an instanceof the constructor', function () {
    expect(function () {
      expect(new Expectation).toBeA(Expectation);
    }).toNotThrow();
  });

  it('throws when the actual value is not an instanceof the constructor', function () {
    expect(function () {
      expect('actual').toBeA(Expectation);
    }).toThrow(/is not a/);
  });
});

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
    }).toThrow(/does not match/);
  });
});

describe('Expectation#toBeLessThan', function () {
  it('does not throw when the actual value is less than the expected value', function () {
    expect(function () {
      expect(2).toBeLessThan(3);
    }).toNotThrow();
  });

  it('throws when the actual value is not less than the expected value', function () {
    expect(function () {
      expect(3).toBeLessThan(2);
    }).toThrow(/not less/);
  });
});

describe('Expectation#toBeGreaterThan', function () {
  it('does not throw when the actual value is greater than the expected value', function () {
    expect(function () {
      expect(3).toBeGreaterThan(2);
    }).toNotThrow();
  });
  
  it('throws when the actual value is not greater than the expected value', function () {
    expect(function () {
      expect(2).toBeGreaterThan(3);
    }).toThrow(/not greater/);
  });
});

describe('Expectation#toInclude', function () {
  it('requires the actual value to be an Array', function () {
    expect(function () {
      expect('actual').toInclude('expected');
    }).toThrow(/must be an Array/);
  });

  it('does not throw when the actual value includes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(2);
    }).toNotThrow();
  });

  it('throws when the actual value does not include the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toInclude(4);
    }).toThrow(/does not include/);
  });
});

describe('Expectation#toExclude', function () {
  it('requires the actual value to be an Array', function () {
    expect(function () {
      expect('actual').toExclude('expected');
    }).toThrow(/must be an Array/);
  });

  it('does not throw when the actual value excludes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(4);
    }).toNotThrow();
  });

  it('throws when the actual value includes the expected value', function () {
    expect(function () {
      expect([ 1, 2, 3 ]).toExclude(2);
    }).toThrow(/includes/);
  });
});
