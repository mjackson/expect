## [v1.14.0]
> Feb 1, 2015

- Added `toBeGreaterThanOrEqualTo` and `toBeLessThanOrEqualTo` ([#11] and [#59])
- Added `spy.reset()` ([#57])

[v1.14.0]: https://github.com/mjackson/expect/compare/v1.13.4...v1.14.0
[#11]: https://github.com/mjackson/expect/issues/11
[#59]: https://github.com/mjackson/expect/issues/59
[#57]: https://github.com/mjackson/expect/pull/57

## [v1.13.4]
> Dec 16, 2015

- Fixed comparing two arrays of nested objects when the first items are not equal ([#53])

[v1.13.4]: https://github.com/mjackson/expect/compare/v1.13.3...v1.13.4
[#53]: https://github.com/mjackson/expect/issues/53

## [v1.13.3]
> Dec 14, 2015

- Fix failing Map/Set tests

[v1.13.3]: https://github.com/mjackson/expect/compare/v1.13.2...v1.13.3

## [v1.13.2]
> Dec 11, 2015

- Bump is-equal dependency to 1.4

[v1.13.2]: https://github.com/mjackson/expect/compare/v1.13.1...v1.13.2

## [v1.13.1]
> Dec 10, 2015

- Fix comparisons of ES6 iterables Map and Set ([#47])
- Fix comparisons of objects with circular references ([#50])
- Better error messages in `toThrow`/`toNotThrow`

[v1.13.1]: https://github.com/mjackson/expect/compare/v1.13.0...v1.13.1
[#47]: https://github.com/mjackson/expect/issues/47
[#50]: https://github.com/mjackson/expect/issues/50

## [v1.13.0]
> Nov 13, 2015

- Fix `toInclude` to use `deepEqual` for comparisons ([#44])
- Run test suite in browsers

[v1.13.0]: https://github.com/mjackson/expect/compare/v1.12.2...v1.13.0
[#44]: https://github.com/mjackson/expect/issues/44

## [v1.12.2]
> Oct 13, 2015

- Fix postinstall script on Windows (see [#39])

[v1.12.2]: https://github.com/mjackson/expect/compare/v1.12.1...v1.12.2
[#39]: https://github.com/mjackson/expect/issues/39

## [v1.12.1]
> Oct 10, 2015

- Add support for building on Windows
- Add postinstall npm script for installing from git repo

[v1.12.1]: https://github.com/mjackson/expect/compare/v1.12.0...v1.12.1

## [v1.12.0]
> Oct 5, 2015

- Add `expect.extend(assertions)` (see [#34])
- Add `expect.restoreSpies()` (see [#12])
- Show object diffs using `toEqual()` in Mocha (see [#29])

[v1.12.0]: https://github.com/mjackson/expect/compare/v1.11.1...v1.12.0
[#29]: https://github.com/mjackson/expect/issues/29
[#34]: https://github.com/mjackson/expect/pull/34

## [v1.11.1]
> Sep 26, 2015

- Add `spy.destroy()` (see [#12])

[v1.11.1]: https://github.com/mjackson/expect/compare/v1.11.0...v1.11.1
[#12]: https://github.com/mjackson/expect/issues/12

## [v1.11.0]
> Sep 12, 2015

- Add `expect.isSpy()`
- Significant internal refactoring to use ES6 classes and the Babel transpiler

[v1.11.0]: https://github.com/mjackson/expect/compare/v1.10.0...v1.11.0

## [v1.10.0]
> Sep 3, 2015

- Add `expect(spy).toNotHaveBeenCalled()`
- Add `expect(obj).toBeAn('array')`
- Add `expect(str).toNotMatch(regexp)`
- Use [invariant](https://www.npmjs.com/package/invariant) instead of `assert` where applicable
- Improve expectation error messages
- Internal: use [eslint](https://www.npmjs.com/package/eslint) for linting

[v1.10.0]: https://github.com/mjackson/expect/compare/v1.9.0...v1.10.0
