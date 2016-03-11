import expect from '../index'
const cjsExpect = require('../index')

describe('default export', () => {
  it('is a function', () => {
    expect(typeof cjsExpect).toEqual('function')
  })

  it('is the same whether import-ed or require-d', () => {
    expect(cjsExpect).toEqual(expect)
  })
})
