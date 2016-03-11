import expect, { assert, extend } from '../index'

describe('expect.extend', () => {
  const ColorAssertions = {
    toBeAColor() {
      assert(
        this.actual.match(/^#[a-fA-F0-9]{6}$/),
        'expected %s to be an HTML color',
        this.actual
      )
    }
  }

  it('works', () => {
    expect(expect().toBeAColor).toNotExist()
    extend(ColorAssertions)
    expect(expect().toBeAColor).toBeA(Function)
  })
})
