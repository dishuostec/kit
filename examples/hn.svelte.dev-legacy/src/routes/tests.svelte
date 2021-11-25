<script context="module">
	import { browser } from '$app/env';

	if (browser && import.meta.hot) {
		import.meta.hot.on('vite:beforeUpdate', () => {
			location.reload();
		});
	}
</script>

<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		// const QUnit = await import('qunit');
		await import('$lib/tests/helpers/qunit-helpers.js');


		await import('$lib/tests/tests/es.array.concat.js');
		await import('$lib/tests/tests/es.array.fill.js');
		await import('$lib/tests/tests/es.array.filter.js');
		await import('$lib/tests/tests/es.array.find.js');
		await import('$lib/tests/tests/es.array.from.js');
		await import('$lib/tests/tests/es.array.includes.js');
		await import('$lib/tests/tests/es.array.iterator');
		await import('$lib/tests/tests/es.array.join.js');
		await import('$lib/tests/tests/es.array.map.js');
		await import('$lib/tests/tests/es.array.slice.js');
		await import('$lib/tests/tests/es.array.sort.js');
		await import('$lib/tests/tests/es.array.splice.js');
		await import('$lib/tests/tests/es.function.name.js');
		await import('$lib/tests/tests/es.json.to-string-tag.js');
		await import('$lib/tests/tests/es.map.js');
		await import('$lib/tests/tests/es.math.to-string-tag.js');
		await import('$lib/tests/tests/es.object.assign.js');
		await import('$lib/tests/tests/es.object.freeze.js');
		await import('$lib/tests/tests/es.object.get-own-property-descriptor.js');
		await import('$lib/tests/tests/es.object.get-own-property-descriptors.js');
		await import('$lib/tests/tests/es.object.get-own-property-names.js');
		await import('$lib/tests/tests/es.object.get-prototype-of.js');
		await import('$lib/tests/tests/es.object.is-extensible.js');
		await import('$lib/tests/tests/es.object.keys.js');
		await import('$lib/tests/tests/es.object.prevent-extensions.js');
		await import('$lib/tests/tests/es.object.to-string.js');
		await import('$lib/tests/tests/es.promise.finally.js');
		await import('$lib/tests/tests/es.promise.js');
		await import('$lib/tests/tests/es.reflect.apply.js');
		await import('$lib/tests/tests/es.reflect.construct.js');
		await import('$lib/tests/tests/es.reflect.get.js');
		await import('$lib/tests/tests/es.regexp.constructor.js');
		await import('$lib/tests/tests/es.regexp.exec.js');
		await import('$lib/tests/tests/es.regexp.flags.js');
		await import('$lib/tests/tests/es.regexp.to-string.js');
		await import('$lib/tests/tests/es.set.js');
		await import('$lib/tests/tests/es.string.anchor.js');
		await import('$lib/tests/tests/es.string.bold.js');
		await import('$lib/tests/tests/es.string.ends-with.js');
		await import('$lib/tests/tests/es.string.includes.js');
		await import('$lib/tests/tests/es.string.italics.js');
		await import('$lib/tests/tests/es.string.iterator.js');
		await import('$lib/tests/tests/es.string.match.js');
		await import('$lib/tests/tests/es.string.replace.js');
		await import('$lib/tests/tests/es.string.search.js');
		await import('$lib/tests/tests/es.string.split.js');
		await import('$lib/tests/tests/es.string.starts-with.js');
		await import('$lib/tests/tests/es.string.trim.js');
		await import('$lib/tests/tests/es.symbol.description.js');
// await import('$lib/tests/tests/es.symbol.iterator.js');
		await import('$lib/tests/tests/es.symbol.js');
// await import('$lib/tests/tests/es.symbol.to-string-tag.js');
		await import('$lib/tests/tests/es.typed-array.copy-within.js');
		await import('$lib/tests/tests/es.typed-array.every.js');
		await import('$lib/tests/tests/es.typed-array.fill.js');
		await import('$lib/tests/tests/es.typed-array.filter.js');
		await import('$lib/tests/tests/es.typed-array.find-index.js');
		await import('$lib/tests/tests/es.typed-array.find.js');
		await import('$lib/tests/tests/es.typed-array.for-each.js');
		await import('$lib/tests/tests/es.typed-array.includes.js');
		await import('$lib/tests/tests/es.typed-array.index-of.js');
// await import('$lib/tests/tests/es.typed-array.int32-array.js');
		await import('$lib/tests/tests/es.typed-array.iterator.js');
		await import('$lib/tests/tests/es.typed-array.join.js');
		await import('$lib/tests/tests/es.typed-array.last-index-of.js');
		await import('$lib/tests/tests/es.typed-array.map.js');
		await import('$lib/tests/tests/es.typed-array.reduce-right.js');
		await import('$lib/tests/tests/es.typed-array.reduce.js');
		await import('$lib/tests/tests/es.typed-array.reverse.js');
		await import('$lib/tests/tests/es.typed-array.set.js');
		await import('$lib/tests/tests/es.typed-array.slice.js');
		await import('$lib/tests/tests/es.typed-array.some.js');
		await import('$lib/tests/tests/es.typed-array.sort.js');
		await import('$lib/tests/tests/es.typed-array.subarray.js');
		await import('$lib/tests/tests/es.typed-array.to-locale-string.js');
		await import('$lib/tests/tests/es.typed-array.to-string.js');
		await import('$lib/tests/tests/esnext.global-this.js');
		await import('$lib/tests/tests/web.dom-collections.for-each.js');
		await import('$lib/tests/tests/web.dom-collections.iterator.js');
		// await import('$lib/tests/tests/web.immediate.js');
		await import('$lib/tests/tests/web.url-search-params.js');
		await import('$lib/tests/tests/web.url.js');
		// await import('$lib/tests/tests/web.url.to-json.js');

		QUnit.start();
	});

	let qunit;

	function find_anchor(node, container) {
		while (node && node !== container && node.nodeName.toUpperCase() !== 'A') {
			node = node.parentNode;
		} // SVG <a> elements have a lowercase name

		return /** @type {HTMLAnchorElement | SVGAElement} */ (node);
	}

	function trigger_reload(e) {
		const a = find_anchor(e.target, qunit);

		if (a && a.href) {
			e.preventDefault();
			location.href = a.href;
		}
	}
</script>

<section on:click={trigger_reload} bind:this={qunit}>
	<div id="qunit"></div>
	<div id="qunit-fixture"></div>
</section>

<style>
	#qunit {
		position: relative;
	}
</style>