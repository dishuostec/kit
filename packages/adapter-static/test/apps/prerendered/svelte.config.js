import adapter from '../../../index.js';

/** @type {import('@dishuostec/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		target: '#svelte'
	}
};

export default config;
