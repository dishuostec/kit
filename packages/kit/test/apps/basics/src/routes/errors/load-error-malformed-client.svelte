<script context="module">
	/** @type {import('@dishuostec/kit').Load} */
	export async function load() {
		if (typeof window !== 'undefined') {
			// @ts-expect-error - given value expected to throw
			return { status: 555, error: {} };
		}

		return {};
	}
</script>
