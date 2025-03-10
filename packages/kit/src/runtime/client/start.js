// @ts-ignore
import Root from 'ROOT'; // eslint-disable-line import/no-unresolved
// @ts-ignore
import { routes, layout } from 'MANIFEST'; // eslint-disable-line import/no-unresolved
import { Router } from './router.js';
import { Renderer } from './renderer.js';
import { init } from './singletons.js';
import { set_paths } from '../paths.js';

/** @param {{
 *   paths: {
 *     assets: string;
 *     base: string;
 *   },
 *   target: Node;
 *   session: any;
 *   error: Error;
 *   status: number;
 *   nodes: import('./types').NavigationCandidate["nodes"];
 *   page: import('./types').NavigationCandidate["page"];
 * }} opts */
export async function start({ paths, target, session, error, status, nodes, page }) {
	const router = new Router({
		base: paths.base,
		routes
	});

	const renderer = new Renderer({
		Root,
		layout,
		target,
		session,
		host: page.host
	});

	init({ router, renderer });
	set_paths(paths);

	router.init(renderer);
	await renderer.start({ nodes, page }, status, error);

	dispatchEvent(new CustomEvent('sveltekit:start'));
}

if (import.meta.env.VITE_SVELTEKIT_SERVICE_WORKER) {
	navigator.serviceWorker.register(import.meta.env.VITE_SVELTEKIT_SERVICE_WORKER);
}
