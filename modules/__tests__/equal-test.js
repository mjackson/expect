/*eslint-env mocha */
import expect from '../index'

describe('Expectation#toEqual', function () {
  it('works', function () {
    expect(function () {
      expect('actual').toEqual('expected')
    }).toThrow(/Expected 'actual' to equal 'expected'/)
  })

  it('shows diff', function () {
    try {
      expect('actual').toEqual('expected')
    } catch (err) {
      expect(err.actual).toEqual('actual')
      expect(err.expected).toEqual('expected')
      expect(err.showDiff).toEqual(true)
    }
  })
})
