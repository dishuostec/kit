/** @type {import('@dishuostec/kit').RequestHandler} */
export function get({ host }) {
	return {
		body: { host }
	};
}
