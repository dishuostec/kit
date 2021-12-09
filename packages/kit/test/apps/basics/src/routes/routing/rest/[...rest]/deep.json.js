/** @type {import('@dishuostec/kit').RequestHandler} */
export function get({ params }) {
	return { body: params.rest };
}
