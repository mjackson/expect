/*eslint-env mocha */
import expect, { spyOn } from '../index'

describe('A function that was spied on', function () {
  const video = {
    play: function () {}
  }

  let spy
  beforeEach(function () {
    spy = spyOn(video, 'play')
    video.play('some', 'args')
  })

  it('tracks the number of calls', function () {
    expect(spy.calls.length).toEqual(1)
  })

  it('tracks the context that was used', function () {
    expect(spy.calls[0].context).toBe(video)
  })

  it('tracks the arguments that were used', function () {
    expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
  })

  it('was called', function () {
    expect(spy).toHaveBeenCalled()
  })

  it('was called with the correct args', function () {
    expect(spy).toHaveBeenCalledWith('some', 'args')
  })

  it('can be restored', function () {
    expect(video.play).toEqual(spy)
    spy.restore()
    expect(video.play).toNotEqual(spy)
  })
})

describe('A function that was spied on but not called', function () {
  const video = {
    play: function () {}
  }

  let spy
  beforeEach(function () {
    spy = spyOn(video, 'play')
  })

  it('number of calls to be zero', function () {
    expect(spy.calls.length).toEqual(0)
  })

  it('was not called', function () {
    expect(spy).toNotHaveBeenCalled()
  })
})
