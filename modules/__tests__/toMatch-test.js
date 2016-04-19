import expect from '../index'

describe('expect(string).toMatch', () => {
  it('requires the pattern to be a RegExp', () => {
    expect(() => {
      expect('actual').toMatch('expected')
    }).toThrow(/must be a RegExp/)
  })

  it('does not throw when the actual value matches the pattern', () => {
    expect(() => {
      expect('actual').toMatch(/^actual$/)
    }).toNotThrow()
  })

  it('throws when the actual value does not match the pattern', () => {
    expect(() => {
      expect('actual').toMatch(/nope/)
    }).toThrow(/to match/)
  })
})

describe('expect(object).toMatch', () => {
  it('does not throw when the actual value matches the pattern', () => {
    expect(() => {
      expect({
        statusCode: 200,
        headers: {
          server: 'express web server'
        }
      }).toMatch({
        statusCode: 200,
        headers: {
          server: /express/
        }
      })
    }).toNotThrow()
  })

  it('throws when the actual value does not match the pattern', () => {
    expect(() => {
      expect({
        statusCode: 200,
        headers: {
          server: 'nginx web server'
        }
      }).toMatch({
        statusCode: 200,
        headers: {
          server: /express/
        }
      })
    }).toThrow(/to match/)
  })
})
