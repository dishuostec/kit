let random = 0;

/** @type {import('@dishuostec/kit').RequestHandler<any, FormData>} */
export function post({ body }) {
	random = +body.get('random');
}

export function get() {
	return {
		body: {
			random
		}
	};
}
