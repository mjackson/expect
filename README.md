[expect](https://github.com/mjijackson/expect) is a thin wrapper around node's [assert](http://nodejs.org/api/assert.html) module that lets you write better assertions.

When you use expect, you write assertions similarly to how you would say them, e.g. "I expect this value to be equal to 3" or "I expect this array to contain 3". When you write assertions in this way, you don't need to remember the order of actual and expected arguments to functions like `assert.equal`, which helps you write better tests.

### API

#### expect(object).toBe(value, [message])

Asserts that `object` is strictly equal to `value` using [assert.strictEqual](http://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message).

#### expect(object).toNotBe(value, [message])

Asserts that `object` is not strictly equal to `value` using [assert.notStrictEqual](http://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message).

#### expect(object).toEqual(value, [message])

Asserts that the given `object` equals `value` using [assert.equal](http://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message).

#### expect(object).toNotEqual(value, [message])

Asserts that the given `object` is not equal to `value` using [assert.notEqual](http://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message).

#### expect(block).toThrow([error], [message])

Asserts that the given `block` throws an error using [assert.throws](http://nodejs.org/api/assert.html#assert_assert_throws_block_error_message). The `error` argument may be a constructor, `RegExp`, or validation function.

```js
expect(function () {
  throw new Error('boom!');
}).toThrow(/boom/);
```

#### expect(block).toNotThrow([message])

Asserts that the given `block` does not throw using [assert.doesNotThrow](http://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message).

#### expect(object).toBeA(constructor, [message])

Asserts the given `object` is an `instanceof constructor`.

```js
expect(new User).toBeA(User);
```

#### expect(string).toMatch(pattern, [message])

Asserts the given `string` matches `pattern`, which must be a `RegExp`.

```js
expect('a string').toMatch(/string/);
```

#### expect(number).toBeLessThan(value, [message])

Asserts the given `number` is less than `value`.

```js
expect(2).toBeLessThan(3);
```

#### expect(number).toBeGreaterThan(value, [message])

Asserts the given `number` is greater than `value`.

```js
expect(3).toBeGreaterThan(2);
```

#### expect(array).toInclude(value, [comparator], [message])

Asserts the given `array` contains `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toInclude(3);
```

#### expect(array).toExclude(value, [comparator], [message])

Asserts the given `array` does not contain `value`. The `comparator` function, if given, should compare two objects and either `return false` or `throw` if they are not equal. It defaults to `assert.deepEqual`.

```js
expect([ 1, 2, 3 ]).toExclude(4);
```

### License

MIT
