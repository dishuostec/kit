# hn.svelte.dev-legacy

Hacker News clone built with [Svelte](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev) using the [hnpwa-api](https://github.com/davideast/hnpwa-api) by David East.

## Running locally

This example uses a locally built version of SvelteKit, so you'll first need to build the SvelteKit library by running the following from the SvelteKit root directory:

```bash
pnpm install
pnpm build
```

You can then build an run this example, which will be accessible at [localhost:3000](http://localhost:3000):

```bash
cd examples/hn.svelte.dev-legacy
pnpm dev
```

To build and start in prod mode:

```bash
pnpm build
pnpm preview
```

## Build

### Without legacy

```bash
pnpm build
node build
```

### Legacy

#### targets `['defaults']`

```bash
pnpm build-legacy-defaults
node build-defaults
```

**Notice:**

Targets list includes `ie 11`, so legacy-plugin auto add `custom-event-polyfill`, `baseURI` and `whatwg-fetch` polyfills. So, this build works in IE 11.

<details>
    <summary>targets:</summary>

```
[
  'and_chr 95',        'and_ff 92',
  'and_qq 10.4',       'and_uc 12.12',
  'android 95',        'baidu 7.12',
  'chrome 96',         'chrome 95',
  'chrome 94',         'chrome 93',
  'chrome 92',         'edge 95',
  'edge 94',           'firefox 94',
  'firefox 93',        'firefox 92',
  'firefox 91',        'firefox 78',
  'ie 11',             'ios_saf 15',
  'ios_saf 14.5-14.8', 'ios_saf 14.0-14.4',
  'ios_saf 12.2-12.5', 'kaios 2.5',
  'op_mini all',       'op_mob 64',
  'opera 81',          'opera 80',
  'opera 79',          'safari 15.1',
  'safari 15',         'safari 14.1',
  'safari 13.1',       'samsung 15.0',
  'samsung 14.0'
]
```
</details>

<details>
    <summary>legacy polyfills:</summary>

```
{
  'core-js/modules/es.promise',
  'core-js/modules/es.array.iterator',
  '@virtual/polyfill-ie-11',
  'whatwg-fetch',
  'custom-event-polyfill',
  'core-js/modules/es.object.to-string.js',
  'core-js/modules/web.dom-collections.for-each.js',
  'core-js/modules/es.object.keys.js',
  'core-js/modules/es.array.slice.js',
  'core-js/modules/es.array.iterator.js',
  'core-js/modules/es.set.js',
  'core-js/modules/es.string.iterator.js',
  'core-js/modules/web.dom-collections.iterator.js',
  'core-js/modules/es.array.concat.js',
  'core-js/modules/es.promise.js',
  'core-js/modules/es.typed-array.int32-array.js',
  'core-js/modules/es.typed-array.copy-within.js',
  'core-js/modules/es.typed-array.every.js',
  'core-js/modules/es.typed-array.fill.js',
  'core-js/modules/es.typed-array.filter.js',
  'core-js/modules/es.typed-array.find.js',
  'core-js/modules/es.typed-array.find-index.js',
  'core-js/modules/es.typed-array.for-each.js',
  'core-js/modules/es.typed-array.includes.js',
  'core-js/modules/es.typed-array.index-of.js',
  'core-js/modules/es.typed-array.iterator.js',
  'core-js/modules/es.typed-array.join.js',
  'core-js/modules/es.typed-array.last-index-of.js',
  'core-js/modules/es.typed-array.map.js',
  'core-js/modules/es.typed-array.reduce.js',
  'core-js/modules/es.typed-array.reduce-right.js',
  'core-js/modules/es.typed-array.reverse.js',
  'core-js/modules/es.typed-array.set.js',
  'core-js/modules/es.typed-array.slice.js',
  'core-js/modules/es.typed-array.some.js',
  'core-js/modules/es.typed-array.sort.js',
  'core-js/modules/es.typed-array.subarray.js',
  'core-js/modules/es.typed-array.to-locale-string.js',
  'core-js/modules/es.typed-array.to-string.js',
  'core-js/modules/es.array.sort.js',
  'core-js/modules/es.object.get-own-property-descriptors.js',
  'core-js/modules/es.array.from.js',
  'core-js/modules/es.array.splice.js',
  'core-js/modules/es.function.name.js',
  'core-js/modules/es.string.starts-with.js',
  'core-js/modules/es.string.trim.js',
  'core-js/modules/es.array.map.js',
  'core-js/modules/es.regexp.exec.js',
  'core-js/modules/es.string.split.js',
  'core-js/modules/es.array.filter.js',
  'core-js/modules/es.array.join.js',
  'core-js/modules/es.string.anchor.js',
  'core-js/modules/esnext.global-this.js',
  'core-js/modules/es.map.js',
  'core-js/modules/es.object.assign.js',
  'core-js/modules/es.string.replace.js',
  'core-js/modules/es.array.fill.js',
  'core-js/modules/es.symbol.js',
  'core-js/modules/es.symbol.description.js',
  'core-js/modules/es.symbol.iterator.js',
  'core-js/modules/es.object.get-prototype-of.js',
  'core-js/modules/es.reflect.construct.js',
  'core-js/modules/es.reflect.get.js',
  'core-js/modules/es.object.get-own-property-descriptor.js',
  'core-js/modules/es.regexp.to-string.js',
  'core-js/modules/es.string.ends-with.js',
  'regenerator-runtime/runtime.js',
  'core-js/modules/es.object.is-extensible.js',
  'core-js/modules/es.object.prevent-extensions.js',
  'core-js/modules/es.reflect.apply.js',
  'core-js/modules/es.string.match.js',
  'core-js/modules/es.object.get-own-property-names.js',
  'core-js/modules/es.object.freeze.js',
  'core-js/modules/es.symbol.to-string-tag.js',
  'core-js/modules/es.json.to-string-tag.js',
  'core-js/modules/es.math.to-string-tag.js',
  'core-js/modules/es.promise.finally.js',
  'core-js/modules/es.regexp.constructor.js',
  'core-js/modules/es.symbol.is-concat-spreadable.js',
  'core-js/modules/es.symbol.species.js',
  'core-js/modules/es.array.species.js',
  'core-js/modules/es.symbol.unscopables.js',
  'core-js/modules/es.array.find.js',
  'core-js/modules/es.array.includes.js',
  'core-js/modules/es.string.includes.js',
  'core-js/modules/es.array-buffer.constructor.js',
  'core-js/modules/es.object.is-frozen.js',
  'core-js/modules/es.weak-set.js',
  'core-js/modules/es.weak-map.js',
  'core-js/modules/esnext.string.replace-all.js',
  'core-js/modules/es.regexp.flags.js',
  'core-js/modules/es.string.bold.js',
  'core-js/modules/es.string.search.js',
  'core-js/modules/es.number.constructor.js',
  'core-js/modules/es.symbol.to-primitive.js',
  'core-js/modules/es.date.to-primitive.js',
  'core-js/modules/es.array.copy-within.js',
  'core-js/modules/es.array.find-index.js',
  'core-js/modules/web.url-search-params.js',
  'core-js/modules/web.url.js',
  'core-js/modules/web.url.to-json.js'
}
```
</details>

#### targets `['defaults', 'not ie > 0']`

```bash
pnpm build-legacy-no-ie
node build-no-ie
```

<details>
    <summary>targets:</summary>

```
[
  'and_chr 96',        'and_ff 94',
  'and_qq 10.4',       'and_uc 12.12',
  'android 96',        'baidu 7.12',
  'chrome 96',         'chrome 95',
  'chrome 94',         'chrome 93',
  'chrome 92',         'edge 96',
  'edge 95',           'edge 94',
  'firefox 94',        'firefox 93',
  'firefox 92',        'firefox 91',
  'firefox 78',        'ios_saf 15',
  'ios_saf 14.5-14.8', 'ios_saf 14.0-14.4',
  'ios_saf 12.2-12.5', 'kaios 2.5',
  'op_mini all',       'op_mob 64',
  'opera 81',          'opera 80',
  'opera 79',          'safari 15.1',
  'safari 15',         'safari 14.1',
  'safari 13.1',       'samsung 15.0',
  'samsung 14.0'
]
```
</details>

<details>
    <summary>legacy polyfills:</summary>

```
{
  'core-js/modules/es.promise',
  'core-js/modules/es.array.iterator',
  'core-js/modules/web.dom-collections.iterator.js',
  'core-js/modules/es.typed-array.int32-array.js',
  'core-js/modules/es.typed-array.sort.js',
  'core-js/modules/es.string.replace.js',
  'core-js/modules/es.promise.finally.js',
  'core-js/modules/esnext.string.replace-all.js',
  'core-js/modules/web.url-search-params.js',
  'core-js/modules/web.url.js',
  'core-js/modules/web.url.to-json.js'
}
```
</details>
