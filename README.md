# expect [![Travis][build-badge]][build] [![npm package][npm-badge]][npm]

[build-badge]: https://img.shields.io/travis/mjackson/expect/master.svg?style=flat-square
[build]: https://travis-ci.org/mjackson/expect

[npm-badge]: https://img.shields.io/npm/v/expect.svg?style=flat-square
[npm]: https://www.npmjs.org/package/expect

[expect](https://github.com/mjackson/expect) lets you write better assertions.

When you use `expect`, you write assertions similarly to how you would say them, e.g. "I expect this value to be equal to 3" or "I expect this array to contain 3". When you write assertions in this way, you don't need to remember the order of actual and expected arguments to functions like `assert.equal`, which helps you write better tests.

You can think of `expect` as a more compact alternative to [Chai](http://chaijs.com/) or [Sinon.JS](http://sinonjs.org/), just without the pretty website. ;)

## Installation

Using [npm](https://www.npmjs.org/):

    $ npm install --save expect

Then, use as you would anything else:

```js
// using ES6 modules
import expect, { createSpy, spyOn, isSpy } from 'expect'

// using CommonJS modules
var expect = require('expect')
var createSpy = expect.createSpy
var spyOn = expect.spyOn
var isSpy = expect.isSpy
```

The UMD build is also available on [npmcdn](https://npmcdn.com):

```html
<script src="https://npmcdn.com/expect/umd/expect.min.js"></script>
```

You can find the library on `window.expect`.

## Assertions

### toExist

> `expect(object).toExist([message])`

Asserts the given `object` is truthy.

```js
expect('something truthy').toExist()
```

Aliases:
  - `toBeTruthy`

### toNotExist

> `expect(object).toNotExist([message])`

Asserts the given `object` is falsy.

```js
expect(null).toNotExist()
```

Aliases:
  - `toBeFalsy`

### toBe

> `expect(object).toBe(value, [message])`

Asserts that `object` is strictly equal to `value` using `===`.

### toNotBe

> `expect(object).toNotBe(value, [message])`

Asserts that `object` is not strictly equal to `value` using `===`.

### toEqual

> `expect(object).toEqual(value, [message])`

Asserts that the given `object` equals `value` using [is-equal](https://www.npmjs.com/package/is-equal).

### toNotEqual

> `expect(object).toNotEqual(value, [message])`

Asserts that the given `object` is not equal to `value` using [is-equal](https://www.npmjs.com/package/is-equal).

### toThrow

> `expect(block).toThrow([error], [message])`

Asserts that the given `block` `throw`s an error. The `error` argument may be a constructor (to test using `instanceof`), or a string/`RegExp` to test against `error.message`.

```js
expect(function () {
  throw new Error('boom!')
}).toThrow(/boom/)
```

### toNotThrow

> `expect(block).toNotThrow([message])`

Asserts that the given `block` does not `throw`.

### toBeA(constructor)

> `expect(object).toBeA(constructor, [message])`<br>
> `expect(object).toBeAn(constructor, [message])`

Asserts the given `object` is an `instanceof constructor`.

```js
expect(new User).toBeA(User)
expect(new Asset).toBeAn(Asset)
```

Aliases:
  - `toBeAn`

### toBeA(string)

> `expect(object).toBeA(string, [message])`<br>
> `expect(object).toBeAn(string, [message])`

Asserts the `typeof` the given `object` is `string`.

```js
expect(2).toBeA('number')
```

Aliases:
  - `toBeAn`

### toNotBeA(constructor)

> `expect(object).toNotBeA(constructor, [message])`<br>
> `expect(object).toNotBeAn(constructor, [message])`

Asserts the given `object` is *not* an `instanceof constructor`.

```js
expect(new Asset).toNotBeA(User)
expect(new User).toNotBeAn(Asset)
```

Aliases:
  - `toNotBeAn`

### toNotBeA(string)

> `expect(object).toNotBeA(string, [message])`<br>
> `expect(object).toNotBeAn(string, [message])`

Asserts the `typeof` the given `object` is *not* `string`.

```js
expect('a string').toNotBeA('number')
expect(2).toNotBeAn('object')
```

Aliases:
  - `toNotBeAn`

### toMatch

> `expect(string).toMatch(pattern, [message])`<br>
> `expect(object).toMatch(pattern, [message])`

Asserts the given `string` or `object` matches a `pattern`. When using a string, `pattern` must be a `RegExp`. When using an object, `pattern` may be anything acceptable to [`tmatch`](https://github.com/tapjs/tmatch).

```js
expect('a string').toMatch(/string/)
expect({
  statusCode: 200,
  headers: {
    server: 'nginx/1.6.5'
  }
}).toMatch({
  headers: {
    server: /nginx/
  }
})
```

### toNotMatch

> `expect(string).toMatch(pattern, [message])`<br>
> `expect(object).toMatch(pattern, [message])`

Asserts the given `string` or `object` does not match a `pattern`. When using a string, `pattern` must be a `RegExp`. When using an object, `pattern` may be anything acceptable to [`tmatch`](https://github.com/tapjs/tmatch).

```js
expect('a string').toMatch(/string/)
expect({
  statusCode: 200,
  headers: {
    server: 'nginx/1.6.5'
  }
}).toNotMatch({
  headers: {
    server: /apache/
  }
})
```

### toBeLessThan

> `expect(number).toBeLessThan(value, [message])`<br>
> `expect(number).toBeFewerThan(value, [message])`

Asserts the given `number` is less than `value`.

```js
expect(2).toBeLessThan(3)
```

Aliases:
  - `toBeFewerThan`

### toBeLessThanOrEqualTo

> `expect(number).toBeLessThanOrEqualTo(value, [message])`<br>

Asserts the given `number` is less than or equal to `value`.

```js
expect(2).toBeLessThanOrEqualTo(3)
```

### toBeGreaterThan

> `expect(number).toBeGreaterThan(value, [message])`<br>
> `expect(number).toBeMoreThan(value, [message])`

Asserts the given `number` is greater than `value`.

```js
expect(3).toBeGreaterThan(2)
```

Aliases:
  - `toBeMoreThan`

### toBeGreaterThanOrEqualTo

> `expect(number).toBeGreaterThanOrEqualTo(value, [message])`<br>

Asserts the given `number` is greater than or equal to `value`.

```js
expect(3).toBeGreaterThanOrEqualTo(2)
```

### toInclude

> `expect(array).toInclude(value, [comparator], [message])`<br>
> `expect(object).toInclude(value, [comparator], [message])`<br>
> `expect(string).toInclude(value, [message])`

Asserts that a given `value` is included (or "contained") within another. The `actual` value may be an array, object, or a string. The `comparator` function, if given, should compare two objects and `return false` if they are not equal. The default is to use [`isEqual`](https://github.com/ljharb/is-equal).

```js
expect([ 1, 2, 3 ]).toInclude(3)
expect({ a: 1, b: 2 }).toInclude({ b: 2 })
expect({ a: 1, b: 2, c: { d: 3 } }).toInclude({ b: 2, c: { d: 3 } })
expect('hello world').toInclude('world')
```

Aliases:
  - `toContain`

### toExclude

> `expect(array).toExclude(value, [comparator], [message])`<br>
> `expect(object).toExclude(value, [comparator], [message])`<br>
> `expect(string).toExclude(value, [message])`

Asserts that a given `value` is not included (or "contained") within another. The `actual` value may be an array, object, or a string. The `comparator` function, if given, should compare two objects and `return false` if they are not equal. The default is to use [`isEqual`](https://github.com/ljharb/is-equal).

```js
expect([ 1, 2, 3 ]).toExclude(4)
expect({ a: 1, b: 2 }).toExclude({ c: 2 })
expect({ a: 1, b: 2 }).toExclude({ b: 3 })
expect({ a: 1, b: 2, c: { d: 3 } }).toExclude({ c: { d: 4 } })
expect('hello world').toExclude('goodbye')
```

Aliases:
  - `toNotContain`
  - `toNotInclude`

### toIncludeKey(s)

> `expect(object).toIncludeKeys(keys, [comparator], [message])`<br>
> `expect(object).toIncludeKey(key, [comparator], [message])`

Asserts that the given `object` (may be an array, or a function, or anything with keys) contains *all* of the provided keys. The optional parameter `comparator` is a function which if given an object and a string key, it should return a boolean detailing whether or not the key exists in the object. By default, a shallow check with `Object.prototype.hasOwnProperty` is performed.

```js
expect({ a: 1 }).toIncludeKey('a')
expect({ a: 1, b: 2 }).toIncludeKeys([ 'a', 'b' ])
```

Aliases:
  - `toContainKey(s)`

### toExcludeKey(s)

> `expect(object).toExcludeKeys(keys, [comparator], [message])`<br>
> `expect(object).toExcludeKey(key, [comparator], [message])`

Asserts that the given `object` (may be an array, or a function, or anything with keys) does not contain *any* of the provided keys. The optional parameter `comparator` is a function which if given an object and a string key, it should return a boolean detailing whether or not the key exists in the object. By default, a shallow check with `Object.prototype.hasOwnProperty` is performed.

```js
expect({ a: 1 }).toExcludeKey('b')
expect({ a: 1, b: 2 }).toExcludeKeys([ 'c', 'd' ])
```

Aliases:
  - `toNotContainKey(s)`
  - `toNotIncludeKey(s)`

### (spy) toHaveBeenCalled

> `expect(spy).toHaveBeenCalled([message])`

Asserts the given `spy` function has been called at least once.

```js
expect(spy).toHaveBeenCalled()
```

### (spy) toNotHaveBeenCalled

> `expect(spy).toNotHaveBeenCalled([message])`

Asserts the given `spy` function has *not* been called.

```js
expect(spy).toNotHaveBeenCalled()
```

### (spy) toHaveBeenCalledWith

> `expect(spy).toHaveBeenCalledWith(...args)`

Asserts the given `spy` function has been called with the expected arguments.

```js
expect(spy).toHaveBeenCalledWith('foo', 'bar')
```

## Chaining Assertions

Every assertion returns an `Expectation` object, so you can chain assertions together.

```js
expect(3.14)
  .toExist()
  .toBeLessThan(4)
  .toBeGreaterThan(3)
```

## Spies

expect also includes the ability to create spy functions that can track the calls that are made to other functions and make various assertions based on the arguments and context that were used.

```js
var video = {
  play: function () {},
  pause: function () {},
  rewind: function () {}
}

var spy = expect.spyOn(video, 'play')

video.play('some', 'args')

expect(spy.calls.length).toEqual(1)
expect(spy.calls[0].context).toBe(video)
expect(spy.calls[0].arguments).toEqual([ 'some', 'args' ])
expect(spy).toHaveBeenCalled()
expect(spy).toHaveBeenCalledWith('some', 'args')

spy.restore()
expect.restoreSpies()
```

### createSpy

> `expect.createSpy()`

Creates a spy function.

```js
var spy = expect.createSpy()
```

### spyOn

> `expect.spyOn(target, method)`

Replaces the `method` in `target` with a spy.

```js
var video = {
  play: function () {}
}

var spy = expect.spyOn(video, 'play')
video.play()

spy.restore()
```

### restoreSpies

> `expect.restoreSpies()`

Restores all spies created with `expect.spyOn()`. This is the same as calling `spy.restore()` on all spies created.

```js
// mocha.js example
beforeEach(function () {
  expect.spyOn(profile, 'load')
})

afterEach(function () {
  expect.restoreSpies()
})

it('works', function () {
  profile.load()
  expect(profile.load).toHaveBeenCalled()
})
```

## Spy methods

### andCall

> `spy.andCall(fn)`

Makes the spy invoke a function `fn` when called.

```js
var dice = createSpy().andCall(function () {
  return (Math.random() * 6) | 0
})
```

### andCallThrough

> `spy.andCallThrough()`

Makes the spy call the original function it's spying on.

```js
spyOn(profile, 'load').andCallThrough()

var getEmail = createSpy(function () {
  return "hi@gmail.com"
}).andCallThrough()
```

### andReturn

> `spy.andReturn(object)`

Makes the spy return a value.

```js
var dice = expect.createSpy().andReturn(3)
```

### andThrow

> `spy.andThrow(error)`

Makes the spy throw an `error` when called.

```js
var failing = expect.createSpy()
  .andThrow(new Error('Not working'))
```

### restore

> `spy.restore()`

Restores a spy originally created with `expect.spyOn()`.

### reset

> `spy.reset()`

Clears out all saved calls to the spy.

## Extending expect

You can add your own assertions using `expect.extend` and `expect.assert`:

```js
expect.extend({
  toBeAColor() {
    expect.assert(
      this.actual.match(/^#[a-fA-F0-9]{6}$/),
      'expected %s to be an HTML color',
      this.actual
    )
    return this
  }
})

expect('#ff00ff').toBeAColor()
```

## Extensions

- [expect-element](https://github.com/mjackson/expect-element) Adds assertions that are useful for DOM elements
- [expect-jsx](https://github.com/algolia/expect-jsx) Adds things like `expect(ReactComponent).toEqualJSX(<TestComponent prop="yes" />)`
