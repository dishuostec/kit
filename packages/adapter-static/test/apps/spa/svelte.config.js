import adapter from '../../../index.js';

/** @type {import('@dishuostec/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			fallback: '200.html'
		}),
		target: '#svelte'
	}
};

export default config;
