import fs from 'fs';
import path from 'path';
import { mkdirp } from '../../utils/filesystem.js';

/** @type {Map<string, string>} */
const previous_contents = new Map();

/**
 * @param {string} file
 * @param {string} code
 */
export function write_if_changed(file, code) {
	if (code !== previous_contents.get(file)) {
		previous_contents.set(file, code);
		mkdirp(path.dirname(file));
		fs.writeFileSync(file, code);
	}
}

const s = JSON.stringify;

/** @typedef {import('types/internal').ManifestData} ManifestData */

/** @typedef {{ file: string, type: string, name: string, matcher: string, generator:string }} RouteData */

/**
 * @param {{
 *   manifest_data: ManifestData;
 *   output: string;
 *   cwd: string;
 * }} options
 */
export function create_app({ manifest_data, output, cwd = process.cwd() }) {
	const dir = `${output}/generated`;
	const base = path.relative(cwd, dir);

	write_if_changed(`${dir}/manifest.js`, generate_client_manifest(manifest_data, base));
	write_if_changed(`${dir}/root.svelte`, generate_app(manifest_data));

	const routes_data = collect_routes(manifest_data);

	write_if_changed(`${dir}/routes.js`, generate_routes(routes_data));
	write_if_changed(`${dir}/routes.d.ts`, generate_routes_dts(routes_data));
}

/**
 * @param {string} str
 */
function trim(str) {
	return str.replace(/^\t\t/gm, '').trim();
}

/**
 * @param {ManifestData} manifest_data
 * @param {string} base
 */
function generate_client_manifest(manifest_data, base) {
	/** @type {Record<string, number>} */
	const component_indexes = {};

	/** @param {string} c */
	const get_path = (c) => path.relative(base, c);

	const components = `[
		${manifest_data.components
			.map((component, i) => {
				component_indexes[component] = i;

				return `() => import(${s(get_path(component))})`;
			})
			.join(',\n\t\t\t\t')}
	]`.replace(/^\t/gm, '');

	/** @param {string[]} parts */
	const get_indices = (parts) =>
		`[${parts.map((part) => (part ? `c[${component_indexes[part]}]` : '')).join(', ')}]`;

	const routes = `[
		${manifest_data.routes
			.map((route) => {
				if (route.type === 'page') {
					const params =
						route.params.length > 0 &&
						'(m) => ({ ' +
							route.params
								.map((param, i) => {
									return param.startsWith('...')
										? `${param.slice(3)}: d(m[${i + 1}] || '')`
										: `${param}: d(m[${i + 1}])`;
								})
								.join(', ') +
							'})';

					const tuple = [route.pattern, get_indices(route.a), get_indices(route.b)];
					if (params) tuple.push(params);

					return `// ${route.a[route.a.length - 1]}\n\t\t[${tuple.join(', ')}]`;
				}
			})
			.join(',\n\n\t\t')}
	]`.replace(/^\t/gm, '');

	return trim(`
		const c = ${components};

		const d = decodeURIComponent;

		export const routes = ${routes};

		// we import the root layout/error components eagerly, so that
		// connectivity errors after initialisation don't nuke the app
		export const fallback = [c[0](), c[1]()];
	`);
}

/**
 * @param {ManifestData} manifest_data
 */
function generate_app(manifest_data) {
	// TODO remove default layout altogether

	const max_depth = Math.max(
		...manifest_data.routes.map((route) =>
			route.type === 'page' ? route.a.filter(Boolean).length : 0
		),
		1
	);

	const levels = [];
	for (let i = 0; i <= max_depth; i += 1) {
		levels.push(i);
	}

	let l = max_depth;

	let pyramid = `<svelte:component this={components[${l}]} {...(props_${l} || {})}/>`;

	while (l--) {
		pyramid = `
			<svelte:component this={components[${l}]} {...(props_${l} || {})}>
				{#if components[${l + 1}]}
					${pyramid.replace(/\n/g, '\n\t\t\t\t\t')}
				{/if}
			</svelte:component>
		`
			.replace(/^\t\t\t/gm, '')
			.trim();
	}

	return trim(`
		<!-- This file is generated by @sveltejs/kit — do not edit it! -->
		<script>
			import { setContext, afterUpdate, onMount } from 'svelte';

			// stores
			export let stores;
			export let page;

			export let components;
			${levels.map((l) => `export let props_${l} = null;`).join('\n\t\t\t')}

			setContext('__svelte__', stores);

			$: stores.page.set(page);
			afterUpdate(stores.page.notify);

			let mounted = false;
			let navigated = false;
			let title = null;

			onMount(() => {
				const unsubscribe = stores.page.subscribe(() => {
					if (mounted) {
						navigated = true;
						title = document.title || 'untitled page';
					}
				});

				mounted = true;
				return unsubscribe;
			});
		</script>

		${pyramid.replace(/\n/g, '\n\t\t')}

		{#if mounted}
			<div id="svelte-announcer" aria-live="assertive" aria-atomic="true">
				{#if navigated}
					{title}
				{/if}
			</div>
		{/if}

		<style>
			#svelte-announcer {
				position: absolute;
				left: 0;
				top: 0;
				clip: rect(0 0 0 0);
				clip-path: inset(50%);
				overflow: hidden;
				white-space: nowrap;
				width: 1px;
				height: 1px;
			}
		</style>
	`);
}

/**
 * @param {ManifestData} manifest_data
 * @return RouteData[]
 */
function collect_routes(manifest_data) {
	return manifest_data.routes.map((route) => {
		const filepath = route.type === 'page' ? route.a[route.a.length - 1] : route.file;

		const route_name =
			route.id
				.replace(/\[([a-zA-Z0-9_$]+)]/g, '$$$1')
				.replace(/\[\.\.\.([a-zA-Z0-9_$]+)]/g, '$$$$$1')
				.replace(/[^a-zA-Z0-9_$]/g, '_')
				.replace(/_+$/, '') || '_index';

		const params =
			route.params.length > 0
				? `{ ${route.params
						.map((param) => {
							return param.startsWith('...') ? `${param.slice(3)} = '.'` : `${param} = '.'`;
						})
						.join(',')} } = {}`
				: '';

		const factory =
			route.params.length > 0
				? '`' + route.id.replace(/\[(?:\.\.\.)?([a-zA-Z0-9_$]+)]/g, '${$1}') + '`'
				: route.id.length
				? `'${route.id}'`
				: "'/'";

		const generator = `(${params}) => base + ${factory}`;
		const matcher = `(url) => ${route.pattern}.test(url)`;

		return {
			file: filepath,
			type: route.type,
			name: route_name,
			matcher,
			generator
		};
	});
}

/**
 * @param {RouteData[]} routes
 */
function generate_routes(routes) {
	const route_base = `
import { base } from '$app/paths';
`.trim();

	return `${route_base}

${routes
	.map((route) => {
		return `// ${route.file}
export const route_${route.type}${route.name} = {
	match: ${route.matcher},
	create: ${route.generator}
};`;
	})
	.join('\n\n')}`;
}

/**
 * @param {RouteData[]} routes
 */
function generate_routes_dts(routes) {
	return `declare module '$app/routes' {
	interface Route {
		match(url: string): boolean;
		create(params?: any): string;
	}

${routes
	.map(
		(route) =>
			`	// ${route.file}
	export const route_${route.type}${route.name}: Route;`
	)
	.join('\n\n')}
}
`;
}
