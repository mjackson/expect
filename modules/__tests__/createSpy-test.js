/* eslint-disable prefer-rest-params */
import expect, { createSpy, isSpy } from '../index'

describe('createSpy', () => {
  describe('when given a function', () => {
    it('returns a spy function', () => {
      const spy = createSpy(() => {})
      expect(spy).toBeA(Function)
    })
  })

  describe('when not given a function', () => {
    it('throws an error', () => {
      expect(() => {
        createSpy(0)
      }).toThrow()
    })
  })
})

describe('A spy', () => {
  let targetContext, targetArguments
  const target = {
    method() {
      targetContext = this
      targetArguments = Array.prototype.slice.call(arguments, 0)
    }
  }

  let spy
  beforeEach(() => {
    spy = createSpy(target.method)
    targetContext = targetArguments = null
  })

  it('is a spy', () => {
    expect(isSpy(spy)).toBe(true)
  })

  it('has the same length as the function passed in', () => {
    expect(spy.length).toBe(0)
    expect(createSpy(a => a).length).toBe(1)
    expect(createSpy((a, b, c) => a * b * c).length).toBe(3)
  })

  it('has a destroy method', () => {
    expect(spy.destroy).toBeA(Function)
  })

  it('has a restore method', () => {
    expect(spy.restore).toBeA(Function)
  })

  it('has a reset method', () => {
    expect(spy.reset).toBeA(Function)
  })

  it('reset clears out all previous calls', () => {
    spy()
    expect(spy.calls.length).toEqual(1)
    spy.reset()
    expect(spy.calls.length).toEqual(0)
  })

  it('knows how many times it has been called', () => {
    spy()
    spy()
    expect(spy.calls.length).toEqual(2)
  })

  it('knows the arguments it was called with', () => {
    spy(1, 2, 3)
    expect(spy).toHaveBeenCalledWith(1, 2, 3)
  })

  describe('that calls some other function', () => {
    let otherContext, otherArguments
    function otherFn() {
      otherContext = this
      otherArguments = Array.prototype.slice.call(arguments, 0)
    }

    beforeEach(() => {
      spy.andCall(otherFn)
      otherContext = otherArguments = null
    })

    it('calls that function', () => {
      spy()
      expect(otherContext).toNotBe(null)
    })

    it('uses the correct context', () => {
      const context = {}
      spy.call(context)
      expect(otherContext).toBe(context)
    })

    it('passes the arguments through', () => {
      spy(1, 2, 3)
      expect(otherArguments).toEqual([ 1, 2, 3 ])
    })
  })

  describe('that calls through', () => {
    beforeEach(() => {
      spy.andCallThrough()
    })

    it('calls the original function', () => {
      spy()
      expect(targetContext).toNotBe(null)
    })

    it('uses the correct context', () => {
      const context = {}
      spy.call(context)
      expect(targetContext).toBe(context)
    })

    it('passes the arguments through', () => {
      spy(1, 2, 3)
      expect(targetArguments).toEqual([ 1, 2, 3 ])
    })
  })

  describe('with a thrown value', () => {
    beforeEach(() => {
      spy.andThrow('hello')
    })

    it('throws the correct value', () => {
      expect(spy).toThrow('hello')
    })
  })

  describe('with a return value', () => {
    beforeEach(() => {
      spy.andReturn('hello')
    })

    it('returns the correct value', () => {
      expect(spy()).toEqual('hello')
    })
  })
})
