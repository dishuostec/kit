/** @type {import('@dishuostec/kit').RequestHandler} */
export function get(req) {
	return { body: req.params.slug };
}
