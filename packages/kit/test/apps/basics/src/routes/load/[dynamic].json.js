/** @type {import('@dishuostec/kit').RequestHandler} */
export function get({ params }) {
	return {
		body: {
			name: params.dynamic
		}
	};
}
