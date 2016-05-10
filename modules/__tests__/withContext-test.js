/*eslint-disable newline-per-chained-call*/
import expect from '../index'

describe('withContext', () => {
  const context = {
    check: true
  }

  const fn = function fn(arg) {
    if (this.check && typeof arg === 'undefined')
      throw new Error('context found')

    if (this.check && arg === 'good')
      throw new Error('context and args found')
  }

  it('calls function with context', () => {
    expect(() => {
      expect(fn).withContext(context).toThrow(/context found/)
    }).toNotThrow()
  })

  it('calls function with context and args', () => {
    expect(() => {
      expect(fn).withContext(context).withArgs('good').toThrow(/context and args found/)
    }).toNotThrow()
  })

  it('throws when actual is not a function', () => {
    expect(() => {
      expect('not a function').withContext(context).toThrow()
    }).toThrow(/must be a function/)
  })
})
