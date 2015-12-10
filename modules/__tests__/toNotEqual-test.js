/*eslint-env mocha */
import expect from '../index'

describe('toNotEqual', function () {
  it('works with Map', function () {
    const a = new Map()
    a.set('key', 'value')

    const b = new Map()
    b.set('key', 'another value')

    expect(a).toNotEqual(b)
  })

  it('works with Set', function () {
    const a = new Set('a')
    const b = new Set('b')
    expect(a).toNotEqual(b)
  })
})
