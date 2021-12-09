/** @type {import('@dishuostec/kit').RequestHandler} */
export function get(request) {
	return {
		body: {
			name: request.locals.name
		}
	};
}
