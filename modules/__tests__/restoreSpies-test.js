/*eslint-env mocha */
import expect, { createSpy, spyOn, restoreSpies } from '../index'

describe('restoreSpies', function () {
  describe('with one spy', function () {
    const original = function () {}
    const target = { method: original }

    beforeEach(function () {
      spyOn(target, 'method')
    })

    it('works with spyOn()', function () {
      expect(target.method).toNotEqual(original)
      restoreSpies()
      expect(target.method).toEqual(original)
    })

    it('is idempotent', function () {
      expect(target.method).toNotEqual(original)
      restoreSpies()
      restoreSpies()
      expect(target.method).toEqual(original)
    })

    it('can work even on createSpy()', function () {
      createSpy(original)
      restoreSpies()
    })
  })

  describe('with multiple spies', function () {
    const originals = [ function () {}, function () {} ]
    const targets = [
      { method: originals[0] },
      { method: originals[1] }
    ]

    it('still works', function () {
      spyOn(targets[0], 'method')
      spyOn(targets[1], 'method')

      expect(targets[0].method).toNotEqual(originals[0])
      expect(targets[1].method).toNotEqual(originals[1])

      restoreSpies()

      expect(targets[0].method).toEqual(originals[0])
      expect(targets[1].method).toEqual(originals[1])
    })
  })
})
