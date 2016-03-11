import expect, { assert, spyOn } from '../index'

describe('expect.extend', function () {
  const ColorAssertions = {
    toBeAColor() {
      assert(
        this.actual.match(/^#[a-fA-F0-9]{6}$/),
        'expected %s to be an HTML color',
        this.actual
      )
    }
  }

  let assertSpy
  beforeEach(function () {
    expect.extend(ColorAssertions)
    assertSpy = spyOn(expect, 'assert')
  })

  afterEach(function () {
    assertSpy.restore()
  })

  it('works', function () {
    expect('#ff00ff').toBeAColor()
    expect(assertSpy).toHaveBeenCalled()
  })
})
