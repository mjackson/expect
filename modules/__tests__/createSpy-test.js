/*eslint-env mocha */
import expect, { createSpy, isSpy } from '../index'

describe('createSpy', function () {
  describe('when given a function', function () {
    it('returns a spy function', function () {
      const spy = createSpy(function () {})
      expect(spy).toBeA(Function)
    })
  })

  describe('when not given a function', function () {
    it('throws an error', function () {
      expect(function () {
        createSpy(0)
      }).toThrow()
    })
  })
})

describe('A spy', function () {
  let targetContext, targetArguments
  const target = {
    method: function () {
      targetContext = this
      targetArguments = Array.prototype.slice.call(arguments, 0)
    }
  }

  let spy
  beforeEach(function () {
    spy = createSpy(target.method)
    targetContext = targetArguments = null
  })

  it('is a spy', function () {
    expect(isSpy(spy)).toBe(true)
  })

  it('has a destroy method', function () {
    expect(spy.destroy).toBeA(Function)
  })

  it('has a restore method', function () {
    expect(spy.restore).toBeA(Function)
  })

  it('has a reset method', function () {
    expect(spy.reset).toBeA(Function)
  })

  it('reset clears out all previous calls', function () {
    spy()
    expect(spy.calls.length).toEqual(1)
    spy.reset()
    expect(spy.calls.length).toEqual(0)
  })

  it('knows how many times it has been called', function () {
    spy()
    spy()
    expect(spy.calls.length).toEqual(2)
  })

  it('knows the arguments it was called with', function () {
    spy(1, 2, 3)
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })

  describe('that calls some other function', function () {
    let otherContext, otherArguments
    function otherFn() {
      otherContext = this
      otherArguments = Array.prototype.slice.call(arguments, 0)
    }

    beforeEach(function () {
      spy.andCall(otherFn)
      otherContext = otherArguments = null
    })

    it('calls that function', function () {
      spy()
      expect(otherContext).toNotBe(null)
    })

    it('uses the correct context', function () {
      const context = {}
      spy.call(context)
      expect(otherContext).toBe(context)
    })

    it('passes the arguments through', function () {
      spy(1, 2, 3)
      expect(otherArguments).toEqual([ 1, 2, 3 ])
    })
  })

  describe('that calls through', function () {
    beforeEach(function () {
      spy.andCallThrough()
    })

    it('calls the original function', function () {
      spy()
      expect(targetContext).toNotBe(null)
    })

    it('uses the correct context', function () {
      const context = {}
      spy.call(context)
      expect(targetContext).toBe(context)
    })

    it('passes the arguments through', function () {
      spy(1, 2, 3)
      expect(targetArguments).toEqual([ 1, 2, 3 ])
    })
  })

  describe('with a thrown value', function () {
    beforeEach(function () {
      spy.andThrow('hello')
    })

    it('throws the correct value', function () {
      expect(spy).toThrow('hello')
    })
  })

  describe('with a return value', function () {
    beforeEach(function () {
      spy.andReturn('hello')
    })

    it('returns the correct value', function () {
      expect(spy()).toEqual('hello')
    })
  })
})
