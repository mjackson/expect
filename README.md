expect lets you write expect-style assertions for your node programs. This means you don't need to remember the order of actual and expected arguments to functions like `assert.equal`, which helps you write better tests.

### Examples

```js
var expect = require('expect');

expect(new User).toBeA(User);
expect('a string').toMatch(/string/);
expect(2).toBeLessThan(3);
expect(3).toBeGreaterThan(2);
expect([ 1, 2, 3 ]).toInclude(2);

expect(aValue).toBe(aValue); // same as assert.strictEqual
expect('a value').toEqual('a value'); // same as assert.deepEqual
expect(function () {
  throw new Error('boom!');
}).toThrow(/boom/); // same as assert.throws
```

### License

MIT
