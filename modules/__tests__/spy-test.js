var expect = require('../index');

describe('createSpy', function () {
  describe('when given a function', function () {
    it('returns a spy function', function () {
      var spy = expect.createSpy(function () {});
      expect(spy).toBeA(Function);
    });
  });

  describe('when not given a function', function () {
    it('throws an error', function () {
      expect(function () {
        expect.createSpy(0);
      }).toThrow();
    });
  });
});


describe('A function spied but not called', function () {
  var video = {
    play: function () {}
  };

  var spy;
  beforeEach(function () {
    spy = expect.spyOn(video, 'play');
  });

  it('number of calls to be zero', function () {
    expect(spy.calls.length).toEqual(0);
  });

  it('was not called', function () {
    expect(spy).toNotHaveBeenCalled();
  });

});

describe('A function that was spied on using spyOn', function () {
  var video = {
    play: function () {}
  };

  var spy;
  beforeEach(function () {
    spy = expect.spyOn(video, 'play');
    video.play('some', 'args');
  });

  it('tracks the number of calls', function () {
    expect(spy.calls.length).toEqual(1);
  });

  it('tracks the context that was used', function () {
    expect(spy.calls[0].context).toBe(video);
  });

  it('tracks the arguments that were used', function () {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ]);
  });

  it('was called', function () {
    expect(spy).toHaveBeenCalled();
  });

  it('was called with the correct args', function () {
    expect(spy).toHaveBeenCalledWith('some', 'args');
  });

  it('can be restored', function () {
    expect(video.play).toEqual(spy);
    spy.restore();
    expect(video.play).toNotEqual(spy);
  });
});

describe('An undefined property that was spied on using spyOn', function () {
  var video = {};

  var spy;
  beforeEach(function () {
    spy = expect.spyOn(video, 'play');
    video.play('some', 'args');
  });

  it('tracks the number of calls', function () {
    expect(spy.calls.length).toEqual(1);
  });

  it('tracks the context that was used', function () {
    expect(spy.calls[0].context).toBe(video);
  });

  it('tracks the arguments that were used', function () {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ]);
  });

  it('was called', function () {
    expect(spy).toHaveBeenCalled();
  });

  it('was called with the correct args', function () {
    expect(spy).toHaveBeenCalledWith('some', 'args');
  });

  it('can be restored', function () {
    expect(video.play).toEqual(spy);
    spy.restore();
    expect(video.play).toNotEqual(spy);
  });
});

describe('A spy', function () {
  var targetContext, targetArguments;
  var target = {
    method: function () {
      targetContext = this;
      targetArguments = Array.prototype.slice.call(arguments, 0);
    }
  };

  var spy;
  beforeEach(function () {
    spy = expect.createSpy(target.method);
    targetContext = targetArguments = null;
  });

  it('knows how many times it has been called', function () {
    spy();
    spy();
    expect(spy.calls.length).toEqual(2);
  });

  it('knows the arguments it was called with', function () {
    spy(1, 2, 3);
    expect(spy).toHaveBeenCalledWith(1, 2, 3);
  });

  describe('that calls some other function', function () {
    var otherContext, otherArguments;
    function otherFn() {
      otherContext = this;
      otherArguments = Array.prototype.slice.call(arguments, 0);
    }

    beforeEach(function () {
      spy.andCall(otherFn);
      otherContext = otherArguments = null;
    });

    it('calls that function', function () {
      spy();
      expect(otherContext).toNotBe(null);
    });

    it('uses the correct context', function () {
      var context = {};
      spy.call(context);
      expect(otherContext).toBe(context);
    });

    it('passes the arguments through', function () {
      spy(1, 2, 3);
      expect(otherArguments).toEqual([ 1, 2, 3 ]);
    });
  });

  describe('that calls through', function () {
    beforeEach(function () {
      spy.andCallThrough();
    });

    it('calls the original function', function () {
      spy();
      expect(targetContext).toNotBe(null);
    });

    it('uses the correct context', function () {
      var context = {};
      spy.call(context);
      expect(targetContext).toBe(context);
    });

    it('passes the arguments through', function () {
      spy(1, 2, 3);
      expect(targetArguments).toEqual([ 1, 2, 3 ]);
    });
  });

  describe('with a thrown value', function () {
    beforeEach(function () {
      spy.andThrow('hello');
    });

    it('throws the correct value', function () {
      expect(spy).toThrow('hello');
    });
  });

  describe('with a return value', function () {
    beforeEach(function () {
      spy.andReturn('hello');
    });

    it('returns the correct value', function () {
      expect(spy()).toEqual('hello');
    });
  });
});
