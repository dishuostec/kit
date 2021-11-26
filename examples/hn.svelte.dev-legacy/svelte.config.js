import node from '@sveltejs/adapter-node';
import { additionalLegacyPolyfills, legacy as ie11 } from '@dishuostec/sveltekit-legacy-ie11';

let legacy;
const LEGACY = process.env.LEGACY;

switch (LEGACY) {
	case 'no-ie':
		legacy = {
			targets: ['defaults', 'not ie > 0']
		};
		break;
	case 'defaults':
		legacy = {
			targets: ['defaults'],
			additionalLegacyPolyfills,
			plugins: {
				legacy: ie11
			}
		};
		break;
}

const out = `build${LEGACY ? `-${LEGACY}` : ''}`;

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		legacy,
		adapter: node({
			out
		}),
		target: '#svelte',
		vite: {
			build: {
				minify: false, // minify will force make some tests fail.
				rollupOptions: {
					treeshake: false // treeshake will force make some tests fail.
				}
			}
		}
	}
};

export default config;
