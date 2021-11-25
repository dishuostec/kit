QUnit.test('JSON[@@toStringTag]', assert => {
  assert.same(JSON[Symbol.toStringTag], 'JSON', 'JSON[@@toStringTag] is `JSON`');
});
